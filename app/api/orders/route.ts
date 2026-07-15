import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/lib/models/Order';
import { PaymentProcessorFactory, AuditService } from '@/lib/services/systemDesign';

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch orders'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      shippingAddress,
      city,
      postalCode,
      country,
      vendor,
      amount,
      items,
      paymentMethod
    } = body;

    if (!customerName || !customerEmail || !shippingAddress || !amount || !items || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Missing required order fields'
      }, { status: 400 });
    }

    // 1. Process payment via Strategy + Factory Method Patterns
    const selectedMethod = paymentMethod || 'cod';
    const paymentProcessor = PaymentProcessorFactory.getPaymentMethod(selectedMethod);
    const paymentResult = paymentProcessor.processPayment(amount, { email: customerEmail });

    if (!paymentResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Payment verification failed'
      }, { status: 402 });
    }

    // Generate unique order reference like '#10001'
    const lastOrder = await Order.findOne({}).sort({ createdAt: -1 });
    let nextNum = 10001;
    if (lastOrder && lastOrder.id && lastOrder.id.startsWith('#')) {
      const numPart = parseInt(lastOrder.id.replace('#', ''), 10);
      if (!isNaN(numPart)) {
        nextNum = numPart + 1;
      }
    }
    const orderId = `#${nextNum}`;

    const dateStr = new Date().toISOString().split('T')[0];

    const newOrder = new Order({
      id: orderId,
      customerName,
      customerEmail,
      shippingAddress,
      city,
      postalCode: postalCode || '00000',
      country: country || 'Saudi Arabia',
      vendor: vendor || 'Nafshe HQ',
      amount: amount + (paymentResult.fee || 0), // Include payment fee (e.g. COD shipping fee)
      items,
      status: 'Pending',
      trackingId: `TRK${Math.floor(100000 + Math.random() * 900000)}`,
      date: dateStr
    });

    await newOrder.save();

    // 2. Log event via Singleton Audit Ledger Pattern
    const auditor = AuditService.getInstance();
    auditor.logEvent('ORDER_ACQUIRED', {
      orderId,
      amount: newOrder.amount,
      method: selectedMethod,
      transactionId: paymentResult.transactionId
    });

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create order'
    }, { status: 500 });
  }
}

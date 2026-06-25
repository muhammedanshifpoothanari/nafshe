import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/lib/models/Order';

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
      items
    } = body;

    if (!customerName || !customerEmail || !shippingAddress || !amount || !items || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Missing required order fields'
      }, { status: 400 });
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
      postalCode,
      country: country || 'Saudi Arabia',
      vendor: vendor || 'Nafshe HQ',
      amount,
      items,
      status: 'Pending',
      trackingId: `TRK${Math.floor(100000 + Math.random() * 900000)}`,
      date: dateStr
    });

    await newOrder.save();

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

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Payout from '@/lib/models/Payout';
import Order from '@/lib/models/Order';
import BDA from '@/lib/models/BDA';
import Vendor from '@/lib/models/Vendor';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    const query: any = {};
    if (vendorId) query.vendorId = vendorId;

    const payouts = await Payout.find(query).sort({ createdAt: -1 });

    return NextResponse.json(payouts);
  } catch (error: any) {
    console.error('Fetch payouts error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { vendorId, periodStart, periodEnd } = body;

    if (!vendorId || !periodStart || !periodEnd) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const vendor = await Vendor.findOne({ id: vendorId });
    if (!vendor) {
      return NextResponse.json({ success: false, message: 'Vendor not found' }, { status: 404 });
    }

    // 1. Fetch sales orders within date range
    const start = new Date(periodStart);
    const end = new Date(periodEnd);

    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end }
    });

    // Calculate revenue for this vendor's items
    let salesRevenue = 0;
    for (const order of orders) {
      // Look up items in order that belong to this vendor
      // (For mock compatibility: if item brand matches vendor name, or order.vendor matches vendor name/id)
      const isVendorOrder = order.vendor?.toLowerCase() === vendorId.toLowerCase() || 
                            order.vendor?.toLowerCase() === vendor.name.toLowerCase();
      
      if (isVendorOrder) {
        salesRevenue += order.amount;
      } else {
        // Fallback: check individual items
        const vendorItems = order.items.filter((item: any) => 
          item.brand?.toLowerCase() === vendor.name.toLowerCase()
        );
        for (const item of vendorItems) {
          salesRevenue += (item.price * item.quantity);
        }
      }
    }

    // 2. Fetch approved BDA deductions (expenses, marketing, ads) in the period
    const bdas = await BDA.find({
      vendorId,
      status: 'Approved',
      createdAt: { $gte: start, $lte: end }
    });

    const bdaDeductions = bdas.reduce((sum, item) => sum + item.amount, 0);

    // 3. Calculate commission and tax
    // Commission = salesRevenue * (commissionRate / 100)
    const commissionRate = vendor.commissionRate || 15;
    const nafsheCommission = Math.round(salesRevenue * (commissionRate / 100));

    // Assume 15% VAT tax rate on revenue or commission
    const taxAmount = Math.round(salesRevenue * 0.15);

    // Payout = salesRevenue - nafsheCommission - bdaDeductions - taxAmount
    const payoutAmount = Math.max(0, salesRevenue - nafsheCommission - bdaDeductions - taxAmount);

    const uniqueId = `pay-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayout = new Payout({
      id: uniqueId,
      vendorId,
      periodStart: start,
      periodEnd: end,
      salesRevenue,
      nafsheCommission,
      bdaDeductions,
      taxAmount,
      payoutAmount,
      status: 'Calculated'
    });

    await newPayout.save();

    // Mark BDAs as Deducted
    for (const bda of bdas) {
      bda.status = 'Deducted';
      await bda.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Payout calculated successfully',
      payout: newPayout
    }, { status: 201 });
  } catch (error: any) {
    console.error('Calculate payout error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

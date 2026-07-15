import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import ApprovalRequest from '@/lib/models/ApprovalRequest';
import Product from '@/lib/models/Product';
import BDA from '@/lib/models/BDA';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');
    const status = searchParams.get('status');

    const query: any = {};
    if (vendorId) query.vendorId = vendorId;
    if (status) query.status = status;

    const approvals = await ApprovalRequest.find(query).sort({ createdAt: -1 });

    return NextResponse.json(approvals, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error: any) {
    console.error('Fetch approvals error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { vendorId, type, action, targetId, data } = body;

    if (!vendorId || !type || !action || !data) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const uniqueId = `req-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest = new ApprovalRequest({
      id: uniqueId,
      vendorId,
      type,
      action,
      targetId,
      data,
      status: 'pending'
    });

    await newRequest.save();

    return NextResponse.json({
      success: true,
      message: 'Approval request submitted successfully',
      request: newRequest
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create approval request error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

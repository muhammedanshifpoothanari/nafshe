import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
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

    const bdas = await BDA.find(query).sort({ createdAt: -1 });

    return NextResponse.json(bdas);
  } catch (error: any) {
    console.error('Fetch BDA list error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { vendorId, type, amount, description, createdByAdmin } = body;

    if (!vendorId || !type || amount === undefined) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const uniqueId = `bda-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBda = new BDA({
      id: uniqueId,
      vendorId,
      type,
      amount: Number(amount),
      description: description || '',
      status: createdByAdmin ? 'Approved' : 'Pending'
    });

    await newBda.save();

    return NextResponse.json({
      success: true,
      message: 'BDA expense logged successfully',
      bda: newBda
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create BDA expense error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

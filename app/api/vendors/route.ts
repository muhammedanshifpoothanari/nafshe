import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Vendor from '@/lib/models/Vendor';

export async function GET() {
  try {
    await connectToDatabase();
    const vendors = await Vendor.find({}).sort({ createdAt: -1 });
    return NextResponse.json(vendors);
  } catch (error: any) {
    console.error('Fetch vendors error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch vendors'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { name, email, category, commissionRate, taxId, bankAccount } = body;

    if (!name || !email) {
      return NextResponse.json({
        success: false,
        message: 'Name and Email are required fields'
      }, { status: 400 });
    }

    // Generate slug-style ID from name
    const generatedId = name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');

    // Check if vendor already exists
    const existing = await Vendor.findOne({ id: generatedId });
    const vendorId = existing ? `${generatedId}-${Math.floor(Math.random() * 1000)}` : generatedId;

    const newVendor = new Vendor({
      id: vendorId,
      name,
      email,
      category: category || 'General',
      commissionRate: commissionRate ? Number(commissionRate) : 15,
      taxId: taxId || '',
      bankAccount: bankAccount || '',
      sales: '₹0',
      status: 'Pending',
      sync: 'Provisioning',
      tier: 'Standard'
    });

    await newVendor.save();

    return NextResponse.json({
      success: true,
      message: 'Vendor provisioned successfully',
      vendor: newVendor
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create vendor error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create vendor'
    }, { status: 500 });
  }
}

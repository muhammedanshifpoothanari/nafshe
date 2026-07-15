import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Vendor from '@/lib/models/Vendor';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const cacheHeaders = {
      'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=59',
    };

    const vendor = await Vendor.findOne({ id });

    if (!vendor) {
      return NextResponse.json({
        success: false,
        message: 'Vendor not found'
      }, { status: 404 });
    }

    return NextResponse.json(vendor, { headers: cacheHeaders });
  } catch (error: any) {
    console.error('Fetch vendor details error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch vendor'
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const updatedVendor = await Vendor.findOneAndUpdate(
      { id },
      { $set: body },
      { returnDocument: 'after' }
    );

    if (!updatedVendor) {
      return NextResponse.json({
        success: false,
        message: 'Vendor not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Vendor updated successfully',
      vendor: updatedVendor
    });
  } catch (error: any) {
    console.error('Update vendor error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update vendor'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedVendor = await Vendor.findOneAndDelete({ id });

    if (!deletedVendor) {
      return NextResponse.json({
        success: false,
        message: 'Vendor not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Vendor deleted successfully',
      vendor: deletedVendor
    });
  } catch (error: any) {
    console.error('Delete vendor error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to delete vendor'
    }, { status: 500 });
  }
}


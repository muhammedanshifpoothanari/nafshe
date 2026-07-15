import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Vendor from '@/lib/models/Vendor';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 });
    }

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return NextResponse.json({
        success: false,
        message: 'Vendor not found'
      }, { status: 404 });
    }

    // In a production environment, you should use bcrypt to verify the hash.
    // For local dev simulation, we'll allow plain comparison if hash is not set, or standard check.
    const isPasswordValid = !vendor.passwordHash || vendor.passwordHash === password;

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Invalid password'
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      vendor: {
        id: vendor.id,
        name: vendor.name,
        email: vendor.email,
        commissionRate: vendor.commissionRate,
        consignment: vendor.consignment
      }
    });
  } catch (error: any) {
    console.error('Vendor login error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to authenticate vendor'
    }, { status: 500 });
  }
}

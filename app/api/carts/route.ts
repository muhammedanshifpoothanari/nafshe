import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Cart from '@/lib/models/Cart';

export async function GET() {
  try {
    await connectToDatabase();
    // Return only active, unconverted carts (updated in the last 7 days)
    const activeCarts = await Cart.find({ converted: false }).sort({ updatedAt: -1 });
    return NextResponse.json(activeCarts);
  } catch (error: any) {
    console.error('Fetch active carts error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch active carts'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { sessionId, email, items, total, converted } = body;

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        message: 'Session ID is required'
      }, { status: 400 });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { sessionId },
      { 
        $set: { 
          email: email || '',
          items: items || [],
          total: total || 0,
          converted: converted ?? false
        } 
      },
      { upsert: true, returnDocument: 'after', new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Cart saved successfully',
      cart: updatedCart
    });
  } catch (error: any) {
    console.error('Save cart error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to save cart'
    }, { status: 500 });
  }
}

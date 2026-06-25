import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Cart from '@/lib/models/Cart';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    await connectToDatabase();
    const { sessionId } = await params;

    const deletedCart = await Cart.findOneAndDelete({ sessionId });

    if (!deletedCart) {
      return NextResponse.json({
        success: false,
        message: 'Cart not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Cart deleted successfully',
      cart: deletedCart
    });
  } catch (error: any) {
    console.error('Delete cart error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to delete cart'
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/lib/models/Order';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    // Find by custom order id (e.g. '#10001')
    const order = await Order.findOne({ id });

    if (!order) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Fetch order error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch order'
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

    const updatedOrder = await Order.findOneAndUpdate(
      { id },
      { $set: body },
      { returnDocument: 'after' }
    );

    if (!updatedOrder) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder
    });
  } catch (error: any) {
    console.error('Update order error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update order'
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

    const deletedOrder = await Order.findOneAndDelete({ id });

    if (!deletedOrder) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
      order: deletedOrder
    });
  } catch (error: any) {
    console.error('Delete order error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to delete order'
    }, { status: 500 });
  }
}

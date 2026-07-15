import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/lib/models/Product';
import { cache } from '@/lib/cache';

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

    // Check cache first
    const cacheKey = `products:single:${id}`;
    const cachedProduct = cache.get(cacheKey);
    if (cachedProduct) {
      return NextResponse.json(cachedProduct, { headers: cacheHeaders });
    }

    // Find by the custom string id field
    const product = await Product.findOne({ id });

    if (!product) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }

    // Cache the single product for 5 minutes
    cache.set(cacheKey, product, 300);

    return NextResponse.json(product, { headers: cacheHeaders });
  } catch (error: any) {
    console.error('Fetch single product error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch product'
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

    // Use returnDocument: 'after' since 'new' is deprecated for findOneAndUpdate
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { $set: body },
      { returnDocument: 'after' }
    );

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }

    // Invalidate product caches
    cache.invalidatePrefix('products:');

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update product'
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

    const deletedProduct = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }

    // Invalidate product caches
    cache.invalidatePrefix('products:');

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to delete product'
    }, { status: 500 });
  }
}


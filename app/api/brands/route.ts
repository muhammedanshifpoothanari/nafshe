import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Brand from '@/lib/models/Brand';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    // Check cache first
    const cacheKey = `brands:${request.url}`;
    const cachedBrands = cache.get(cacheKey);
    if (cachedBrands) {
      return NextResponse.json(cachedBrands);
    }

    const filterQuery: any = {};
    if (featured === 'true') {
      filterQuery.featured = true;
    }

    const brands = await Brand.find(filterQuery);

    // Save to cache for 1 hour
    cache.set(cacheKey, brands, 3600);

    return NextResponse.json(brands);
  } catch (error: any) {
    console.error('Fetch brands error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch brands'
    }, { status: 500 });
  }
}

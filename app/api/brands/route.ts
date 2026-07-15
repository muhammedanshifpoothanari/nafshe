import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Brand from '@/lib/models/Brand';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const cacheHeaders = {
      'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=59',
    };

    // Check cache first
    const cacheKey = `brands:${request.url}`;
    const cachedBrands = await cache.get(cacheKey);
    if (cachedBrands) {
      return NextResponse.json(cachedBrands, { headers: cacheHeaders });
    }

    const filterQuery: any = {};
    if (featured === 'true') {
      filterQuery.featured = true;
    }

    const brands = await Brand.find(filterQuery);

    // Save to cache for 1 hour
    await cache.set(cacheKey, brands, 3600);

    return NextResponse.json(brands, { headers: cacheHeaders });
  } catch (error: any) {
    console.error('Fetch brands error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch brands'
    }, { status: 500 });
  }
}

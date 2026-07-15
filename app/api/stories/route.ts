import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Story from '@/lib/models/Story';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const cacheHeaders = {
      'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=59',
    };

    const cacheKey = 'stories:all';
    const cachedStories = await cache.get(cacheKey);
    if (cachedStories) {
      return NextResponse.json(cachedStories, { headers: cacheHeaders });
    }

    const stories = await Story.find({});

    // Save to cache for 1 hour
    await cache.set(cacheKey, stories, 3600);

    return NextResponse.json(stories, { headers: cacheHeaders });
  } catch (error: any) {
    console.error('Fetch stories error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch stories'
    }, { status: 500 });
  }
}

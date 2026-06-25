import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Story from '@/lib/models/Story';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const cacheKey = 'stories:all';
    const cachedStories = cache.get(cacheKey);
    if (cachedStories) {
      return NextResponse.json(cachedStories);
    }

    const stories = await Story.find({});

    // Save to cache for 1 hour
    cache.set(cacheKey, stories, 3600);

    return NextResponse.json(stories);
  } catch (error: any) {
    console.error('Fetch stories error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch stories'
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const cacheHeaders = {
      'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=59',
    };

    const cacheKey = 'testimonials:all';
    const cachedTestimonials = await cache.get(cacheKey);
    if (cachedTestimonials) {
      return NextResponse.json(cachedTestimonials, { headers: cacheHeaders });
    }

    const testimonials = await Testimonial.find({});

    // Save to cache for 1 hour
    await cache.set(cacheKey, testimonials, 3600);

    return NextResponse.json(testimonials, { headers: cacheHeaders });
  } catch (error: any) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch testimonials'
    }, { status: 500 });
  }
}

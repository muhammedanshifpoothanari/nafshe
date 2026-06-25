import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const cacheKey = 'testimonials:all';
    const cachedTestimonials = cache.get(cacheKey);
    if (cachedTestimonials) {
      return NextResponse.json(cachedTestimonials);
    }

    const testimonials = await Testimonial.find({});

    // Save to cache for 1 hour
    cache.set(cacheKey, testimonials, 3600);

    return NextResponse.json(testimonials);
  } catch (error: any) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch testimonials'
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Brand from '@/lib/models/Brand';

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

    // Find by the custom string id field (slug like 'chanel')
    const brand = await Brand.findOne({ id });

    if (!brand) {
      return NextResponse.json({
        success: false,
        message: 'Brand not found'
      }, { status: 404 });
    }

    return NextResponse.json(brand, { headers: cacheHeaders });
  } catch (error: any) {
    console.error('Fetch single brand error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch brand'
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

    const name = body.name || id.charAt(0).toUpperCase() + id.slice(1);
    const logo = body.logo || name.charAt(0).toUpperCase();
    const tagline = body.tagline || 'Exquisite luxury and refinement';
    const description = body.description || 'Custom brand curated for Nafshe collection';
    const story = body.story || 'A heritage brand representing pure dedication and craft.';
    const image = body.image || '/assets/bag.jpg';

    const updatedBrand = await Brand.findOneAndUpdate(
      { id },
      { 
        $set: { 
          name, 
          logo, 
          tagline, 
          description, 
          story, 
          image,
          accentColor: body.accentColor || '#BCA374'
        } 
      },
      { upsert: true, returnDocument: 'after' }
    );

    return NextResponse.json({
      success: true,
      message: 'Brand updated successfully',
      brand: updatedBrand
    });
  } catch (error: any) {
    console.error('Update brand error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update brand'
    }, { status: 500 });
  }
}


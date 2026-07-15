import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/lib/models/Product';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');
    const vendorId = searchParams.get('vendorId');
    const status = searchParams.get('status'); // 'pending', 'approved', 'rejected', 'all'
    const isAdmin = searchParams.get('isAdmin') === 'true';

    const cacheHeaders = {
      'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=59',
    };

    // 1. Check cache first
    const cacheKey = `products:list:${request.url}`;
    const cachedProducts = await cache.get(cacheKey);
    if (cachedProducts) {
      return NextResponse.json(cachedProducts, { headers: cacheHeaders });
    }


    // Build filter query
    const filterQuery: any = {};

    if (category && category !== 'All') {
      filterQuery.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (brand && brand !== 'All') {
      filterQuery.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
    }

    if (query) {
      const searchRegex = new RegExp(query, 'i');
      filterQuery.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { brand: searchRegex }
      ];
    }

    // Role-based Multi-Vendor filters
    if (vendorId) {
      filterQuery.vendorId = vendorId;
      if (status && status !== 'all') {
        filterQuery.status = status;
      }
    } else {
      // General public/admin query
      if (status) {
        if (isAdmin) {
          if (status !== 'all') {
            filterQuery.status = status;
          }
        } else {
          // Public users can ONLY query approved products
          filterQuery.status = 'approved';
        }
      } else {
        // Public users default to approved products
        filterQuery.status = 'approved';
      }
    }

    // Determine sort options
    let sortQuery: any = {};
    if (sort === 'price-low') {
      sortQuery.price = 1;
    } else if (sort === 'price-high') {
      sortQuery.price = -1;
    } else if (sort === 'name') {
      sortQuery.name = 1;
    } else if (sort === 'rating') {
      sortQuery.rating = -1;
    } else {
      // default: newest
      sortQuery.createdAt = -1;
    }

    const products = await Product.find(filterQuery).sort(sortQuery);

    // Save to cache for 5 minutes
    await cache.set(cacheKey, products, 300);

    return NextResponse.json(products, { headers: cacheHeaders });
  } catch (error: any) {
    console.error('Fetch products error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch products'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const {
      name,
      brand,
      price,
      category,
      description,
      images,
      colors,
      sizes,
      stock,
      vendorId,
      status
    } = body;

    if (!name || !brand || price === undefined || !category) {
      return NextResponse.json({
        success: false,
        message: 'Name, Brand, Price, and Category are required fields'
      }, { status: 400 });
    }

    // Generate unique id for routing compatibility
    const slug = name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');
    const uniqueId = `prod-${slug}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProduct = new Product({
      id: uniqueId,
      name,
      brand,
      price: Number(price),
      category: category.toLowerCase(),
      description: description || '',
      images: images || [],
      colors: colors || [],
      sizes: sizes || [],
      stock: stock !== undefined ? Number(stock) : 10,
      vendorId: vendorId || 'nafshe',
      status: status || 'pending',
      feedback: ''
    });

    await newProduct.save();

    // Invalidate products cache
    await cache.invalidatePrefix('products:');

    return NextResponse.json({
      success: true,
      message: 'Product request submitted successfully',
      product: newProduct
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to submit product request'
    }, { status: 500 });
  }
}

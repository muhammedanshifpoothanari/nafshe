import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/lib/models/Product';
import Brand from '@/lib/models/Brand';
import Story from '@/lib/models/Story';
import Testimonial from '@/lib/models/Testimonial';
import Vendor from '@/lib/models/Vendor';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { cache } from '@/lib/cache';

// Importing mock data
import { products as abayaProducts } from '@/lib/data/products';
import { brands as mockBrands } from '@/lib/data/brands';
import { testimonials as mockTestimonials } from '@/lib/data/testimonials';

// Configure Cloudinary from CLOUDINARY_URL
const uri = process.env.CLOUDINARY_URL;
if (uri) {
  try {
    const cleanUri = uri.replace('cloudinary://', '');
    const [credentials, cloudNameWithParams] = cleanUri.split('@');
    const [apiKey, apiSecret] = credentials.split(':');
    const cloudName = cloudNameWithParams.split('?')[0]; // strip query parameters if any

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true
    });
    console.log('Cloudinary configured successfully with cloud name:', cloudName);
  } catch (error) {
    console.error('Error parsing CLOUDINARY_URL, configuring using defaults:', error);
  }
} else {
  console.warn('CLOUDINARY_URL environment variable is missing.');
}

// Caching uploaded images to prevent double uploads
const uploadCache = new Map<string, string>();

async function getOrUploadToCloudinary(imagePath: string): Promise<string> {
  if (!imagePath) return '';
  if (uploadCache.has(imagePath)) {
    return uploadCache.get(imagePath)!;
  }

  try {
    let secureUrl = '';
    
    // If it's a remote URL (like Unsplash)
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      const uploadRes = await cloudinary.uploader.upload(imagePath, {
        folder: 'nafshe',
      });
      secureUrl = uploadRes.secure_url;
    } else {
      // If it's a local public path (like /products/... or /assets/...)
      const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
      const fullPath = path.join(process.cwd(), 'public', cleanPath);
      
      if (fs.existsSync(fullPath)) {
        const uploadRes = await cloudinary.uploader.upload(fullPath, {
          folder: 'nafshe',
        });
        secureUrl = uploadRes.secure_url;
      } else {
        console.warn(`Local file not found at: ${fullPath}, using original path.`);
        secureUrl = imagePath;
      }
    }

    uploadCache.set(imagePath, secureUrl);
    return secureUrl;
  } catch (error) {
    console.error(`Cloudinary upload failed for ${imagePath}:`, error);
    return imagePath; // fallback to original path on failure
  }
}

// Global luxury products from app/products/page.tsx and app/products/[id]/page.tsx combined
const globalLuxuryProducts = [
  {
    id: 'luxury-1',
    name: 'Monogram Tote',
    brand: 'Louis Vuitton',
    price: 4500,
    images: ['/products/louis-vuitton-bag.jpg'],
    category: 'bags',
    tag: 'Limited Edition',
    rating: 4.9,
    reviews: 156,
    description: 'Iconic Louis Vuitton monogram canvas with natural cowhide leather trim. A spacious and versatile companion for everyday elegance. Crafted from the finest materials, this piece represents the pinnacle of luxury craftsmanship.',
    stock: 3,
    views: 24,
    colors: ['Brown', 'Cognac'],
    sizes: ['Medium', 'Large']
  },
  {
    id: 'luxury-2',
    name: 'Silk Evening Dress',
    brand: 'Valentino',
    price: 3400,
    images: ['/products/silk-dress.jpg'],
    category: 'dresses',
    tag: 'New In',
    rating: 4.8,
    reviews: 178,
    description: 'Exquisite silk evening dress featuring a delicate silhouette and intricate detailing. Perfect for red-carpet moments and gala events. The fluid drape of the silk creates a movement that is as captivating as it is elegant.',
    stock: 5,
    views: 18,
    colors: ['Red', 'Pink', 'Black'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'luxury-3',
    name: 'Gold Jewelry Set',
    brand: 'Dior',
    price: 5200,
    images: ['/products/gold-jewelry.jpg'],
    category: 'jewelry',
    tag: 'Trending',
    rating: 4.9,
    reviews: 145,
    description: "Timeless 18k gold jewelry set including a necklace and matching earrings. A testament to Dior's heritage of fine craftsmanship. Each piece is hand-finished to ensure a radiance that lasts a lifetime.",
    stock: 2,
    views: 42,
    colors: ['Gold'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-4',
    name: 'Statement Sunglasses',
    brand: 'Chanel',
    price: 950,
    images: ['/products/designer-sunglasses.jpg'],
    category: 'sunglasses',
    tag: 'New In',
    rating: 4.7,
    reviews: 234,
    description: 'Classic oversized sunglasses with signature Chanel detailing. UV protection with a touch of Parisian glamour. These frames are designed to make a statement while providing unparalleled comfort.',
    stock: 8,
    views: 12,
    colors: ['Black', 'Tortoise'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-5',
    name: 'Classic Heels',
    brand: 'Prada',
    price: 2100,
    images: ['/products/designer-sunglasses.jpg'], // fallback
    category: 'shoes',
    tag: 'Trending',
    rating: 4.8,
    reviews: 92,
    description: 'Elegant pointed-toe heels crafted from premium patent leather. A staple for every sophisticated wardrobe. The perfect balance of height and comfort for the modern woman on the move.',
    stock: 4,
    views: 15,
    colors: ['Black', 'Nude', 'Red'],
    sizes: ['36', '37', '38', '39', '40']
  },
  {
    id: 'luxury-6',
    name: 'Luxury Timepiece',
    brand: 'Hermès',
    price: 8900,
    images: ['/products/designer-watch.jpg'],
    category: 'watches',
    tag: 'Almost Gone',
    rating: 5.0,
    reviews: 89,
    description: 'Exquisite automatic watch featuring a sapphire crystal and premium leather strap. Precision meets unparalleled style. An investment piece that will be passed down through generations.',
    stock: 1,
    views: 56,
    colors: ['Gold', 'Silver', 'Rose Gold'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-7',
    name: 'Silk Blouse',
    brand: 'Gucci',
    price: 1800,
    images: ['/products/silk-dress.jpg'], // fallback
    category: 'tops',
    tag: 'New In',
    rating: 4.6,
    reviews: 74,
    description: 'Beautifully draped pure silk blouse with refined Gucci detailing. Perfect for bridging casual elegance and office sophistication.',
    stock: 6,
    views: 19,
    colors: ['Ivory', 'Emerald', 'Black'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'luxury-8',
    name: 'Embossed Shoulder Bag',
    brand: 'Balenciaga',
    price: 3200,
    images: ['/products/louis-vuitton-bag.jpg'], // fallback
    category: 'bags',
    tag: 'Trending',
    rating: 4.7,
    reviews: 81,
    description: 'Modern structured shoulder bag with embossed brand detailing. Urban luxury at its finest.',
    stock: 3,
    views: 22,
    colors: ['Black', 'Silver'],
    sizes: ['Medium']
  },
  {
    id: 'luxury-9',
    name: 'Air Jordan 1 Luxe',
    brand: 'Nike x Dior',
    price: 2200,
    images: ['/products/jordan-sneaker.jpg'],
    category: 'shoes',
    tag: 'Limited',
    rating: 4.9,
    reviews: 142,
    description: 'Co-branded luxury high-top sneakers matching dior craftsmanship with streetwear prestige.',
    stock: 2,
    views: 89,
    colors: ['Grey', 'White'],
    sizes: ['40', '41', '42', '43']
  },
  {
    id: 'luxury-10',
    name: 'Elite Chrono',
    brand: 'Patek Philippe',
    price: 85000,
    images: ['/products/designer-watch.jpg'],
    category: 'watches',
    tag: 'Almost Gone',
    rating: 5.0,
    reviews: 98,
    description: 'The epitome of high watchmaking. Grand complication perpetual calendar luxury timepiece.',
    stock: 1,
    views: 110,
    colors: ['Platinum'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-11',
    name: 'Diamond Tennis Bracelet',
    brand: 'Cartier',
    price: 12500,
    images: ['/products/gold-jewelry.jpg'],
    category: 'jewelry',
    tag: 'New In',
    rating: 4.9,
    reviews: 67,
    description: 'Brilliant-cut diamonds set in 18k white gold. A shimmering stream of light on your wrist.',
    stock: 2,
    views: 45,
    colors: ['White Gold'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-12',
    name: 'Velvet Evening Clutch',
    brand: 'Prada',
    price: 1800,
    images: ['/products/louis-vuitton-bag.jpg'],
    category: 'bags',
    tag: 'Trending',
    rating: 4.8,
    reviews: 54,
    description: 'Sumptuous velvet evening bag with enameled metal triangle brand hardware.',
    stock: 4,
    views: 31,
    colors: ['Black', 'Navy'],
    sizes: ['Small']
  },
  {
    id: 'luxury-13',
    name: 'Kelly 25 Sellier',
    brand: 'Hermès',
    price: 28000,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Trending',
    rating: 5.0,
    reviews: 31,
    description: 'Pristine Epsom leather Kelly bag with palladium hardware, representing structural absolute luxury.',
    stock: 1,
    views: 198,
    colors: ['Noir', 'Gold', 'Etoupe'],
    sizes: ['25']
  },
  {
    id: 'luxury-14',
    name: 'Speedy P9 Bandoulière',
    brand: 'Louis Vuitton',
    price: 11000,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Trending',
    rating: 4.9,
    reviews: 44,
    description: 'Designed by Pharrell Williams. Vibrant soft leather monogram speedy bag.',
    stock: 1,
    views: 134,
    colors: ['Yellow', 'Green', 'Red'],
    sizes: ['30']
  },
  {
    id: 'luxury-15',
    name: 'Horsebit 1955 Bag',
    brand: 'Gucci',
    price: 3200,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Trending',
    rating: 4.8,
    reviews: 120,
    description: 'Archival line GG canvas with leather details spotlighting the equestrian double ring and bar.',
    stock: 5,
    views: 65,
    colors: ['GG Canvas', 'Black Leather'],
    sizes: ['Medium']
  },
  {
    id: 'luxury-16',
    name: 'Cactus Jack Watch',
    brand: 'Audemars Piguet',
    price: 125000,
    images: ['/assets/jewelry.jpg'],
    category: 'watches',
    tag: 'Trending',
    rating: 5.0,
    reviews: 12,
    description: 'Limited edition collaboration Royal Oak perpetual calendar in brown ceramic.',
    stock: 1,
    views: 289,
    colors: ['Brown Ceramic'],
    sizes: ['41mm']
  },
  {
    id: 'luxury-17',
    name: 'Lady Dior Mini',
    brand: 'Dior',
    price: 4900,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Featured',
    rating: 4.9,
    reviews: 104,
    description: 'Cannage quilting lambskin luxury handbag with signature charms.',
    stock: 3,
    views: 94,
    colors: ['Lotus Pink', 'Black', 'Cloud Blue'],
    sizes: ['Mini']
  },
  {
    id: 'luxury-18',
    name: 'Serpenti Watch',
    brand: 'Bvlgari',
    price: 15400,
    images: ['/assets/jewelry.jpg'],
    category: 'watches',
    tag: 'Trending',
    rating: 4.9,
    reviews: 76,
    description: 'Double spiral tubogas watch resembling the sinuous movement of the serpent.',
    stock: 2,
    views: 87,
    colors: ['Rose Gold & Steel'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-19',
    name: 'Roman Stud Bag',
    brand: 'Valentino',
    price: 3100,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Trending',
    rating: 4.8,
    reviews: 58,
    description: 'Nappa leather bag adorned with macro studs and quilted detailing.',
    stock: 3,
    views: 48,
    colors: ['Black', 'Ivory'],
    sizes: ['Medium']
  },
  {
    id: 'luxury-20',
    name: 'Classic Flap Bag',
    brand: 'Chanel',
    price: 8200,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Trending',
    rating: 4.9,
    reviews: 210,
    description: 'Timeless quilted caviar leather handbag with double C logo clasp and gold-tone hardware.',
    stock: 2,
    views: 167,
    colors: ['Black', 'Beige'],
    sizes: ['Medium']
  },
  {
    id: 'luxury-21',
    name: 'Lace pumps',
    brand: 'Jimmy Choo',
    price: 850,
    images: ['/assets/hero.jpg'],
    category: 'shoes',
    tag: 'Trending',
    rating: 4.8,
    reviews: 41,
    description: 'Delicate floral lace pointed-toe heels with thin stiletto heel.',
    stock: 4,
    views: 39,
    colors: ['Black', 'White'],
    sizes: ['36', '37', '38', '39']
  },
  {
    id: 'luxury-22',
    name: 'Signature Belt',
    brand: 'Hermès',
    price: 1200,
    images: ['/assets/hero.jpg'],
    category: 'jewelry',
    tag: 'Trending',
    rating: 4.9,
    reviews: 130,
    description: 'Reversible leather strap with iconic H buckle.',
    stock: 7,
    views: 56,
    colors: ['Gold/Black'],
    sizes: ['85', '90', '95']
  },
  {
    id: 'luxury-23',
    name: 'Oyster Perpetual',
    brand: 'Rolex',
    price: 9500,
    images: ['/assets/jewelry.jpg'],
    category: 'watches',
    tag: 'Trending',
    rating: 5.0,
    reviews: 189,
    description: 'Superlative Chronometer watch in Oystersteel with bright blue dial.',
    stock: 2,
    views: 122,
    colors: ['Steel Blue'],
    sizes: ['41mm']
  },
  {
    id: 'luxury-24',
    name: 'Cassette Bag',
    brand: 'Bottega Veneta',
    price: 3500,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Trending',
    rating: 4.9,
    reviews: 85,
    description: 'Double-faced padded intrecciato weave leather shoulder bag.',
    stock: 3,
    views: 74,
    colors: ['Porridge', 'Black', 'Parakeet'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-25',
    name: 'Rare Birkin 30',
    brand: 'Hermès',
    price: 25000,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Featured',
    rating: 5.0,
    reviews: 14,
    description: 'Collectible Togo leather Birkin bag with gold hardware.',
    stock: 1,
    views: 265,
    colors: ['Gold'],
    sizes: ['30']
  },
  {
    id: 'luxury-26',
    name: 'Monogram Trunk',
    brand: 'Louis Vuitton',
    price: 12000,
    images: ['/assets/bag.jpg'],
    category: 'bags',
    tag: 'Featured',
    rating: 4.9,
    reviews: 21,
    description: 'A miniature version of the iconic Louis Vuitton hard trunk.',
    stock: 1,
    views: 89,
    colors: ['Classic Monogram'],
    sizes: ['One Size']
  },
  {
    id: 'luxury-27',
    name: 'Velvet Evening Gown',
    brand: 'Gucci',
    price: 5600,
    images: ['/assets/dress.jpg'],
    category: 'dresses',
    tag: 'Featured',
    rating: 4.8,
    reviews: 47,
    description: 'Plunging neckline velvet gown with crystal-embellished details.',
    stock: 2,
    views: 52,
    colors: ['Emerald Green'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'luxury-28',
    name: 'Gold Link Bracelet',
    brand: 'Tiffany & Co.',
    price: 3200,
    images: ['/assets/jewelry.jpg'],
    category: 'jewelry',
    tag: 'Featured',
    rating: 4.7,
    reviews: 63,
    description: '18k gold link bracelet from the Tiffany City HardWear collection.',
    stock: 3,
    views: 79,
    colors: ['Yellow Gold'],
    sizes: ['Medium']
  }
];

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Clear existing collections
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await Story.deleteMany({});
    await Testimonial.deleteMany({});
    await Vendor.deleteMany({});

    // 1.1 Seed Vendors
    const seedVendors = [
      { id: 'chanel', name: 'Chanel', email: 'chanel@nafshe.com', category: 'High Fashion', sales: '₹15,30,000', status: 'Active', sync: 'Synchronized', tier: 'Maison Tier 1', commissionRate: 15, taxId: 'TX-CHANEL-99', bankAccount: 'FR89370123992389' },
      { id: 'dior', name: 'Maison Dior', email: 'dior@nafshe.com', category: 'Premium Fashion', sales: '₹12,50,000', status: 'Active', sync: 'Synchronized', tier: 'Maison Tier 1', commissionRate: 15, taxId: 'TX-DIOR-01', bankAccount: 'FR89370123456789' },
      { id: 'louis-vuitton', name: 'Louis Vuitton', email: 'lv@nafshe.com', category: 'Luxury Leather', sales: '₹18,20,000', status: 'Active', sync: 'Synchronized', tier: 'Maison Tier 1', commissionRate: 15, taxId: 'TX-LV-08', bankAccount: 'FR89370123777712' },
      { id: 'hermes', name: 'Hermès', email: 'hermes@nafshe.com', category: 'High Artisanship', sales: '₹22,10,000', status: 'Active', sync: 'Synchronized', tier: 'Maison Tier 1', commissionRate: 15, taxId: 'TX-HERMES-44', bankAccount: 'FR89370123888321' },
      { id: 'luxury-brands-co', name: 'Luxury Brands Co', email: 'luxury@example.com', category: 'Premium Fashion', sales: '₹12,50,000', status: 'Active', sync: 'Synchronized', tier: 'Maison Tier 1', commissionRate: 15, taxId: 'TX-LUXCO-22', bankAccount: 'IN91001234123456' },
      { id: 'fashion-house', name: 'Fashion House', email: 'fashion@example.com', category: 'Casual Wear', sales: '₹8,75,000', status: 'Active', sync: 'Active', tier: 'Standard', commissionRate: 12, taxId: 'TX-FASH-33', bankAccount: 'IN91001234778899' },
      { id: 'premium-store', name: 'Premium Store', email: 'premium@example.com', category: 'Accessories', sales: '₹5,40,000', status: 'Pending', sync: 'Disconnected', tier: 'Evaluating', commissionRate: 10, taxId: 'TX-PREM-11', bankAccount: 'IN91001234665544' },
      { id: 'designer-collective', name: 'Designer Collective', email: 'designer@example.com', category: 'High Fashion', sales: '₹15,30,000', status: 'Active', sync: 'Synchronized', tier: 'Maison Tier 1', commissionRate: 15, taxId: 'TX-DESCOL-55', bankAccount: 'IN91001234990088' },
      { id: 'nafshe', name: 'Nafshe HQ', email: 'safa@nafshe.com', category: 'Modest Abayas', sales: '₹34,50,000', status: 'Active', sync: 'Synchronized', tier: 'HQ Brand', commissionRate: 0, taxId: 'TX-NAFSHE-00', bankAccount: 'AE89001234567890' }
    ];
    await Vendor.insertMany(seedVendors);

    const getVendorId = (brandName: string) => {
      const cleaned = brandName.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
      
      if (cleaned === 'nike-x-dior') return 'dior';
      if (cleaned === 'patek-philippe') return 'designer-collective';
      if (cleaned === 'valentino') return 'designer-collective';
      if (cleaned === 'prada') return 'designer-collective';
      if (cleaned === 'gucci') return 'fashion-house';
      if (cleaned === 'balenciaga') return 'fashion-house';
      if (cleaned === 'cartier') return 'premium-store';
      if (cleaned === 'tiffany-co') return 'premium-store';
      if (cleaned === 'jimmy-choo') return 'premium-store';
      if (cleaned === 'bvlgari') return 'premium-store';
      if (cleaned === 'rolex') return 'premium-store';
      if (cleaned === 'audemars-piguet') return 'luxury-brands-co';
      if (cleaned === 'bottega-veneta') return 'luxury-brands-co';
      return cleaned;
    };

    // 2. Upload and format products from lib/data/products.ts
    const modestCategories = ['abayas', 'formal', 'casual', 'accessories', 'limited'];
    const formattedProducts = [];
    
    for (const p of abayaProducts) {
      const dbImages = [];
      if (p.images && p.images.length > 0) {
        for (const img of p.images) {
          const cloudUrl = await getOrUploadToCloudinary(img);
          dbImages.push(cloudUrl);
        }
      }

      const isModest = modestCategories.includes(p.category.toLowerCase());

      formattedProducts.push({
        ...p,
        id: isModest ? `abaya-${p.id}` : `luxury-${p.id}`,
        images: dbImages,
        stock: 10,
        views: Math.floor(Math.random() * 50) + 10,
        status: 'approved',
        vendorId: isModest ? 'nafshe' : getVendorId(p.brand)
      });
    }

    // Insert all Products into database
    await Product.insertMany(formattedProducts);

    // 4. Upload and format Brands
    const formattedBrands = [];
    for (const b of mockBrands) {
      const cloudImage = await getOrUploadToCloudinary(b.image);
      formattedBrands.push({
        ...b,
        image: cloudImage
      });
    }
    await Brand.insertMany(formattedBrands);

    // 5. Seed Stories with original brand and link data
    const carouselStories = [
      { id: '1', image: '/products/nike-luxury-shoes.jpg', brand: 'Chanel', title: 'The Spring Edit', link: '/products?brand=Chanel', products: [], duration: 5 },
      { id: '2', image: '/products/louis-vuitton-bag.jpg', brand: 'Dior', title: 'Maison Dreams', link: '/products?brand=Dior', products: [], duration: 5 },
      { id: '3', image: '/products/jordan-sneaker.jpg', brand: 'Valentino', title: 'Roma Series', link: '/products?brand=Valentino', products: [], duration: 5 },
      { id: '4', image: '/products/designer-watch.jpg', brand: 'Prada', title: 'Milano Style', link: '/products?brand=Prada', products: [], duration: 5 },
      { id: '5', image: '/products/designer-sunglasses.jpg', brand: 'Hermès', title: 'Silk Journal', link: '/products?brand=Hermès', products: [], duration: 5 },
      { id: '6', image: '/products/silk-dress.jpg', brand: 'Gucci', title: 'Garden Party', link: '/products?brand=Gucci', products: [], duration: 5 },
    ];
    
    const formattedStories = [];
    for (const story of carouselStories) {
      const cloudImage = await getOrUploadToCloudinary(story.image);
      formattedStories.push({
        ...story,
        image: cloudImage
      });
    }
    await Story.insertMany(formattedStories);

    // 6. Upload and format Testimonials
    const formattedTestimonials = [];
    for (const t of mockTestimonials) {
      const cloudImage = await getOrUploadToCloudinary(t.image);
      formattedTestimonials.push({
        ...t,
        image: cloudImage
      });
    }
    await Testimonial.insertMany(formattedTestimonials);

    // Clear entire cache on fresh seed
    cache.clear();

    return NextResponse.json({
      success: true,
      message: 'Database, Cloudinary, and Vendors seeded successfully',
      counts: {
        products: formattedProducts.length,
        brands: formattedBrands.length,
        stories: formattedStories.length,
        testimonials: formattedTestimonials.length,
        vendors: seedVendors.length
      }
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Error occurred while seeding database'
    }, { status: 500 });
  }
}

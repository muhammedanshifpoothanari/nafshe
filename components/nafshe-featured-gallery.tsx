'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Plus, Scissors, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getOptimizedImageUrl } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  tag?: string;
  rating: number;
}

// Static arrays are removed. Loaded dynamically via API below.
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  images?: string[];
  tag?: string;
  rating: number;
}

export function NafsheFeaturedGallery() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Distribute dynamic products to the homepage galleries
        const arrivals = data.filter((p: any) => p.tag === 'New' || p.tag === 'New In' || p.category === 'New Arrival' || p.category === 'tops').slice(0, 8);
        const trend = data.filter((p: any) => p.tag === 'Trending' || p.tag === 'Hot' || p.category === 'Trending' || p.category === 'watches' || p.category === 'jewelry').slice(0, 8);
        const feat = data.filter((p: any) => p.tag === 'Featured' || p.tag === 'Limited' || p.tag === 'Limited Edition' || p.category === 'Featured' || p.category === 'bags' || p.category === 'dresses').slice(0, 8);

        // Fallbacks if empty
        setNewArrivals(arrivals.length > 0 ? arrivals : data.slice(0, 8));
        setTrending(trend.length > 0 ? trend : data.slice(8, 16));
        setFeatured(feat.length > 0 ? feat : data.slice(16, 24));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading featured gallery products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="featured-gallery" className="py-12 px-6 bg-white overflow-hidden animate-pulse">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="h-40 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </section>
    );
  }

  return (
    <section id="featured-gallery" className="py-12 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Tier 1: New Arrivals (2 Rows) */}
        <div className="space-y-8">
           <div className="flex items-center gap-4 border-b border-dashed border-black/10 pb-4">
              <Scissors className="w-4 h-4 text-accent rotate-90" />
              <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-[0.5em] text-foreground/70 font-bold">The Latest Drop</p>
                 <h2 className="text-3xl md:text-5xl font-light text-luxury tracking-tighter">New <span className="italic serif text-accent">Arrivals</span></h2>
              </div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
             {newArrivals.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
        </div>

        {/* Tier 2: Trending Now (3 Rows) */}
        <div className="space-y-8">
           <div className="flex items-center gap-4 border-b border-dashed border-black/10 pb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-[0.5em] text-foreground/70 font-bold">In High Demand</p>
                 <h2 className="text-3xl md:text-5xl font-light text-luxury tracking-tighter">Trending <span className="italic serif text-accent">Now</span></h2>
              </div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
             {trending.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
        </div>

        {/* Tier 3: Featured Masterpieces (2 Rows) */}
        <div className="space-y-8">
           <div className="flex items-center gap-4 border-b border-dashed border-black/10 pb-4">
              <Scissors className="w-4 h-4 text-accent rotate-90" />
              <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-[0.5em] text-foreground/70 font-bold">Curated Excellence</p>
                 <h2 className="text-3xl md:text-5xl font-light text-luxury tracking-tighter">Featured <span className="italic serif text-accent">Masterpieces</span></h2>
              </div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
             {featured.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
        </div>

        {/* Final Catalog CTA */}
        <div className="pt-12 text-center border-t border-dashed border-black/10">
           <Link href="/products" className="inline-block px-20 py-5 bg-primary text-white text-[11px] uppercase tracking-[0.4em] font-bold shadow-2xl hover:bg-accent transition-all">
              Explore Full 2026 Collection
           </Link>
        </div>

      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group space-y-4 animate-fade-in">
      <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden shadow-sm p-1.5 border border-dashed border-accent/10 group-hover:border-accent/40 transition-all duration-700">
        <div className="relative h-full w-full overflow-hidden">
           <Image 
             src={getOptimizedImageUrl(product.images?.[0] || product.image || '/placeholder.jpg', 600)} 
             alt={product.name} 
             fill 
             className="object-cover group-hover:scale-105 transition-all duration-1000" 
           />
           {product.tag && (
             <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-[7px] uppercase tracking-widest font-bold px-2 py-1">
               {product.tag}
             </div>
           )}
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
           <div className="absolute bottom-4 right-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl">
                 <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
           </div>
        </div>
      </div>
      <div className="space-y-2 px-1">
        <div className="flex items-center justify-between">
           <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{product.brand}</p>
           <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-accent text-accent" />
              <span className="text-[10px] font-bold">{product.rating}</span>
           </div>
        </div>
        <div className="space-y-0.5">
           <h3 className="text-sm font-light tracking-tight truncate">{product.name}</h3>
           <p className="text-sm font-bold text-primary">${product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}

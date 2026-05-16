'use client';

import Image from 'next/image';
import { Star, ShoppingBag, Plus, Scissors, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  tag?: string;
  rating: number;
}

const NEW_ARRIVALS: Product[] = [
  { id: 'n1', name: 'Monogram Tote', brand: 'Louis Vuitton', price: 4500, image: '/products/louis-vuitton-bag.jpg', tag: 'New', rating: 4.9 },
  { id: 'n2', name: 'Silk Evening Dress', brand: 'Valentino', price: 3400, image: '/products/silk-dress.jpg', tag: 'New', rating: 5.0 },
  { id: 'n3', name: 'Gold Jewelry Set', brand: 'Dior', price: 5200, image: '/products/gold-jewelry.jpg', tag: 'New', rating: 4.8 },
  { id: 'n4', name: 'Statement Sunglasses', brand: 'Chanel', price: 950, image: '/products/designer-sunglasses.jpg', rating: 4.7 },
  { id: 'n5', name: 'Air Jordan 1 Luxe', brand: 'Nike x Dior', price: 2200, image: '/products/jordan-sneaker.jpg', tag: 'Limited', rating: 4.9 },
  { id: 'n6', name: 'Elite Chrono', brand: 'Patek Philippe', price: 85000, image: '/products/designer-watch.jpg', rating: 5.0 },
  { id: 'n7', name: 'Diamond Tennis Bracelet', brand: 'Cartier', price: 12500, image: '/products/gold-jewelry.jpg', rating: 4.9 },
  { id: 'n8', name: 'Velvet Evening Clutch', brand: 'Prada', price: 1800, image: '/products/louis-vuitton-bag.jpg', rating: 4.8 },
];

const TRENDING: Product[] = [
  { id: 't1', name: 'Kelly 25 Sellier', brand: 'Hermès', price: 28000, image: '/assets/bag.jpg', tag: 'Trending', rating: 5.0 },
  { id: 't2', name: 'Speedy P9 Bandoulière', brand: 'Louis Vuitton', price: 11000, image: '/assets/bag.jpg', tag: 'Trending', rating: 4.9 },
  { id: 't3', name: 'Horsebit 1955 Bag', brand: 'Gucci', price: 3200, image: '/assets/bag.jpg', rating: 4.8 },
  { id: 't4', name: 'Cactus Jack Watch', brand: 'Audemars Piguet', price: 125000, image: '/assets/jewelry.jpg', tag: 'Trending', rating: 5.0 },
  { id: 't5', name: 'Lady Dior Mini', brand: 'Dior', price: 4900, image: '/assets/bag.jpg', rating: 4.9 },
  { id: 't6', name: 'Serpenti Watch', brand: 'Bvlgari', price: 15400, image: '/assets/jewelry.jpg', rating: 4.9 },
  { id: 't7', name: 'Roman Stud Bag', brand: 'Valentino', price: 3100, image: '/assets/bag.jpg', rating: 4.8 },
  { id: 't8', name: 'Classic Flap Bag', brand: 'Chanel', price: 8200, image: '/assets/bag.jpg', rating: 4.9 },
  { id: 't9', name: 'Lace pumps', brand: 'Jimmy Choo', price: 850, image: '/assets/hero.jpg', rating: 4.8 },
  { id: 't10', name: 'Signature Belt', brand: 'Hermès', price: 1200, image: '/assets/hero.jpg', rating: 4.9 },
  { id: 't11', name: 'Oyster Perpetual', brand: 'Rolex', price: 9500, image: '/assets/jewelry.jpg', rating: 5.0 },
  { id: 't12', name: 'Cassette Bag', brand: 'Bottega Veneta', price: 3500, image: '/assets/bag.jpg', rating: 4.9 },
];

const FEATURED: Product[] = [
  { id: 'f1', name: 'Rare Birkin 30', brand: 'Hermès', price: 25000, image: '/assets/bag.jpg', tag: 'Featured', rating: 5.0 },
  { id: 'f2', name: 'Classic Flap Bag', brand: 'Chanel', price: 8200, image: '/assets/bag.jpg', tag: 'Featured', rating: 4.9 },
  { id: 'f3', name: 'Roman Stud Bag', brand: 'Valentino', price: 3100, image: '/assets/bag.jpg', rating: 4.8 },
  { id: 'f4', name: 'Serpenti Watch', brand: 'Bvlgari', price: 15400, image: '/assets/jewelry.jpg', rating: 4.9 },
  { id: 'f5', name: 'Lady Dior Mini', brand: 'Dior', price: 4900, image: '/assets/bag.jpg', tag: 'Featured', rating: 5.0 },
  { id: 'f6', name: 'Monogram Trunk', brand: 'Louis Vuitton', price: 12000, image: '/assets/bag.jpg', rating: 4.9 },
  { id: 'f7', name: 'Velvet Evening Gown', brand: 'Gucci', price: 5600, image: '/assets/dress.jpg', rating: 4.8 },
  { id: 'f8', name: 'Gold Link Bracelet', brand: 'Tiffany & Co.', price: 3200, image: '/assets/jewelry.jpg', rating: 4.7 },
];

export function NafsheFeaturedGallery() {
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
             {NEW_ARRIVALS.map((product) => (
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
             {TRENDING.map((product) => (
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
             {FEATURED.map((product) => (
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
    <Link href={`/products/${product.id}`} className="group space-y-4 animate-fade-in">
      <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden shadow-sm p-1.5 border border-dashed border-accent/10 group-hover:border-accent/40 transition-all duration-700">
        <div className="relative h-full w-full overflow-hidden">
           <Image 
             src={product.image} 
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

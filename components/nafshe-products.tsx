'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  tag?: string;
  rating: number;
  category: 'New Arrival' | 'Featured' | 'Trending';
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Monogram Tote', brand: 'Louis Vuitton', price: 4500, image: '/products/louis-vuitton-bag.jpg', tag: 'New', rating: 4.9, category: 'New Arrival' },
  { id: '2', name: 'Silk Evening Dress', brand: 'Valentino', price: 3400, image: '/products/silk-dress.jpg', tag: 'Rare', rating: 5.0, category: 'Featured' },
  { id: '3', name: 'Gold Jewelry Set', brand: 'Dior', price: 5200, image: '/products/gold-jewelry.jpg', tag: 'Hot', rating: 4.8, category: 'Trending' },
  { id: '4', name: 'Statement Sunglasses', brand: 'Chanel', price: 950, image: '/products/designer-sunglasses.jpg', rating: 4.7, category: 'New Arrival' },
  { id: '5', name: 'Air Jordan 1 Luxe', brand: 'Nike x Dior', price: 2200, image: '/products/jordan-sneaker.jpg', tag: 'Limited', rating: 4.9, category: 'Featured' },
  { id: '6', name: 'Elite Chrono', brand: 'Patek Philippe', price: 85000, image: '/products/designer-watch.jpg', rating: 5.0, category: 'Trending' },
];

export function NafsheProducts() {
  const [activeTab, setActiveTab] = useState<'New Arrival' | 'Featured' | 'Trending'>('New Arrival');
  const filteredProducts = PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section id="collections" className="py-4 px-6 bg-white overflow-hidden relative border-b border-dashed border-black/5">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* Collection Header & Tabs - Ultra Compact */}
        <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-2">
           <div className="flex items-center gap-6">
              <h2 className="text-lg md:text-xl font-light text-luxury tracking-tighter leading-none">
                 The <span className="italic serif text-accent">Collections</span>
              </h2>
              
              <div className="flex gap-4">
                 {(['New Arrival', 'Featured', 'Trending'] as const).map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`text-[8px] uppercase tracking-[0.2em] font-bold transition-all relative pb-1 ${
                       activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                     }`}
                   >
                     {tab}
                     {activeTab === tab && (
                       <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent animate-scale-in" />
                     )}
                   </button>
                 ))}
              </div>
           </div>
           
           <Link href="/products" className="text-[7px] uppercase tracking-[0.4em] font-bold text-accent hover:opacity-70">View All</Link>
        </div>

        {/* High-Density Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`} 
              className="group space-y-1 p-0.5 border border-dashed border-transparent hover:border-accent/30 transition-all duration-700"
            >
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden shadow-sm">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                />
                {product.tag && (
                  <div className="absolute top-1 left-1 bg-accent text-primary text-[6px] uppercase font-bold px-1.5 py-0.5">
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="space-y-0">
                <div className="flex items-center justify-between">
                   <p className="text-[7px] uppercase tracking-widest text-muted-foreground font-bold">{product.brand}</p>
                </div>
                <h3 className="text-[9px] font-medium truncate tracking-tight leading-none">{product.name}</h3>
                <p className="text-[9px] font-bold text-accent leading-none">${product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
          
          <Link href="/products" className="group flex flex-col items-center justify-center border border-dashed border-black/10 hover:border-accent/50 transition-all aspect-[4/3] bg-neutral-50/50">
             <TrendingUp className="w-4 h-4 text-accent mb-2 group-hover:scale-110 transition-transform" />
             <p className="text-[7px] uppercase tracking-[0.4em] font-bold text-muted-foreground group-hover:text-primary">See All</p>
          </Link>
        </div>

      </div>
    </section>
  );
}

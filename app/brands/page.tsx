'use client';

import { useState, useEffect } from 'react';
import { NafsheFooter } from '@/components/nafshe-footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/brands')
      .then(res => res.json())
      .then(data => {
        setBrands(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching brands:', err);
        setLoading(false);
      });
  }, []);

  // Sort brands alphabetically
  const sortedBrands = [...brands].sort((a, b) => 
    (a.name_display || a.name).localeCompare(b.name_display || b.name)
  );

  // Group by first letter
  const groupedBrands = sortedBrands.reduce((acc, brand) => {
    const letter = (brand.name_display || brand.name)[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {} as Record<string, any[]>);

  const letters = Object.keys(groupedBrands).sort();

  return (
    <div className="bg-background min-h-screen">

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-24 animate-fade-in-up">
           <div className="flex items-center justify-center gap-4 text-accent">
              <div className="h-px w-8 bg-accent/30" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">The Directory</p>
              <div className="h-px w-8 bg-accent/30" />
           </div>
            <h1 className="text-4xl md:text-6xl font-light text-luxury">The Luxury <span className="italic serif text-accent">Houses</span></h1>
           <p className="max-w-xl mx-auto text-sm text-muted-foreground font-light leading-relaxed">
             "A curated index of the world's most prestigious labels, each selected for their commitment to exceptional craftsmanship and timeless design."
           </p>
        </div>

        {/* Featured Brands Horizontal Scroll */}
        {loading ? (
          <div className="mb-32 space-y-10 animate-pulse">
            <div className="h-6 bg-muted w-1/4 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted" />
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-32 space-y-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-light text-luxury tracking-tighter">Featured <span className="italic serif text-accent">Partners</span></h2>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-accent">
                   <Sparkles className="w-3 h-3" />
                   Exclusive Collections
                </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {sortedBrands.slice(0, 4).map((brand) => (
                <Link 
                  key={brand.id}
                  href={`/products?brand=${brand.name}`}
                  className="group relative h-64 overflow-hidden flex items-center justify-center border border-border hover:border-accent transition-all duration-700 shadow-xl"
                >
                   {/* Brand Editorial Background */}
                   <Image 
                     src={brand.image || '/assets/hero.jpg'} 
                     alt={brand.name} 
                     fill 
                     className="object-cover group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
                   
                   <div className="relative z-10 text-center space-y-2">
                      <p className="text-lg font-light text-white tracking-[0.2em] group-hover:scale-110 transition-transform duration-700 drop-shadow-lg uppercase">{brand.name_display || brand.name}</p>
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white/80">
                         <span className="text-[8px] uppercase tracking-widest font-bold">Explore Maison</span>
                         <ArrowRight className="w-3 h-3" />
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
        )}

        {/* Alphabetical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          {letters.map((letter) => (
            <div key={letter} className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="text-2xl font-light text-accent/40 serif">{letter}</span>
                 <div className="h-px flex-1 bg-border/40" />
              </div>
              <div className="space-y-4">
                {groupedBrands[letter].map((brand) => (
                  <Link 
                    key={brand.id}
                    href={`/products?brand=${brand.name}`}
                    className="block group"
                  >
                    <div className="flex items-center justify-between py-1">
                       <span className="text-base font-light text-foreground group-hover:text-accent transition-colors">
                         {brand.name_display || brand.name}
                       </span>
                       <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>

      <NafsheFooter />
    </div>
  );
}

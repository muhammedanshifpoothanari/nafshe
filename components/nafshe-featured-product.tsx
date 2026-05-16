'use client';

import Image from 'next/image';
import { ShoppingBag, ArrowRight, Scissors } from 'lucide-react';
import Link from 'next/link';

export function NafsheFeaturedProduct() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Product Visual with Stitched Frame */}
          <div className="relative aspect-[4/5] md:aspect-square p-2 border border-dashed border-accent/30 rounded-sm">
            <div className="relative h-full w-full overflow-hidden shadow-2xl">
              <Image 
                src="/assets/bag.jpg" 
                alt="Featured Masterpiece" 
                fill 
                className="object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-105 transition-all duration-[2s]" 
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-dashed border-accent/20">
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">Rare Acquisition</p>
              </div>
            </div>
          </div>

          {/* Product Story */}
          <div className="space-y-10 lg:pl-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                 <Scissors className="w-4 h-4" />
                 <p className="text-[11px] uppercase tracking-[0.6em] font-bold">The February Masterpiece</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-light text-luxury tracking-tighter leading-none">
                Lady Dior <br />
                <span className="italic serif text-accent">Mini Velvet</span>
              </h2>
              <div className="flex items-center gap-6">
                <p className="text-2xl font-light tracking-tight">$4,900</p>
                <div className="h-px w-20 bg-accent/30" />
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Jeddah Flagship Exclusive</p>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md italic">
                "A timeless icon reinvented in midnight velvet. This limited piece represents the pinnacle of Dior's craftsmanship, available exclusively to the Nafshe circle."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link href="/products/1" className="w-full sm:w-auto px-14 py-5 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl hover:bg-accent group flex items-center justify-center gap-4 transition-all">
                <ShoppingBag className="w-4 h-4" />
                Buy Now
              </Link>
              <Link href="/products" className="flex items-center gap-3 group text-[10px] uppercase tracking-widest font-bold">
                 <span>Full Collection</span>
                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

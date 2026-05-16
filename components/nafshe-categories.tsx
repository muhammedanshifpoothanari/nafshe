'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Scissors, ArrowUpRight } from 'lucide-react';

export function NafsheCategories() {
  return (
    <section className="py-2 bg-[#FBFBF9] overflow-hidden relative">
      {/* Background Stitch Line Decor */}

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Unique Heading with Stitch Detail */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-foreground/70">
              <Scissors className="w-3 h-3 rotate-90" />
              <p className="text-[8px] uppercase tracking-[0.5em] font-bold">The Sanctuary</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-luxury tracking-tighter leading-none">
              Browse <span className="italic serif text-accent">Categories</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center h-[60vh]">

          {/* MASTER PIECE: Apparel (Stitched Frame) */}
          <Link
            href="/products?category=apparel"
            className="md:col-span-7 group relative h-full overflow-hidden p-2 border border-dashed border-accent/30 rounded-sm"
          >
            <div className="relative h-full w-full overflow-hidden bg-neutral-900 shadow-2xl">
              <Image
                src="/assets/dress.jpg"
                alt="Apparel"
                fill
                className="object-cover transition-all duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-transparent to-transparent opacity-40" />

              <div className="absolute top-10 left-10 space-y-2">
                <div className="flex items-center gap-3 text-foreground/70">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <p className="text-[9px] uppercase tracking-[0.5em] font-bold">The Signature</p>
                </div>
                <h3 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-none">
                  App<span className="italic serif text-accent">arel</span>
                </h3>
              </div>

              {/* Angled Explore Badge */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <span className="text-[9px] uppercase tracking-widest font-bold text-white">Explore Maison</span>
                <ArrowUpRight className="w-3 h-3 text-accent" />
              </div>
            </div>
          </Link>

          {/* STITCHED STACK: Others */}
          <div className="md:col-span-5 grid grid-rows-3 gap-4 h-full py-2">

            {['Handbags', 'Jewelry', 'Footwear'].map((name, i) => (
              <Link
                key={name}
                href={`/products?category=${name.toLowerCase()}`}
                className={`group relative h-full overflow-hidden p-1.5 border border-dashed border-accent/20 rounded-sm transition-all hover:border-accent ${i === 1 ? 'mr-12' : 'ml-12'}`}
              >
                <div className="relative h-full w-full overflow-hidden bg-neutral-900 shadow-lg">
                  <Image src={i === 0 ? '/assets/bag.jpg' : i === 1 ? '/assets/jewelry.jpg' : '/assets/valentino-shoes.jpg'} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-between px-8">
                    <h3 className="text-white text-sm font-bold uppercase tracking-[0.3em]">
                      {name === 'Handbags' ? (<>Hand<span className="italic serif text-accent">bags</span></>) : 
                       name === 'Jewelry' ? (<>Jewel<span className="italic serif text-accent">ry</span></>) : 
                       (<>Foot<span className="italic serif text-accent">wear</span></>)}
                    </h3>
                    {/* Angled Explore Link - Always visible for mobile */}
                    <div className="flex items-center gap-1 -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <span className="text-accent text-[9px] font-serif italic">Explore</span>
                      <ArrowUpRight className="w-2.5 h-2.5 text-accent" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

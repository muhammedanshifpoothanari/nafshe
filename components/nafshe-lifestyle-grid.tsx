'use client';

import Image from 'next/image';
import { Instagram } from 'lucide-react';

const LIFESTYLE_IMAGES = [
  { id: 1, image: '/products/silk-dress.jpg' },
  { id: 2, image: '/products/louis-vuitton-bag.jpg' },
  { id: 3, image: '/products/gold-jewelry.jpg' },
  { id: 4, image: '/products/designer-watch.jpg' },
  { id: 5, image: '/products/designer-sunglasses.jpg' },
  { id: 6, image: '/products/nike-luxury-shoes.jpg' },
];

export function NafsheLifestyleGrid() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in-up">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">The Social Circle</p>
            <h2 className="text-3xl font-light text-luxury tracking-wide">Nafshe <span className="italic serif text-accent">in the Wild</span></h2>
          </div>
          <a
            href="https://instagram.com/nafshe_official"
            target="_blank"
            className="flex items-center gap-3 px-6 py-2 border border-border rounded-full hover:bg-muted transition-all group"
          >
            <Instagram className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase">@nafshe_official</p>
          </a>
        </div>

        {/* Square Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {LIFESTYLE_IMAGES.map((item, index) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden group cursor-pointer animate-fade-in-up shadow-luxury"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={item.image}
                alt="Lifestyle"
                fill
                className="object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <Instagram className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Tagline */}
        <div className="text-center pt-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Share your elegance with <span className="text-foreground">#NafsheWoman</span>
          </p>
        </div>

      </div>
    </section>
  );
}

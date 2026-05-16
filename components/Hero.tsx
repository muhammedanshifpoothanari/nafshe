'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full py-32 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        {/* Geometric Logo Mark */}
        <div className="flex justify-center">
          <span className="text-6xl md:text-7xl text-accent font-light">▲</span>
        </div>

        {/* Brand Name - Ultra Minimal */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-foreground tracking-[0.2em] leading-none">
          NAFSHE
        </h1>

        {/* Elegant Divider */}
        <div className="flex justify-center pt-4">
          <div className="w-12 h-px bg-accent"></div>
        </div>

        {/* Brand Tagline */}
        <p className="text-xs md:text-sm tracking-[0.25em] text-muted-foreground uppercase font-light pt-4">
          Natural · Authentic · Timeless
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light pt-6">
          Curated collections of premium abayas and formal wear, 
          crafted with exceptional attention to detail and timeless elegance.
        </p>

        {/* Minimalist CTA Button */}
        <div className="pt-12">
          <Link
            href="/products"
            className="inline-block px-10 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-light tracking-widest uppercase text-xs"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

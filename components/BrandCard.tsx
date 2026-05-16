'use client';

import Link from 'next/link';
import { Brand } from '@/lib/data/brands';
import { ArrowRight } from 'lucide-react';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.id}`}>
      <div className="group cursor-pointer border border-border bg-card hover:border-accent transition-all duration-500 luxury-hover p-8">
        {/* Logo/Symbol */}
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
          {brand.logo}
        </div>

        {/* Brand Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-light tracking-wide">
            {brand.name}
          </h3>
          <p className="text-sm font-light text-accent">
            {brand.tagline}
          </p>
          <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
            {brand.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <span className="text-xs font-light tracking-widest uppercase text-muted-foreground">
            Shop Brand
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300" />
        </div>
      </div>
    </Link>
  );
}

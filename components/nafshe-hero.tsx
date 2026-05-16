'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export function NafsheHero() {
  return (
    <section className="relative h-[65vh] w-full overflow-hidden bg-white">
      {/* Background Cinematic Image - Pure Light & Untouched */}
      <div className="absolute -inset-[1px]">
        <Image
          src="/assets/hero.jpg"
          alt="Nafshe Luxury"
          fill
          priority
          className="object-cover object-center transition-all duration-[3s] scale-105"
        />
      </div>

      {/* Global Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* Content - Centered (Reverted as requested) */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-6 animate-fade-in-up flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.8em] text-white font-black" style={{ textShadow: '0 2px 5px rgba(100, 80, 60, 0.4)' }}>
            Jeddah Flagship Maison
          </p>
          <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none" style={{ textShadow: '0 2px 10px rgba(100, 80, 60, 0.3)' }}>
            The Future <br />
            <span className="italic serif text-accent">of Elegance</span>
          </h1>
          <p className="max-w-md mx-auto text-sm text-white font-medium italic leading-relaxed tracking-wide" style={{ textShadow: '0 4px 15px rgba(100, 80, 60, 0.5)' }}>
            "An ultra-premium sanctuary where high-fashion meets the soul of Jeddah. Curated for the elite."
          </p>
        </div>

        {/* Seamless Maison Arch Frame (Solid White for Pure Architecture) */}
        <div className="absolute -bottom-[1px] left-0 w-full z-40">
          <div className="relative overflow-hidden leading-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[120px] z-10 translate-y-[1px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,120H1200V42.47C1113,-1.11 989.49,25 892.45,53.67C857.85,65.17 824.15,77.01 788,83.01C716.9,94.81 647.87,87.93 578.6,69.93C507.94,51.55 434.24,30.31 364.8,24.79C294.33,20.6 228.36,48.54 158,53.91C103.59,58.08 47.79,48.11 0,25.91V120Z" fill="white"></path>
            </svg>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-40">
          <div className="w-px h-12 bg-accent/50" />
          <ArrowDown className="w-4 h-4 text-accent" />
        </div>
      </div>
    </section>
  );
}

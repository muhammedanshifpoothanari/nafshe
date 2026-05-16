'use client';

import { NafsheHero } from '@/components/nafshe-hero';
import { StoryCarousel } from '@/components/story-carousel';
import { NafsheCategories } from '@/components/nafshe-categories';
import { NafsheFeaturedGallery } from '@/components/nafshe-featured-gallery';
import { NafsheEditorialPromo } from '@/components/nafshe-editorial-promo';
import { NafsheBrands } from '@/components/nafshe-brands';
import { NafsheLifestyleGrid } from '@/components/nafshe-lifestyle-grid';
import { NafsheArchiveGallery } from '@/components/nafshe-archive-gallery';
import { NafsheFooter } from '@/components/nafshe-footer';

export default function Home() {
  const futuristicGrid = {
    backgroundImage: `
      linear-gradient(to right, #C9A86B 1px, transparent 1px),
      linear-gradient(to bottom, #C9A86B 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    opacity: 0.05
  };

  return (
    <div className="min-h-screen bg-white selection:bg-accent/30 overflow-x-hidden relative">
      {/* Global Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* Main Sanctuary Layout */}
      <main className="space-y-0 relative z-10">
        <NafsheHero />

        {/* Story Section - Technical Grid Anchor */}
        <div className="pt-8 pb-4 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <StoryCarousel />
          </div>
        </div>

        {/* Categories with Grid Texture */}
        <div className="relative overflow-hidden py-2">
          <div className="absolute inset-0 z-0 pointer-events-none" style={futuristicGrid} />
          <NafsheCategories />
        </div>

        {/* Featured Gallery Section (Includes Trending) */}
        <div className="py-8 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none" style={futuristicGrid} />
          <NafsheFeaturedGallery />
        </div>

        {/* Architectural Transition: Collection to Vault Portal */}
        <div className="bg-white relative h-24 overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0 pointer-events-none" style={futuristicGrid} />
          <div className="relative z-20 flex flex-col items-center gap-3">
            <div className="w-px h-8 bg-accent/40 border-dashed border-l" />
            <p className="text-[9px] uppercase tracking-[0.8em] text-accent font-bold">The Archives</p>
          </div>
          <svg className="absolute bottom-0 left-0 w-full h-full z-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V120H1200V0C1113,43.58 989.49,17.58 892.45,-11.09C857.85,-22.59 824.15,-34.43 788,-40.43C716.9,-52.23 647.87,-45.35 578.6,-27.35C507.94,-8.97 434.24,12.27 364.8,17.79C294.33,21.98 228.36,-5.96 158,-11.33C103.59,-15.5 47.79,-5.53 0,16.67V0Z" fill="white"></path>
          </svg>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none" style={futuristicGrid} />
          <NafsheArchiveGallery />
        </div>

        <div className="relative overflow-hidden py-8">
          <div className="absolute inset-0 z-0 pointer-events-none" style={futuristicGrid} />
          <NafsheEditorialPromo />
        </div>

        <div className="relative overflow-hidden py-4">
          <div className="absolute inset-0 z-0 pointer-events-none" style={futuristicGrid} />
          <NafsheBrands />
        </div>

        <div className="py-4 bg-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none" style={futuristicGrid} />
          <NafsheLifestyleGrid />
        </div>

      </main>

      <NafsheFooter />
    </div>
  );
}

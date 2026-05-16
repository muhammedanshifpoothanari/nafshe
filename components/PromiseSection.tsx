'use client';

import { Sparkles, Heart, Hand } from 'lucide-react';

export function PromiseSection() {
  const promises = [
    {
      icon: Sparkles,
      title: 'Premium Fabrics',
      description: 'Only the finest, highest-quality materials are selected for their exceptional softness and durability.',
    },
    {
      icon: Hand,
      title: 'Handcrafted Details',
      description: 'Every stitch and embellishment is meticulously placed by skilled artisans with unwavering attention.',
    },
    {
      icon: Heart,
      title: 'Made with Authenticity',
      description: 'Each collection is created to celebrate timeless elegance and natural beauty in every moment.',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header - Minimal Luxury */}
        <div className="text-center mb-20 space-y-6">
          <div className="flex justify-center">
            <div className="w-8 h-px bg-accent"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-foreground tracking-wide">
            The Nafshe Promise
          </h2>
          <p className="text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Every collection is crafted with exceptional attention to detail and timeless elegance.
          </p>
        </div>

        {/* Promise Cards - Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={index}
                className="space-y-6 flex flex-col items-center text-center"
              >
                {/* Icon - Minimal Circle */}
                <div className="w-14 h-14 border border-accent flex items-center justify-center rounded-full">
                  <Icon className="w-7 h-7 text-accent" strokeWidth={1.2} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-light text-foreground tracking-wide">
                  {promise.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

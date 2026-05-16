'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';
import { useTranslation } from '@/lib/i18n';

export function TestimonialsCarousel() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollPrev = () => scroll('left');
  const scrollNext = () => scroll('right');

  return (
    <section className="w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-luxury">
            {t('testimonials.title')}
          </h2>
          <p className="text-muted-foreground">Trusted by thousands of happy customers</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide" ref={scrollContainerRef}>
            <div className="flex gap-6 md:gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <div className="luxury-card h-full">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(testimonial.rating)
                              ? 'fill-accent text-accent'
                              : 'text-border'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-foreground mb-6 leading-relaxed italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-border">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {testimonial.name}
                          {testimonial.verified && <span className="text-xs ml-1">✓</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            ref={prevButtonRef}
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-8 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            ref={nextButtonRef}
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-8 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

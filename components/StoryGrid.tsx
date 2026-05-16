'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
}

const stories: Story[] = [
  {
    id: '1',
    image: '/images/story-collection.jpg',
    title: 'New Arrivals',
    subtitle: 'Discover fresh collections',
    href: '/products?category=new',
    cta: 'Shop Now',
  },
  {
    id: '2',
    image: '/images/category-formal.jpg',
    title: 'Formal Wear',
    subtitle: 'Elegant evening gowns',
    href: '/products?category=Formal',
    cta: 'Explore',
  },
  {
    id: '3',
    image: '/images/category-accessories.jpg',
    title: 'Accessories',
    subtitle: 'Premium luxury pieces',
    href: '/products?category=Accessories',
    cta: 'View',
  },
  {
    id: '4',
    image: '/images/hero-main.jpg',
    title: 'Limited Edition',
    subtitle: 'Exclusive collections',
    href: '/products?category=Limited',
    cta: 'Discover',
  },
];

export function StoryGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollPrev = () => scroll('left');
  const scrollNext = () => scroll('right');

  return (
    <section className="w-full py-12 px-4 md:px-6 lg:px-8">
      <div className="relative">
        {/* Carousel container */}
        <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide" ref={scrollContainerRef}>
          <div className="flex gap-4 md:gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.333%-12px)] lg:flex-[0_0_calc(25%-14px)]"
              >
                <Link href={story.href}>
                  <div className="relative aspect-square group cursor-pointer overflow-hidden rounded-2xl">
                    {/* Image */}
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
                      <h3 className="text-lg md:text-xl font-bold mb-1">{story.title}</h3>
                      <p className="text-xs md:text-sm text-white/80 mb-3">{story.subtitle}</p>
                      <span className="inline-flex items-center text-xs font-semibold text-accent group-hover:text-accent/90">
                        {story.cta} →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          ref={prevButtonRef}
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-8 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          ref={nextButtonRef}
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-8 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

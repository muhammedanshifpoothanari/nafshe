'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Story {
  id: string;
  image: string;
  brand: string;
  title: string;
  link?: string;
}

const STORIES: Story[] = [
  { id: '1', image: '/products/nike-luxury-shoes.jpg', brand: 'Chanel', title: 'The Spring Edit', link: '/products?brand=Chanel' },
  { id: '2', image: '/products/louis-vuitton-bag.jpg', brand: 'Dior', title: 'Maison Dreams', link: '/products?brand=Dior' },
  { id: '3', image: '/products/jordan-sneaker.jpg', brand: 'Valentino', title: 'Roma Series', link: '/products?brand=Valentino' },
  { id: '4', image: '/products/designer-watch.jpg', brand: 'Prada', title: 'Milano Style', link: '/products?brand=Prada' },
  { id: '5', image: '/products/designer-sunglasses.jpg', brand: 'Hermès', title: 'Silk Journal', link: '/products?brand=Hermès' },
  { id: '6', image: '/products/silk-dress.jpg', brand: 'Gucci', title: 'Garden Party', link: '/products?brand=Gucci' },
];

export function StoryCarousel() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);

  const closeStory = useCallback(() => {
    setSelectedStory(null);
  }, []);

  const nextStory = useCallback(() => {
    if (storyIndex < STORIES.length - 1) {
      const nextIdx = storyIndex + 1;
      setStoryIndex(nextIdx);
      setSelectedStory(STORIES[nextIdx]);
    } else {
      closeStory();
    }
  }, [storyIndex, closeStory]);

  const prevStory = useCallback(() => {
    if (storyIndex > 0) {
      const prevIdx = storyIndex - 1;
      setStoryIndex(prevIdx);
      setSelectedStory(STORIES[prevIdx]);
    }
  }, [storyIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedStory) {
      timer = setTimeout(() => {
        nextStory();
      }, 5000); // 5 seconds per story
    }
    return () => clearTimeout(timer);
  }, [selectedStory, storyIndex, nextStory]);

  const openStory = (index: number) => {
    setSelectedStory(STORIES[index]);
    setStoryIndex(index);
  };

  return (
    <>
      <div className="px-4 py-12 relative overflow-hidden bg-white">
        {/* High-Precision Grid Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: `
                 linear-gradient(to right, #C9A86B 1px, transparent 1px),
                 linear-gradient(to bottom, #C9A86B 1px, transparent 1px)
               `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Dynamic Scanning Glow Pulse */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]"
          style={{
            backgroundImage: `
                 linear-gradient(to right, #C9A86B 1.5px, transparent 1.5px),
                 linear-gradient(to bottom, #C9A86B 1.5px, transparent 1.5px)
               `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 40%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 40%)',
            animation: 'scanning-pulse 8s linear infinite'
          }}
        />

        <style jsx>{`
          @keyframes scanning-pulse {
            0% { mask-position: -50% -50%; -webkit-mask-position: -50% -50%; }
            100% { mask-position: 150% 150%; -webkit-mask-position: 150% 150%; }
          }
        `}</style>

        {/* Subtle Scanning Light Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-accent/10 to-transparent w-[20%] h-full -skew-x-12 animate-[shimmer_8s_infinite] opacity-30" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-center gap-5 sm:gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {STORIES.map((story, index) => (
              <button
                key={story.id}
                onClick={() => openStory(index)}
                className="flex-shrink-0 flex flex-col items-center gap-2 group transition-all animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Refined ultra-thin gradient ring */}
                <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-rose-200 via-stone-200 to-amber-100 group-hover:scale-105 transition-transform duration-500">
                  <div className="p-[2px] rounded-full bg-background">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden transition-all duration-700">
                      <Image src={story.image} alt={story.brand} fill className="object-cover" />
                    </div>
                  </div>
                </div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-bold group-hover:text-foreground transition-colors">
                  {story.brand}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story Modal — Premium Radiant Fullscreen */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl animate-fade-in flex flex-col items-center justify-center p-0"
          onClick={closeStory}
        >
          <div 
            className="relative w-full h-full max-w-lg bg-black overflow-hidden md:h-[90vh] md:rounded-3xl shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full z-30 p-6 bg-gradient-to-b from-black/60 to-transparent">
              {/* Progress Bars */}
              <div className="flex gap-1.5 mb-4">
                {STORIES.map((_, i) => (
                  <div key={i} className="flex-1 h-[2.5px] bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-white transition-all duration-[5000ms] ease-linear ${
                        i === storyIndex ? 'w-full' : i < storyIndex ? 'w-full' : 'w-0'
                      }`}
                      key={`${i}-${storyIndex}`} // Force re-render of current bar
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-accent/40 overflow-hidden bg-stone-100">
                    <Image src={selectedStory.image} alt={selectedStory.brand} width={40} height={40} className="object-cover h-full w-full" />
                  </div>
                  <div className="drop-shadow-md">
                    <p className="text-xs font-black text-white uppercase tracking-[0.2em]">{selectedStory.brand}</p>
                    <p className="text-[9px] text-accent font-black uppercase tracking-tighter">Exclusive Feature</p>
                  </div>
                </div>
                <button onClick={closeStory} className="text-white hover:rotate-90 transition-transform duration-300 p-2">
                  <X className="w-7 h-7" />
                </button>
              </div>
            </div>

            <div className="relative w-full h-full">
              <Image src={selectedStory.image} alt={selectedStory.title} fill className="object-cover animate-scale-in" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
            </div>

            {/* Navigation Tap Zones */}
            <div className="absolute inset-y-0 left-0 w-1/4 z-40 cursor-pointer" onClick={prevStory} title="Previous" />
            <div className="absolute inset-y-0 right-0 w-1/4 z-40 cursor-pointer" onClick={nextStory} title="Next" />

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 w-full p-10 pb-16 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-center z-30">
              <h3 className="text-4xl font-light text-white italic serif mb-6 tracking-tight">{selectedStory.title}</h3>
              <a
                href={selectedStory.link || '#'}
                className="inline-flex items-center justify-center px-12 py-4 bg-white text-black text-[11px] uppercase tracking-[0.4em] font-black hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
              >
                Acquire Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

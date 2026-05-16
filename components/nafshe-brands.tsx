'use client';

const brands = [
  { name: 'Chanel', tagline: 'Haute Couture' },
  { name: 'Dior', tagline: 'Maison Christian Dior' },
  { name: 'Louis Vuitton', tagline: 'Maison Fondée en 1854' },
  { name: 'Gucci', tagline: 'La Maison Gucci' },
  { name: 'Valentino', tagline: 'Roma' },
  { name: 'Prada', tagline: 'Milano' },
  { name: 'Hermès', tagline: 'Paris' },
  { name: 'Balenciaga', tagline: 'Haute Couture' },
];

// Duplicate for seamless infinite scroll
const marqueeItems = [...brands, ...brands];

export function NafsheBrands() {
  return (
    <section className="py-12 sm:py-16 bg-primary overflow-hidden">
      {/* Section label */}
      <div className="px-6 mb-8 sm:mb-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/40 mb-2">
          Our Partners
        </p>
        <h2 className="text-xl sm:text-2xl font-light text-primary-foreground tracking-wide">
          Our <span className="italic serif text-accent">Partners</span>
        </h2>
      </div>

      {/* Auto-scrolling marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-primary to-transparent pointer-events-none" />

        <div className="flex gap-0 overflow-hidden">
          <div className="flex gap-0 animate-marquee">
            {marqueeItems.map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex flex-col items-center justify-center px-8 sm:px-12 py-4 border-r border-primary-foreground/10 group cursor-pointer"
              >
                <p className="text-base sm:text-lg font-light text-primary-foreground tracking-widest whitespace-nowrap group-hover:text-primary-foreground/60 transition-colors duration-300">
                  {brand.name}
                </p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/30 mt-0.5 whitespace-nowrap">
                  {brand.tagline}
                </p>
              </div>
            ))}
          </div>
          {/* Second copy for seamless loop */}
          <div className="flex gap-0 animate-marquee" aria-hidden="true">
            {marqueeItems.map((brand, idx) => (
              <div
                key={`b-${idx}`}
                className="flex-shrink-0 flex flex-col items-center justify-center px-8 sm:px-12 py-4 border-r border-primary-foreground/10 group cursor-pointer"
              >
                <p className="text-base sm:text-lg font-light text-primary-foreground tracking-widest whitespace-nowrap group-hover:text-primary-foreground/60 transition-colors duration-300">
                  {brand.name}
                </p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/30 mt-0.5 whitespace-nowrap">
                  {brand.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="px-6 mt-8 sm:mt-10 text-center">
        <p className="text-xs text-primary-foreground/30 font-light tracking-widest uppercase">
          Exclusive Access · Early Releases · VIP Experiences
        </p>
      </div>
    </section>
  );
}

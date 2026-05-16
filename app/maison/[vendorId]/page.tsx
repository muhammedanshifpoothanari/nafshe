'use client';

import { use, useState, useEffect } from 'react';
import { NafsheFooter } from '@/components/nafshe-footer';
import { Crown, ShieldCheck, Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock vendor data — In production this would come from an API
const MAISONS: Record<string, any> = {
  'dior': { name: 'Maison Dior', logo: '/assets/jewelry.jpg', bg: '/assets/hero.jpg', description: 'The pinnacle of French luxury and heritage craftsmanship since 1946.', products: ['3'] },
  'louis-vuitton': { name: 'Louis Vuitton', logo: '/assets/bag.jpg', bg: '/assets/interior.jpg', description: 'World-renowned for luxury leather goods and the art of travel.', products: ['1'] },
  'valentino': { name: 'Maison Valentino', logo: '/assets/dress.jpg', bg: '/assets/hero.jpg', description: 'Defined by grace, romanticism, and timeless Italian elegance.', products: ['2'] },
};

const ALL_PRODUCTS: Record<string, any> = {
  '1': { id: '1', name: 'Monogram Tote', brand: 'Louis Vuitton', price: 4500, image: '/assets/bag.jpg' },
  '2': { id: '2', name: 'Silk Evening Dress', brand: 'Valentino', price: 3400, image: '/assets/dress.jpg' },
  '3': { id: '3', name: 'Gold Jewelry Set', brand: 'Dior', price: 5200, image: '/assets/jewelry.jpg' },
};

export default function MaisonPage({ params }: { params: Promise<{ vendorId: string }> }) {
  const { vendorId } = use(params);
  const maison = MAISONS[vendorId] || MAISONS['dior'];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      
      {/* Maison Hero — Immersive Branding */}
      <section className="relative h-[80vh] w-full overflow-hidden">
         <Image src={maison.bg} alt={maison.name} fill className="object-cover grayscale brightness-[0.7]" />
         <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-background" />
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-8 animate-fade-in">
            <div className="w-24 h-24 relative rounded-full border border-white/20 p-1 bg-white/10 backdrop-blur-md">
               <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src={maison.logo} alt="logo" fill className="object-cover" />
               </div>
            </div>
            <div className="space-y-4 max-w-2xl">
               <div className="flex items-center justify-center gap-3 text-accent">
                  <Crown className="w-5 h-5" />
                  <p className="text-[11px] uppercase tracking-[0.5em] font-bold">The Official Maison</p>
               </div>
               <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter uppercase">{maison.name}</h1>
               <p className="text-sm text-white/60 font-light italic leading-relaxed">{maison.description}</p>
            </div>
         </div>
      </section>

      {/* Floating Maison Navigation */}
      <div className={`sticky top-20 z-[40] transition-all duration-700 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-border py-4 shadow-xl' : 'bg-transparent py-8'}`}>
         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
               <button className="text-accent border-b border-accent pb-1">The Collection</button>
               <button className="text-muted-foreground hover:text-luxury transition-colors">Our Story</button>
               <button className="text-muted-foreground hover:text-luxury transition-colors">Bespoke Sourcing</button>
            </div>
            <div className="flex items-center gap-6">
               <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                  <Filter className="w-3.5 h-3.5" /> Filter
               </button>
               <div className="flex items-center border border-border">
                  <button className="p-2 bg-muted/20 border-r border-border"><LayoutGrid className="w-3.5 h-3.5" /></button>
                  <button className="p-2"><List className="w-3.5 h-3.5" /></button>
               </div>
            </div>
         </div>
      </div>

      {/* Private Collection Grid */}
      <main className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {maison.products.map((id: string) => {
              const product = ALL_PRODUCTS[id];
              return (
                <Link key={id} href={`/products/${id}`} className="group space-y-6 animate-fade-in-up">
                   <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 border border-border shadow-xl">
                         <ShieldCheck className="w-3 h-3 text-accent" />
                         <span className="text-[8px] uppercase tracking-widest font-bold">Authentic Maison Piece</span>
                      </div>
                   </div>
                   <div className="text-center space-y-2">
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{product.brand}</p>
                      <h2 className="text-xl font-light text-luxury">{product.name}</h2>
                      <p className="text-sm font-bold text-foreground">${product.price.toLocaleString()}</p>
                   </div>
                </Link>
              );
            })}
         </div>
      </main>

      <NafsheFooter />
    </div>
  );
}

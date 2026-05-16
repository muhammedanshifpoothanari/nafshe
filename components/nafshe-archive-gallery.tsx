'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Crown, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const ARCHIVE_PIECES = [
   { id: 'ARC-001', name: 'Vintage Lady Dior — 1995 Original', brand: 'House of Dior', img: '/assets/bag.jpg', description: 'Original silk-satin construction from the inaugural collection.' },
   { id: 'ARC-002', name: 'Haute Couture Archive Jacket', brand: 'Maison Valentino', img: '/assets/dress.jpg', description: 'Hand-sewn in Rome with 400 hours of master craftsmanship.' },
   { id: 'ARC-003', name: '24K Gold Heritage Set', brand: 'Nafshe Bespoke', img: '/assets/jewelry.jpg', description: 'Sourced directly from our Jeddah private vault.' },
];

export function NafsheArchiveGallery() {
   return (
      <section className="py-16 bg-primary text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 mb-12 space-y-6 relative z-10">
            <div className="flex items-center gap-4 text-accent">
               <Crown className="w-5 h-5" />
               <p className="text-[10px] uppercase tracking-[0.6em] font-bold">The Archive Sanctuary</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               <h2 className="text-3xl md:text-5xl font-light tracking-tighter leading-none">
                  The Rare <span className="italic serif text-accent">Vault</span>
               </h2>
               <p className="max-w-md text-xs text-white/40 font-light italic leading-relaxed">
                  Exceptional finds from the world's most guarded collections.
               </p>
            </div>
         </div>

         {/* Stable Horizontal Gallery — Reduced Height */}
         <div className="flex gap-8 overflow-x-auto px-6 md:px-[calc((100vw-1280px)/2)] scrollbar-hide snap-x snap-mandatory pb-8">
            {ARCHIVE_PIECES.map((piece) => (
               <div
                  key={piece.id}
                  className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center group"
               >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                     <div className="lg:col-span-7 relative h-[35vh] bg-neutral-900 overflow-hidden shadow-2xl">
                        <Image
                           src={piece.img}
                           alt={piece.name}
                           fill
                           className="object-cover group-hover:scale-110 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />
                        <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20">
                           <p className="text-[9px] font-mono text-accent italic">{piece.id}</p>
                        </div>
                        <div className="absolute bottom-6 left-6 text-white">
                           <p className="text-2xl font-light serif italic">{piece.brand}</p>
                        </div>
                     </div>

                     <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 text-accent/60">
                              <ShieldCheck className="w-4 h-4" />
                              <p className="text-[8px] uppercase tracking-widest font-bold">Verified Vault Piece</p>
                           </div>
                           <h3 className="text-xl md:text-2xl font-light text-white tracking-tight leading-tight">{piece.name}</h3>
                           <p className="text-xs text-white/40 font-light leading-relaxed italic">{piece.description}</p>
                        </div>
                        <Link 
                           href={`https://wa.me/919292898150?text=I am interested in the ${piece.name} from the Rare Vault.`}
                           target="_blank"
                           className="w-full py-4 border border-white/20 text-white text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3"
                        >
                           Enquire <MessageCircle className="w-4 h-4" />
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between border-t border-white/10 pt-10">
            <div className="flex items-center gap-6">
               <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-white/30">Explore Archive</span>
               <ArrowRight className="w-4 h-4 text-accent animate-pulse" />
            </div>
            <Link href="/contact" className="group flex items-center gap-4 text-[9px] uppercase tracking-[0.4em] font-bold text-accent">
               Maison Sourcing <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-3" />
            </Link>
         </div>
      </section>
   );
}

'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { Star, Quote, ShieldCheck, Crown } from 'lucide-react';
import Image from 'next/image';

export default function CustomersPage() {
  const TESTIMONIALS = [
    { name: 'Elena R.', city: 'Dubai', item: 'Lady Dior Bag', quote: "The sourcing speed was unparalleled. A truly private sanctuary for women who appreciate the finer details.", image: '/assets/interior.jpg' },
    { name: 'Sarah J.', city: 'London', item: 'Silk Evening Dress', quote: "Nafshe understands the art of elegance. The piece arrived in pristine condition, gift-wrapped like a dream.", image: '/assets/hero.jpg' },
    { name: 'Yasmine K.', city: 'Riyadh', item: 'Gold Jewelry Set', quote: "Finally, a luxury space that feels safe and curated. The VIP Concierge is my go-to for every occasion.", image: '/assets/jewelry.jpg' },
    { name: 'Chloe M.', city: 'Paris', item: 'Classic Prada Heels', quote: "Bespoke sourcing at its best. They found the elusive heels I've been searching for months.", image: '/assets/bag.jpg' },
  ];

  return (
    <div className="bg-background min-h-screen">
      
      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* Editorial Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
           <div className="flex items-center justify-center gap-3 text-accent">
              <Crown className="w-5 h-5" />
              <p className="text-[11px] uppercase tracking-[0.5em] font-bold">The Collective</p>
           </div>
           <h1 className="text-5xl md:text-7xl font-light text-luxury tracking-tight leading-tight">
             Voices of <span className="italic serif">The Sanctuary</span>
           </h1>
           <p className="text-sm text-muted-foreground font-light leading-relaxed italic">
             "A testament to elegance, security, and the bond between the modern woman and her most cherished acquisitions."
           </p>
        </div>

        {/* Testimonial Grid — High Fashion Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
           {TESTIMONIALS.map((t, i) => (
             <div 
               key={i} 
               className="group space-y-8 animate-fade-in-up"
               style={{ animationDelay: `${i * 200}ms` }}
             >
                <div className="relative aspect-video bg-muted overflow-hidden">
                   <Image src={t.image} alt={t.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                   <div className="absolute inset-0 bg-primary/10" />
                   <div className="absolute bottom-6 right-6">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 border border-border shadow-xl flex items-center gap-3">
                         <ShieldCheck className="w-3 h-3 text-accent" />
                         <p className="text-[8px] uppercase tracking-widest font-bold">Verified Acquisition</p>
                      </div>
                   </div>
                </div>
                
                <div className="space-y-6">
                   <div className="flex gap-1 text-accent">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                   </div>
                   <div className="relative">
                      <Quote className="absolute -top-4 -left-4 w-8 h-8 text-muted/20 -z-10" />
                      <p className="text-xl font-light text-luxury leading-relaxed italic">"{t.quote}"</p>
                   </div>
                   <div className="pt-6 border-t border-border flex items-center justify-between">
                      <div>
                         <p className="text-xs font-bold uppercase tracking-widest">{t.name}</p>
                         <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">{t.city} — {t.item}</p>
                      </div>
                      <div className="w-8 h-[1px] bg-accent/30" />
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Membership Call to Action */}
        <div className="bg-primary p-16 md:p-24 text-center space-y-10 relative overflow-hidden group">
           <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide">Become part of the <span className="italic serif">Legacy</span></h2>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                 Share your acquisition story and join our private inner circle of luxury enthusiasts.
              </p>
              <button className="px-12 py-5 bg-accent text-primary text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all shadow-2xl">
                 Apply for Membership
              </button>
           </div>
           {/* Abstract Decorative Element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full group-hover:scale-110 transition-transform duration-[5s]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full group-hover:scale-125 transition-transform duration-[3s]" />
        </div>

      </main>

      <NafsheFooter />
    </div>
  );
}

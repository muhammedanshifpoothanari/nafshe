'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import Image from 'next/image';
import { Sparkles, Globe, Heart, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-luxury.jpg')] bg-cover bg-fixed bg-center" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="relative z-10 text-center space-y-8 px-6 animate-fade-in-up">
             <div className="flex items-center justify-center gap-4 text-accent">
                <div className="h-px w-12 bg-accent/50" />
                <p className="text-xs uppercase tracking-[0.5em] font-bold">Our Heritage</p>
                <div className="h-px w-12 bg-accent/50" />
             </div>
             <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter">
               The Art of <span className="italic font-serif text-accent">Elegance</span>
             </h1>
             <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-white/80 leading-relaxed italic">
               "Nafshe was born from a singular vision: to bridge the gap between timeless craftsmanship and the digital frontier of luxury."
             </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-32 px-6 bg-white">
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 animate-fade-in-up">
                 <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">The Vision</p>
                    <h2 className="text-4xl md:text-5xl font-light text-luxury leading-tight">Beyond a <span className="italic font-serif">Storefront</span></h2>
                 </div>
                 <div className="space-y-6 text-base font-light text-muted-foreground leading-relaxed">
                    <p>
                      Founded in 2024, Nafshe began as a private collective of luxury curators dedicated to sourcing the world's most elusive pieces. We believe that luxury is not just about the object, but the narrative and the craftsmanship behind it.
                    </p>
                    <p>
                      Today, we stand as a global destination for those who seek the extraordinary. Our platform is designed for the modern woman who values her time as much as her style—providing a seamless, secure, and ultra-fast path to high fashion.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-10 pt-10">
                    <div className="space-y-2">
                       <p className="text-3xl font-light text-luxury">120+</p>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Artisan Brands</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-3xl font-light text-luxury">50K+</p>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Global Members</p>
                    </div>
                 </div>
              </div>
              <div className="relative aspect-square bg-muted overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                 <Image src="/hero-luxury.jpg" alt="Our Atelier" fill className="object-cover" />
                 <div className="absolute inset-0 border-[24px] border-white/20" />
              </div>
           </div>
        </section>

        {/* Pillars Section */}
        <section className="py-32 px-6 bg-muted/20 border-t border-border">
           <div className="max-w-7xl mx-auto space-y-20">
              <div className="text-center space-y-4">
                 <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">The Pillars</p>
                 <h2 className="text-4xl font-light text-luxury">What Sets Us <span className="italic font-serif">Apart</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                 {[
                   { icon: Globe, title: 'Global Sourcing', desc: 'Direct partnerships with major luxury houses in Paris, Milan, and Dubai.' },
                   { icon: ShieldCheck, title: 'Auth Guaranteed', desc: 'Every piece undergoes a rigorous 15-point inspection by master authenticators.' },
                   { icon: Sparkles, title: 'VIP Concierge', desc: 'Personalized 24/7 support via WhatsApp for our elite members.' },
                   { icon: Heart, title: 'Ethical Luxury', desc: 'Committed to sustainable sourcing and supporting heritage artisans.' }
                 ].map((pillar, i) => (
                   <div key={i} className="text-center space-y-6 p-8 bg-white border border-border hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/5 text-accent mb-2">
                         <pillar.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-3">
                         <h3 className="text-[11px] uppercase tracking-widest font-bold">{pillar.title}</h3>
                         <p className="text-xs font-light text-muted-foreground leading-relaxed">{pillar.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

      </main>

      <NafsheFooter />
    </div>
  );
}

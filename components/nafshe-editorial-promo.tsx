'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function NafsheEditorialPromo() {
  return (
    <section className="py-12 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: The "Sexy" Silhouette Campaign — Compact */}
          <div className="relative group">
            <div className="aspect-[16/10] relative overflow-hidden shadow-2xl">
              <Image
                src="/assets/hero.jpg"
                alt="Editorial Campaign"
                fill
                className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
            </div>
            {/* Floating Badge — Compact */}
            <div className="absolute -bottom-6 -right-6 bg-white p-8 hidden md:block animate-fade-in shadow-2xl">
               <div className="space-y-3">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-luxury leading-tight">Maison <br />Assurance</p>
               </div>
            </div>
          </div>

          {/* Right: The Message — Compact */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-accent">
                 <div className="w-10 h-px bg-accent" />
                 <p className="text-[9px] uppercase tracking-[0.5em] font-bold">Private Sourcing</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tighter leading-none">
                 The <span className="italic serif text-accent">Unseen</span> <br />
                 Collection
              </h2>
              <p className="max-w-md text-[11px] text-white/50 font-light italic leading-relaxed">
                 "Our most exclusive pieces never reach the public eye. They are curated in private vaults for our most loyal members."
              </p>
            </div>

            <div className="pt-4">
              <Link href="/contact" className="group inline-flex items-center gap-6">
                 <div className="px-10 py-4 bg-white text-primary text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all group-hover:bg-accent group-hover:text-white">
                    Request Invitation
                 </div>
                 <ArrowRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-3" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

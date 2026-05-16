'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function JournalPage() {
  const ARTICLES = [
    { id: 1, title: "The Art of Bespoke Sourcing", category: "Maison Secret", image: "/assets/interior.jpg", date: "May 12, 2024", excerpt: "Discover how our private concierges navigate the world's most elusive fashion houses to find your heart's desire." },
    { id: 2, title: "Emerald Evening: A Silk Story", category: "Lookbook", image: "/assets/dress.jpg", date: "May 10, 2024", excerpt: "The fluid movement of Valentino silk in the moonlight. Exploring the craftsmanship behind the season's most coveted gown." },
    { id: 3, title: "Macro Details: Dior's Gold Heritage", category: "Heritage", image: "/assets/jewelry.jpg", date: "May 08, 2024", excerpt: "An intimate look at the 18k gold finishing techniques that have defined the house of Dior for decades." },
    { id: 4, title: "The Parisian Chic Checklist", category: "Style", image: "/assets/sunglasses.jpg", date: "May 05, 2024", excerpt: "From oversized statement frames to the perfect monogram tote—the essentials for the modern woman in Paris." },
  ];

  return (
    <div className="bg-background min-h-screen">
      
      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* Editorial Header */}
        <div className="space-y-6 max-w-4xl animate-fade-in">
           <div className="flex items-center gap-3 text-accent">
              <BookOpen className="w-5 h-5" />
              <p className="text-[11px] uppercase tracking-[0.5em] font-bold">The Maison Journal</p>
           </div>
           <h1 className="text-6xl md:text-8xl font-light text-luxury tracking-tighter leading-[0.9]">
             Luxury <br /> <span className="italic serif ml-24 md:ml-48">Refined.</span>
           </h1>
           <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xl italic mt-12">
             "A curated collection of stories, lookbooks, and heritage deep-dives for the discerning Nafshe collector."
           </p>
        </div>

        {/* Featured Article — Cinematic Hero */}
        <div className="group relative aspect-[21/9] bg-muted overflow-hidden animate-fade-in-up">
           <Image src="/assets/hero.jpg" alt="Featured" fill className="object-cover transition-transform duration-[3s] group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
           <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                 <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Featured Story</p>
                 <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">The Evolution of the <span className="italic serif">Monogram</span></h2>
                 <p className="text-sm text-white/60 font-light max-w-lg">How Louis Vuitton transformed a simple pattern into the world's most recognizable symbol of travel and status.</p>
              </div>
              <button className="px-10 py-4 bg-white text-primary text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all">
                 Read Article
              </button>
           </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
           {ARTICLES.map((a, i) => (
             <div 
               key={a.id} 
               className="group space-y-8 animate-fade-in-up"
               style={{ animationDelay: `${i * 150}ms` }}
             >
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                   <Image src={a.image} alt={a.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                   <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-2 text-[8px] uppercase tracking-widest font-bold border border-border">
                         {a.category}
                      </span>
                   </div>
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                      <Clock className="w-3 h-3" />
                      <span>{a.date}</span>
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      <span>5 Min Read</span>
                   </div>
                   <h3 className="text-3xl font-light text-luxury leading-tight group-hover:text-accent transition-colors">{a.title}</h3>
                   <p className="text-sm text-muted-foreground font-light leading-relaxed">{a.excerpt}</p>
                   <Link href={`/journal/${a.id}`} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-luxury hover:text-accent transition-all group/link">
                      Read Full Story
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                   </Link>
                </div>
             </div>
           ))}
        </div>

      </main>

      <NafsheFooter />
    </div>
  );
}

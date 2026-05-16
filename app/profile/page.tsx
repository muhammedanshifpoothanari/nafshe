'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { User, Package, Heart, Settings, Crown, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const ACQUISITIONS = [
    { id: '1', name: 'Monogram Tote', date: 'May 12, 2024', status: 'In Transit', image: '/assets/bag.jpg' },
    { id: '2', name: 'Gold Jewelry Set', date: 'April 28, 2024', status: 'Delivered', image: '/assets/jewelry.jpg' },
  ];

  return (
    <div className="bg-background min-h-screen">
      
      <main className="max-w-7xl mx-auto px-6 py-24 space-y-24">
        
        {/* Profile Header — The Elite Identity */}
        <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in">
           <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-accent/20 p-1 bg-white">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                 <Image src="/assets/hero.jpg" alt="Profile" fill className="object-cover grayscale" />
              </div>
              <div className="absolute bottom-2 right-2 bg-accent p-2 rounded-full shadow-xl">
                 <Crown className="w-4 h-4 text-white" />
              </div>
           </div>
           
           <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                 <h1 className="text-4xl font-light text-luxury tracking-tight">Madame <span className="italic serif">Elena Rossi</span></h1>
                 <span className="px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-[9px] uppercase tracking-[0.3em] font-bold rounded-full w-fit mx-auto md:mx-0">
                    Elite Tier Collector
                 </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                 <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Dubai, UAE</span>
                 <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Identity Verified</span>
                 <span className="flex items-center gap-2 text-accent"><Crown className="w-3 h-3" /> 14,500 Maison Points</span>
              </div>
           </div>

           <div className="flex gap-4">
              <button className="p-3 border border-border hover:bg-muted transition-colors"><Settings className="w-5 h-5" /></button>
              <button className="px-8 py-3 bg-primary text-white text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl shadow-primary/20">
                 Edit Profile
              </button>
           </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Left: Private Acquisitions */}
           <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center justify-between border-b border-border pb-6">
                 <h2 className="text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-3">
                    <Package className="w-4 h-4 text-accent" />
                    Private Acquisitions
                 </h2>
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">View History</p>
              </div>

              <div className="space-y-6">
                 {ACQUISITIONS.map((item) => (
                   <div key={item.id} className="group bg-muted/20 border border-border p-6 flex items-center gap-8 hover:bg-white hover:shadow-2xl transition-all duration-700">
                      <div className="relative w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                         <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="flex-1 space-y-1">
                         <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">SKU-{item.id}0023</p>
                         <h3 className="text-lg font-light text-luxury">{item.name}</h3>
                         <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.date}</p>
                      </div>
                      <div className="text-right space-y-2">
                         <div className="px-4 py-1.5 bg-white border border-border text-[8px] uppercase tracking-widest font-bold rounded-full">
                            {item.status}
                         </div>
                         <button className="text-[9px] text-accent uppercase tracking-widest font-bold flex items-center justify-end gap-2 hover:underline">
                            Track <ExternalLink className="w-3 h-3" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Right: Curated Sanctuary (Lookbook/Wishlist) */}
           <div className="lg:col-span-4 space-y-12">
              <div className="flex items-center justify-between border-b border-border pb-6">
                 <h2 className="text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-3">
                    <Heart className="w-4 h-4 text-accent" />
                    Your Sanctuary
                 </h2>
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Share</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 {['/assets/dress.jpg', '/assets/jewelry.jpg', '/assets/sunglasses.jpg', '/assets/watch.jpg'].map((img, i) => (
                   <div key={i} className="relative aspect-[3/4] bg-muted group overflow-hidden">
                      <Image src={img} alt="lookbook" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
                   </div>
                 ))}
              </div>
              
              <button className="w-full py-5 border border-primary text-primary text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary hover:text-white transition-all">
                 Request Sourcing
              </button>
           </div>

        </div>

      </main>

      <NafsheFooter />
    </div>
  );
}

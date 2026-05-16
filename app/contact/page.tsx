'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { Mail, Phone, MapPin, Clock, MessageSquare, Crown } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      
      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* Editorial Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
           <div className="flex items-center justify-center gap-3 text-accent">
              <Crown className="w-5 h-5" />
              <p className="text-[11px] uppercase tracking-[0.5em] font-bold">The Concierge</p>
           </div>
           <h1 className="text-5xl md:text-7xl font-light text-luxury tracking-tight leading-tight">
             How May We <span className="italic serif">Assist You?</span>
           </h1>
           <p className="text-sm text-muted-foreground font-light leading-relaxed italic">
             "Our private specialists are available 24/7 to facilitate your acquisitions and provide bespoke styling advice."
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
           
           {/* Left: Private Outreach Form */}
           <div className="bg-white border border-border p-10 md:p-16 space-y-12 shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
              <div className="space-y-2">
                 <h2 className="text-2xl font-light text-luxury uppercase tracking-widest">Private <span className="italic serif">Inquiry</span></h2>
                 <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Expect a response within 2 business hours</p>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Full Name</label>
                       <input type="text" placeholder="Madame Rossi" className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent transition-all italic" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Private Email</label>
                       <input type="email" placeholder="elena@maison.com" className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent transition-all italic" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Subject of Inquiry</label>
                    <select className="w-full bg-transparent border-b border-border py-4 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-accent appearance-none">
                       <option>Bespoke Sourcing Request</option>
                       <option>Acquisition Tracking</option>
                       <option>Private Event Invitation</option>
                       <option>General Support</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Your Message</label>
                    <textarea placeholder="Describe your request in detail..." rows={4} className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent transition-all italic resize-none" />
                 </div>
                 <button className="w-full py-6 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20 hover:opacity-95 transition-all">
                    Send Private Message
                 </button>
              </form>
           </div>

           {/* Right: Global Hubs & Contact Info */}
           <div className="space-y-20 py-10">
              <div className="space-y-12">
                 <h2 className="text-xs uppercase tracking-[0.3em] font-bold border-b border-border pb-6">Global Contact Hubs</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-accent">
                          <MessageSquare className="w-4 h-4" />
                          <p className="text-[10px] uppercase tracking-widest font-bold">Live Concierge</p>
                       </div>
                       <p className="text-sm font-light text-luxury">Available 24/7 via WhatsApp for Elite Tier members.</p>
                       <button className="text-[9px] uppercase tracking-widest font-bold text-accent underline underline-offset-4">Connect Now</button>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-accent">
                          <Mail className="w-4 h-4" />
                          <p className="text-[10px] uppercase tracking-widest font-bold">Direct Email</p>
                       </div>
                       <p className="text-sm font-light text-luxury italic">safa@nafshe.com</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-12">
                 <h2 className="text-xs uppercase tracking-[0.3em] font-bold border-b border-border pb-6">The Houses</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light text-muted-foreground">
                    <div className="space-y-2">
                       <p className="text-luxury font-bold text-[10px] uppercase tracking-widest text-accent">Flagship HQ</p>
                       <p className="text-luxury font-bold text-sm">Jeddah Sanctuary</p>
                       <p>King Abdulaziz Road, Jeddah, Saudi Arabia</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-luxury font-bold text-[10px] uppercase tracking-widest">Paris Maison</p>
                       <p>Avenue Montaigne, 75008 Paris, France</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-luxury font-bold text-[10px] uppercase tracking-widest">Dubai Hub</p>
                       <p>Fashion Avenue, Dubai Mall, UAE</p>
                    </div>
                 </div>
              </div>

              <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                 <Image src="/assets/interior.jpg" alt="Sanctuary Interior" fill className="object-cover grayscale brightness-75" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white space-y-2">
                       <Clock className="w-8 h-8 mx-auto text-accent mb-4" />
                       <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Open Access</p>
                       <p className="text-2xl font-light italic serif">10:00 — 22:00 Daily</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>

      </main>

      <NafsheFooter />
    </div>
  );
}

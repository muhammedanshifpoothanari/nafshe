'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, MessageCircle, X, Star, Crown, Lock } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function NafsheConversionHooks() {
  const pathname = usePathname();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [activePurchase, setActivePurchase] = useState<null | { name: string, city: string, item: string }>(null);
  const [showVIPModal, setShowVIPModal] = useState(false);

  // Detect if we are on a product detail page to adjust WhatsApp position
  const isProductPage = pathname.startsWith('/products/');

  // Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Social Proof Pulse
  useEffect(() => {
    const purchases = [
      { name: "Elena", city: "Dubai", item: "Lady Dior Bag" },
      { name: "Sarah", city: "London", item: "Silk Evening Dress" },
      { name: "Yasmine", city: "Riyadh", item: "Gold Jewelry Set" },
      { name: "Chloe", city: "Paris", item: "Classic Prada Heels" }
    ];
    
    const interval = setInterval(() => {
      const p = purchases[Math.floor(Math.random() * purchases.length)];
      setActivePurchase(p);
      setTimeout(() => setActivePurchase(null), 4000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1. FLASH DROPS COUNTDOWN — Top Announcement */}
      <div 
        onClick={() => setShowVIPModal(true)}
        className="relative z-[50] bg-primary text-white py-2 px-4 text-center cursor-pointer hover:bg-primary/95 transition-colors border-b border-white/5"
      >
        <div className="flex items-center justify-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold">
           <span className="flex items-center gap-1.5">
             <Clock className="w-3.5 h-3.5 text-accent animate-pulse" />
             Private Drop Ends In:
           </span>
           <span className="bg-white/10 px-2.5 py-1 rounded-sm font-mono text-accent">
             {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
           </span>
           <span className="hidden sm:inline-flex items-center gap-2">
             <span className="opacity-40">|</span>
             <span className="text-accent underline underline-offset-4 decoration-accent/30">Get VIP Access Now</span>
           </span>
        </div>
      </div>

      {/* 2. RECENT PURCHASE POPUP — Social Proof */}
      <div className={`fixed bottom-6 left-6 z-[150] transition-all duration-1000 ${activePurchase ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
         <div className="bg-white/95 backdrop-blur-2xl border border-border p-4 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-4 max-w-[300px]">
            <div className="relative w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center overflow-hidden border border-accent/20">
               <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <div className="space-y-0.5">
               <p className="text-[11px] font-bold text-luxury">{activePurchase?.name} in {activePurchase?.city}</p>
               <p className="text-[10px] text-muted-foreground font-light italic leading-tight">Just reserved: {activePurchase?.item}</p>
               <div className="flex items-center gap-1 mt-1">
                  <Star className="w-2.5 h-2.5 fill-accent text-accent" />
                  <p className="text-[8px] text-accent uppercase tracking-widest font-bold">Collector Verified</p>
               </div>
            </div>
         </div>
      </div>

      {/* 3. WHATSAPP VIP CONCIERGE — Dynamic Positioning */}
      <div className={`fixed ${isProductPage ? 'bottom-24' : 'bottom-6'} right-6 z-[150] group transition-all duration-700`}>
         <div className="absolute bottom-full right-0 mb-6 w-56 bg-white p-5 shadow-[0_30px_60px_rgba(0,0,0,0.2)] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 pointer-events-none border border-border/50">
            <div className="flex items-center gap-2 mb-3">
               <Crown className="w-3.5 h-3.5 text-accent" />
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">VIP Concierge</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-light italic">
              "Personalized styling or bespoke sourcing? Chat with our private specialists instantly."
            </p>
         </div>
         <a 
           href="https://wa.me/919292898150" 
           target="_blank"
           className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group active:scale-95 border border-white/10"
         >
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="absolute top-0 right-0 w-4 h-4 bg-white border-2 border-primary rounded-full flex items-center justify-center">
               <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            </span>
         </a>
      </div>

      {/* 4. ELITE VIP ACCESS MODAL — The Sanctuary Portal */}
      {showVIPModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60 backdrop-blur-lg animate-fade-in">
           <div 
             className="absolute inset-0" 
             onClick={() => setShowVIPModal(false)}
           />
           <div className="relative w-full max-w-2xl bg-white border border-border shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
              
              {/* Left: Cinematic Branding */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-muted">
                 <Image src="/hero-luxury.jpg" alt="VIP" fill className="object-cover" />
                 <div className="absolute inset-0 bg-primary/20" />
                 <div className="absolute bottom-8 left-8 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Est. 2026</p>
                    <h2 className="text-3xl font-light text-white italic serif">The Sanctuary</h2>
                 </div>
              </div>

              {/* Right: Membership Form */}
              <div className="p-10 md:p-12 flex-1 space-y-8 bg-white">
                 <button 
                   onClick={() => setShowVIPModal(false)}
                   className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-luxury transition-colors"
                 >
                    <X className="w-5 h-5" />
                 </button>

                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-accent">
                       <Crown className="w-4 h-4" />
                       <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Elite Circle</p>
                    </div>
                    <h3 className="text-3xl font-light text-luxury">Private <span className="italic serif">Access</span></h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                       Enter your email to receive an exclusive invitation to our women-only luxury ecosystem. Early access to limited drops and 24/7 concierge.
                    </p>
                 </div>

                 <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowVIPModal(false); }}>
                    <div className="space-y-4">
                       <input 
                         type="email" 
                         placeholder="Private Email Address" 
                         className="w-full bg-transparent border-b border-border py-4 focus:border-accent outline-none text-sm font-light transition-all placeholder:text-muted-foreground italic"
                         required
                       />
                    </div>
                    <button className="w-full py-5 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-3">
                       Request Membership
                       <Lock className="w-3.5 h-3.5" />
                    </button>
                 </form>

                 <div className="pt-6 border-t border-border flex items-center gap-3 opacity-60">
                    <ShieldCheck className="w-4 h-4" />
                    <p className="text-[9px] uppercase tracking-widest font-bold">100% Women-Only Secure Space</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
}

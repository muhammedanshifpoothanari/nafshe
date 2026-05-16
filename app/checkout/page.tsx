'use client';

import { useState } from 'react';
import { NafsheFooter } from '@/components/nafshe-footer';
import { useCart } from '@/lib/context/cart-context';
import { ShieldCheck, Truck, CreditCard, Lock, ChevronRight, Crown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [step, setStep] = useState(1);

  return (
    <div className="bg-[#FBFBF9] min-h-screen">
      
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
           
           {/* Left: Checkout Flow */}
           <div className="lg:col-span-7 space-y-16">
              
              {/* Stepper */}
              <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-border pb-10">
                 <span className={step >= 1 ? 'text-accent' : 'text-muted-foreground'}>01 Delivery</span>
                 <ChevronRight className="w-3 h-3 text-border" />
                 <span className={step >= 2 ? 'text-accent' : 'text-muted-foreground'}>02 Payment</span>
                 <ChevronRight className="w-3 h-3 text-border" />
                 <span className={step >= 3 ? 'text-accent' : 'text-muted-foreground'}>03 Confirmation</span>
              </div>

              {step === 1 && (
                <div className="space-y-12 animate-fade-in">
                   <div className="space-y-2">
                      <h2 className="text-3xl font-light text-luxury uppercase tracking-tight">Delivery <span className="italic serif">Sanctuary</span></h2>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Where should your acquisitions be dispatched?</p>
                   </div>

                   <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">First Name</label>
                            <input required type="text" className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Last Name</label>
                            <input required type="text" className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Street Address</label>
                         <input required type="text" placeholder="King Abdulaziz Road, Jeddah" className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">City</label>
                            <input required type="text" defaultValue="Jeddah" className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Postal Code</label>
                            <input required type="text" className="w-full bg-transparent border-b border-border py-4 text-sm font-light outline-none focus:border-accent" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Country</label>
                            <div className="py-4 border-b border-border text-sm font-bold uppercase tracking-widest">Saudi Arabia</div>
                         </div>
                      </div>
                      <button type="submit" className="w-full py-6 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20 hover:opacity-95 transition-all">
                         Continue to Payment
                      </button>
                   </form>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-12 animate-fade-in">
                   <div className="space-y-2">
                      <h2 className="text-3xl font-light text-luxury uppercase tracking-tight">Secure <span className="italic serif">Settlement</span></h2>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Encrypted acquisition processing</p>
                   </div>

                   <div className="space-y-6">
                      <div className="p-8 border border-accent bg-accent/5 flex items-center justify-between">
                         <div className="flex items-center gap-6">
                            <CreditCard className="w-6 h-6 text-accent" />
                            <div>
                               <p className="text-sm font-bold uppercase tracking-widest">Apple Pay / Cards</p>
                               <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">One-click secure payment</p>
                            </div>
                         </div>
                         <div className="w-5 h-5 rounded-full border-4 border-accent" />
                      </div>
                      
                      <div className="p-8 border border-border flex items-center justify-between opacity-50 grayscale cursor-not-allowed">
                         <div className="flex items-center gap-6">
                            <ShieldCheck className="w-6 h-6 text-muted-foreground" />
                            <div>
                               <p className="text-sm font-bold uppercase tracking-widest">Maison Credit</p>
                               <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Available for Elite Members only</p>
                            </div>
                         </div>
                         <div className="w-5 h-5 rounded-full border-2 border-border" />
                      </div>
                   </div>

                   <button onClick={() => setStep(3)} className="w-full py-6 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20 hover:opacity-95 transition-all">
                      Finalize Acquisition
                   </button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-12 text-center py-20 animate-fade-in">
                   <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10">
                      <ShieldCheck className="w-12 h-12 text-green-600" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3 text-accent">
                         <Crown className="w-5 h-5" />
                         <p className="text-[11px] uppercase tracking-[0.5em] font-bold">Confederated</p>
                      </div>
                      <h1 className="text-5xl font-light text-luxury tracking-tighter">Reservation <span className="italic serif">Confirmed</span></h1>
                      <p className="text-sm text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
                         "Your acquisitions have been successfully reserved and are being prepared at our Jeddah HQ. A private concierge will contact you shortly."
                      </p>
                   </div>
                   <div className="pt-10">
                      <Link href="/profile" className="inline-block px-12 py-5 border border-primary text-primary text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary hover:text-white transition-all">
                         Track My Reservation
                      </Link>
                   </div>
                </div>
              )}

           </div>

           {/* Right: Summary Sidebar */}
           <div className="lg:col-span-5 space-y-10">
              <div className="bg-white border border-border p-10 space-y-10 sticky top-32">
                 <h2 className="text-xs uppercase tracking-[0.3em] font-bold border-b border-border pb-6">Your Selection</h2>
                 
                 <div className="space-y-8 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-6">
                         <div className="relative w-16 h-20 bg-muted overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                         </div>
                         <div className="flex-1 space-y-1">
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{item.brand}</p>
                            <h3 className="text-sm font-light text-luxury">{item.name}</h3>
                            <p className="text-[10px] font-bold">${item.price.toLocaleString()} x {item.quantity}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-4 border-t border-border pt-10">
                    <div className="flex justify-between text-sm">
                       <span className="font-light text-muted-foreground italic">Subtotal</span>
                       <span className="font-bold">${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="font-light text-muted-foreground italic">Logistics</span>
                       <span className="font-bold text-accent italic">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-sm pt-4 border-t border-border">
                       <span className="font-bold uppercase tracking-widest text-[10px]">Total Settlement</span>
                       <span className="text-2xl font-light text-luxury">${total.toLocaleString()}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 p-6 bg-[#FBFBF9] border border-border">
                    <Lock className="w-4 h-4 text-accent" />
                    <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground leading-relaxed">
                       Secure 256-bit encrypted acquisition channel.
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </main>

      <NafsheFooter />
    </div>
  );
}

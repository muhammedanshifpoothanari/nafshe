'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { useCart } from '@/lib/context/cart-context';
import { Minus, Plus, X, ArrowRight, ShieldCheck, Truck, Crown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="bg-background min-h-screen">
      
      <main className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        
        {/* Header */}
        <div className="flex items-end justify-between border-b border-border pb-12">
           <div className="space-y-4">
              <div className="flex items-center gap-3 text-accent">
                 <Crown className="w-4 h-4" />
                 <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Your Selection</p>
              </div>
              <h1 className="text-5xl font-light text-luxury tracking-tight">The <span className="italic serif">Cart</span></h1>
           </div>
           <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{items.length} Pieces Reserved</p>
        </div>

        {items.length === 0 ? (
          <div className="py-32 text-center space-y-8 animate-fade-in">
             <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
             </div>
             <div className="space-y-2">
                <h2 className="text-xl font-light text-luxury">Your selection is empty</h2>
                <p className="text-sm text-muted-foreground font-light italic">"A journey of a thousand styles begins with a single selection."</p>
             </div>
             <Link href="/products" className="inline-block px-12 py-5 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl">
                Explore The Collection
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
             
             {/* Items List */}
             <div className="lg:col-span-8 space-y-12">
                {items.map((item) => (
                  <div key={item.id} className="group flex flex-col md:flex-row gap-10 pb-12 border-b border-border last:border-0">
                     <div className="relative w-full md:w-48 aspect-[3/4] bg-muted overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                     </div>
                     
                     <div className="flex-1 space-y-6 flex flex-col justify-between">
                        <div className="space-y-2">
                           <div className="flex justify-between items-start">
                              <div>
                                 <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{item.brand}</p>
                                 <h3 className="text-2xl font-light text-luxury">{item.name}</h3>
                              </div>
                              <button onClick={() => removeItem(item.id)} className="p-2 text-muted-foreground hover:text-rose-500 transition-colors">
                                 <X className="w-5 h-5" />
                              </button>
                           </div>
                           <p className="text-sm font-bold text-foreground tracking-tight">${item.price.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between">
                           <div className="flex items-center border border-border">
                              <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="p-3 hover:bg-muted transition-colors border-r border-border"
                              >
                                 <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-6 text-sm font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-3 hover:bg-muted transition-colors border-l border-border"
                              >
                                 <Plus className="w-3.5 h-3.5" />
                              </button>
                           </div>
                           <p className="text-sm font-bold text-accent">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             {/* Order Summary */}
             <div className="lg:col-span-4 space-y-10">
                <div className="bg-muted/30 p-10 space-y-8 sticky top-32">
                   <h2 className="text-xs uppercase tracking-[0.3em] font-bold border-b border-border pb-6">Acquisition Summary</h2>
                   
                   <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                         <span className="font-light text-muted-foreground italic">Subtotal</span>
                         <span className="font-bold">${total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="font-light text-muted-foreground italic">Priority Maison Shipping</span>
                         <span className="font-bold text-accent">Complimentary</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-border pt-4">
                         <span className="font-bold uppercase tracking-widest text-[10px]">Total</span>
                         <span className="text-xl font-bold text-luxury">${total.toLocaleString()}</span>
                      </div>
                   </div>

                   <Link href="/checkout" className="w-full block py-6 bg-primary text-white text-center text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20 hover:opacity-95 transition-all">
                      Proceed to Checkout
                   </Link>

                   <div className="space-y-4 pt-6">
                      <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                         <ShieldCheck className="w-4 h-4 text-accent" />
                         <span>Secured by Nafshe Encryption</span>
                      </div>
                      <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                         <Truck className="w-4 h-4 text-accent" />
                         <span>Global Maison Delivery</span>
                      </div>
                   </div>
                </div>
             </div>

          </div>
        )}

      </main>

      <NafsheFooter />
    </div>
  );
}

function ShoppingBag(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

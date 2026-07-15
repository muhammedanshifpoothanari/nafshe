'use client';

import { useCart } from '@/lib/context/cart-context';
import { X, Minus, Plus, ShoppingBag, Truck, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const router = useRouter();
  
  const FREE_SHIPPING_THRESHOLD = 5000;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-background shadow-2xl flex flex-col animate-slide-left">
        
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Your Bag ({items.length})</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Hook — Dr. Squatch style */}
        <div className="px-6 py-4 bg-muted/30 space-y-3">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <Truck className={`w-4 h-4 ${progress === 100 ? 'text-primary' : 'text-muted-foreground'}`} />
              <span>{progress === 100 ? 'You qualified for free shipping!' : `Spend SAR ${remaining.toLocaleString()} more for free shipping`}</span>
            </div>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <p className="text-muted-foreground font-light italic">Your bag is currently empty.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 group">
                    <div className="relative w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="pr-4">
                          <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{item.brand}</p>
                          <h3 className="text-xs font-medium truncate max-w-[180px]">{item.name}</h3>
                        </div>
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-border">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-[10px] font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-xs font-bold">SAR {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hook: Upsell / Add-ons — Multi-Vendor Recommendation Engine */}
              <div className="pt-8 border-t border-border space-y-6">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest font-bold">Complete the Maison Look</p>
                    <p className="text-[8px] uppercase tracking-widest text-accent animate-pulse font-bold">Recommended for You</p>
                 </div>
                 <div className="space-y-4">
                    {[
                      { name: 'Statement Sunglasses', brand: 'Chanel', price: 950, image: '/products/designer-sunglasses.jpg' },
                      { name: 'Silk Evening Dress', brand: 'Valentino', price: 3400, image: '/products/silk-dress.jpg' },
                      { name: 'Luxury Timepiece', brand: 'Hermès', price: 8900, image: '/products/designer-watch.jpg' },
                    ].map((p, i) => (
                      <div key={i} className="bg-muted/30 p-3 flex gap-3 items-center group">
                        <div className="relative w-12 h-16 bg-muted overflow-hidden flex-shrink-0">
                           <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                           <p className="text-[8px] font-bold text-muted-foreground uppercase">{p.brand}</p>
                           <p className="text-[10px] font-medium leading-tight">{p.name}</p>
                           <p className="text-[10px] font-bold mt-0.5">SAR {p.price.toLocaleString()}</p>
                        </div>
                        <button className="px-4 py-2 border border-primary text-primary text-[8px] uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                           Add
                        </button>
                      </div>
                    ))}
                 </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span>SAR {total.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-muted-foreground italic text-center">Taxes and shipping calculated at checkout.</p>
            <button 
              onClick={() => {
                setIsOpen(false);
                router.push('/checkout');
              }}
              className="w-full py-4 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-primary/20"
            >
              Checkout Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

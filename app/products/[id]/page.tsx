'use client';

import { useState, useEffect, use } from 'react';
import { NafsheFooter } from '@/components/nafshe-footer';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronLeft, Star, Truck, ShieldCheck, RefreshCw, Eye, Flame, Plus, Minus, Share2 } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';

const PRODUCTS: Record<string, any> = {
  '1': { id: '1', name: 'Monogram Tote', brand: 'Louis Vuitton', price: 4500, image: '/assets/bag.jpg', category: 'bags', rating: 4.9, reviews: 156, description: 'Iconic Louis Vuitton monogram canvas with natural cowhide leather trim. A spacious and versatile companion for everyday elegance. Crafted from the finest materials, this piece represents the pinnacle of luxury craftsmanship.', stock: 3, views: 24 },
  '2': { id: '2', name: 'Silk Evening Dress', brand: 'Valentino', price: 3400, image: '/assets/dress.jpg', category: 'dresses', rating: 4.8, reviews: 178, description: 'Exquisite silk evening dress featuring a delicate silhouette and intricate detailing. Perfect for red-carpet moments and gala events. The fluid drape of the silk creates a movement that is as captivating as it is elegant.', stock: 5, views: 18 },
  '3': { id: '3', name: 'Gold Jewelry Set', brand: 'Dior', price: 5200, image: '/assets/jewelry.jpg', category: 'jewelry', rating: 4.9, reviews: 145, description: 'Timeless 18k gold jewelry set including a necklace and matching earrings. A testament to Dior\'s heritage of fine craftsmanship. Each piece is hand-finished to ensure a radiance that lasts a lifetime.', stock: 2, views: 42 },
  '4': { id: '4', name: 'Statement Sunglasses', brand: 'Chanel', price: 950, image: '/assets/sunglasses.jpg', category: 'sunglasses', rating: 4.7, reviews: 234, description: 'Classic oversized sunglasses with signature Chanel detailing. UV protection with a touch of Parisian glamour. These frames are designed to make a statement while providing unparalleled comfort.', stock: 8, views: 12 },
  '5': { id: '5', name: 'Classic Heels', brand: 'Prada', price: 2100, image: '/assets/bag.jpg', category: 'shoes', rating: 4.8, reviews: 92, description: 'Elegant pointed-toe heels crafted from premium patent leather. A staple for every sophisticated wardrobe. The perfect balance of height and comfort for the modern woman on the move.', stock: 4, views: 15 },
  '6': { id: '6', name: 'Luxury Timepiece', brand: 'Hermès', price: 8900, image: '/assets/watch.jpg', category: 'watches', rating: 5.0, reviews: 89, description: 'Exquisite automatic watch featuring a sapphire crystal and premium leather strap. Precision meets unparalleled style. An investment piece that will be passed down through generations.', stock: 1, views: 56 },
};

const RELATED_PRODUCTS = [
  { id: '4', name: 'Statement Sunglasses', brand: 'Chanel', price: 950, image: '/assets/sunglasses.jpg' },
  { id: '2', name: 'Silk Evening Dress', brand: 'Valentino', price: 3400, image: '/assets/dress.jpg' },
  { id: '5', name: 'Classic Heels', brand: 'Prada', price: 2100, image: '/assets/bag.jpg' },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS[id] || PRODUCTS['1'];
  // Added multi-image gallery mock for demo
  const gallery = [product.image, '/products/silk-dress.jpg', '/products/gold-jewelry.jpg', '/products/designer-watch.jpg'];
  
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
      });
    }
  };

  return (
    <div className="bg-background min-h-screen">

      <main className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up">
        
        {/* Navigation / Breadcrumbs */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/products" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-3 h-3" />
            Back to Collection
          </Link>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
              <Share2 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsFavorite(!isFavorite)} className={`p-2 hover:bg-muted rounded-full transition-colors ${isFavorite ? 'text-rose-500' : 'text-muted-foreground hover:text-foreground'}`}>
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Cinematic Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[3/4] bg-muted overflow-hidden group">
              <Image
                src={gallery[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-[1.5s] group-hover:scale-110"
              />
              {/* Luxury Scarcity Overlay */}
              {product.stock <= 3 && (
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 border-l-4 border-primary shadow-2xl">
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Limited Availability</p>
                   <p className="text-xs font-light text-foreground mt-1 italic">Only {product.stock} pieces remaining in the global warehouse</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square bg-muted cursor-pointer overflow-hidden group border-2 transition-all duration-500 ${activeImage === i ? 'border-accent' : 'border-transparent'}`}
                >
                  <Image src={img} alt={`thumbnail-${i}`} fill className={`object-cover transition-all duration-700 group-hover:scale-110 ${activeImage === i ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Editorial Purchase Flow — Sticky for High Conversion */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32 h-fit">
            
            {/* Header Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">{product.brand}</p>
                <h1 className="text-4xl sm:text-5xl font-light text-luxury leading-tight">{product.name}</h1>
              </div>

              <div className="flex items-center justify-between pb-8 border-b border-border">
                <p className="text-3xl font-light">${product.price.toLocaleString()}</p>
                <div className="flex items-center gap-3">
                   <div className="flex text-amber-400">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                   </div>
                   <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">({product.reviews} Reviews)</span>
                </div>
              </div>
            </div>

            {/* Hook: Real-time Social Proof */}
            <div className="flex items-center gap-4 px-6 py-4 bg-muted/20 border border-border rounded-sm">
               <div className="relative">
                 <Eye className="w-5 h-5 text-accent" />
                 <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent border-2 border-white rounded-full animate-ping" />
               </div>
               <p className="text-[11px] font-light leading-snug">
                 <span className="font-bold">{product.views} Luxury Collectors</span> are currently viewing this piece. <br /> 
                 <span className="text-accent font-medium">Estimated 2 sales in the last 6 hours.</span>
               </p>
            </div>

            {/* Hook: Delivery Urgency */}
            <div className="p-6 bg-primary/5 border border-primary/10 space-y-3 relative overflow-hidden">
               <div className="flex items-center gap-3 text-primary">
                  <Flame className="w-4 h-4" />
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Exclusive Fast-Track Delivery</p>
               </div>
               <p className="text-xs font-light text-foreground/80 leading-relaxed">
                 Order within <span className="font-bold font-mono">{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span> to receive your item by <span className="text-primary font-bold">Tomorrow</span>.
               </p>
            </div>

            {/* Product Story */}
            <div className="space-y-4">
               <h3 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">The Story</h3>
               <p className="text-sm font-light leading-relaxed text-foreground/70 italic">
                 "{product.description}"
               </p>
            </div>

            {/* Purchase Controls */}
            <div className="space-y-6 pt-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-8">
                 <p className="text-[10px] uppercase tracking-widest font-bold">Quantity</p>
                 <div className="flex items-center border border-border bg-muted/10">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="w-10 text-center text-xs font-bold font-mono">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted transition-colors"><Plus className="w-3 h-3" /></button>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <button 
                   onClick={handleAddToCart}
                   className="w-full py-6 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
                 >
                   Reserve to Bag
                 </button>
                 <button className="w-full py-6 border border-primary text-primary text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3">
                   Buy with Apple Pay
                 </button>
              </div>
            </div>

            {/* Brand Commitments */}
            <div className="grid grid-cols-3 gap-6 py-10 border-t border-border">
               {[
                 { icon: Truck, label: 'Global Courier' },
                 { icon: ShieldCheck, label: 'Secured SSL' },
                 { icon: RefreshCw, label: 'VIP Returns' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center gap-3">
                    <item.icon className="w-5 h-5 text-accent/60" />
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{item.label}</p>
                 </div>
               ))}
            </div>

          </div>
        </div>

        {/* Cinematic Recommendation Section */}
        <section className="mt-40 space-y-16">
          <div className="text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Curated For You</p>
            <h2 className="text-3xl font-light text-luxury">Complete the Maison <span className="italic">Look</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RELATED_PRODUCTS.map((p) => (
              <div key={p.id} className="group cursor-pointer space-y-4">
                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">{p.brand}</p>
                  <h3 className="text-xs font-light">{p.name}</h3>
                  <p className="text-xs font-bold text-accent">${p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Fixed Mobile Purchase Bar — Pinned for Instant Conversion */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-border p-4 animate-slide-up">
         <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
               <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{product.brand}</p>
               <p className="text-sm font-bold">${product.price.toLocaleString()}</p>
            </div>
            <button 
              onClick={handleAddToCart}
              className="px-8 py-4 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all"
            >
              Reserve
            </button>
         </div>
      </div>

      <NafsheFooter />
    </div>
  );
}

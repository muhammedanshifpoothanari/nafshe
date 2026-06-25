'use client';

import { useState, useMemo, useEffect } from 'react';
import { NafsheFooter } from '@/components/nafshe-footer';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, SlidersHorizontal, X, Plus, Star } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';

// PRODUCTS static array is removed. Loaded dynamically via API below.

const CATEGORIES = ['All', 'bags', 'dresses', 'shoes', 'jewelry', 'sunglasses', 'watches', 'tops'];
const BRANDS = ['All', 'Louis Vuitton', 'Valentino', 'Dior', 'Chanel', 'Prada', 'Hermès', 'Gucci', 'Balenciaga'];
const SORTS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function ProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Filter to display global luxury products
        const luxuryCats = ['bags', 'dresses', 'shoes', 'jewelry', 'sunglasses', 'watches', 'tops'];
        const luxuryOnly = data.filter((p: any) => luxuryCats.includes(p.category));
        setProducts(luxuryOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (selectedBrand !== 'All') result = result.filter(p => p.brand === selectedBrand);
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedCategory, selectedBrand, sortBy]);

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="bg-background min-h-screen">

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-in-up">
           <div className="space-y-4">
              <div className="flex items-center gap-4 text-accent">
                 <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Collections</p>
                 <div className="h-px w-8 bg-accent/30" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-luxury tracking-wide">The Full <span className="italic font-serif">Selection</span></h1>
           </div>
           <div className="flex items-center gap-6">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{filtered.length} Pieces Found</p>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-3 px-6 py-3 border border-border text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-muted transition-all active:scale-95"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Refine
              </button>
           </div>
        </div>

        {/* Filter Drawer - Premium Overlay */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showFilters ? 'max-h-[500px] opacity-100 mb-16' : 'max-h-0 opacity-0'}`}>
           <div className="p-10 bg-muted/20 border border-border grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <button 
                onClick={() => setShowFilters(false)}
                className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="space-y-6">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-accent">By Category</p>
                 <div className="flex flex-wrap gap-2">
                   {CATEGORIES.map(cat => (
                     <button
                       key={cat}
                       onClick={() => setSelectedCategory(cat)}
                       className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all ${selectedCategory === cat ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-foreground'}`}
                     >
                       {cat}
                     </button>
                   ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-accent">By House</p>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                   {BRANDS.map(b => (
                     <button
                       key={b}
                       onClick={() => setSelectedBrand(b)}
                       className={`text-left text-xs transition-colors py-1 ${selectedBrand === b ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                     >
                       {b}
                     </button>
                   ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-accent">Sort Order</p>
                 <div className="space-y-3">
                   {SORTS.map(s => (
                     <button
                       key={s.value}
                       onClick={() => setSortBy(s.value)}
                       className={`block text-xs transition-colors ${sortBy === s.value ? 'text-foreground font-bold underline underline-offset-4' : 'text-muted-foreground hover:text-foreground'}`}
                     >
                       {s.label}
                     </button>
                   ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="bg-muted aspect-[3/4] w-full" />
                <div className="h-4 bg-muted w-3/4 rounded" />
                <div className="h-4 bg-muted w-1/4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16">
            {filtered.map((product, index) => {
              const productImage = product.images?.[0] || product.image || '/placeholder.jpg';
              return (
                <div 
                  key={product.id} 
                  className="group flex flex-col animate-fade-in-up" 
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted mb-5">
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-700" />
                    </Link>

                    {product.tag && (
                      <span className="absolute top-4 left-4 px-3 py-1 text-[8px] uppercase tracking-widest font-bold bg-white/90 backdrop-blur-md text-black shadow-sm">
                        {product.tag}
                      </span>
                    )}

                    <button
                      onClick={() => toggleFav(product.id)}
                      className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full transition-all hover:bg-white active:scale-90"
                    >
                      <Heart className={`w-4 h-4 transition-all ${favorites.has(product.id) ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-400'}`} />
                    </button>

                    {/* Quick Add Button */}
                    <button 
                      onClick={() => addItem({ id: product.id, productId: product.id, name: product.name, price: product.price, image: productImage, brand: product.brand })}
                      className="absolute inset-x-0 bottom-0 py-4 bg-primary text-primary-foreground text-[9px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    >
                      <Plus className="w-3 h-3" />
                      Quick Add
                    </button>
                  </div>

                  <div className="space-y-2 px-1">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
                        {product.brand}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span className="text-[9px] font-bold">{product.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-light text-foreground tracking-wide leading-relaxed truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-foreground">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      <NafsheFooter />
    </div>
  );
}

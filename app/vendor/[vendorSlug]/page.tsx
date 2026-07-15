'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Loader2, Star, Sparkles } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/utils';

export default function VendorStorefront({ params }: { params: Promise<{ vendorSlug: string }> }) {
  const { vendorSlug } = use(params);
  const [vendor, setVendor] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [vendorSlug]);

  const fetchData = async () => {
    try {
      // 1. Fetch vendor details
      const vendorRes = await fetch(`/api/vendors/${vendorSlug}`);
      if (vendorRes.ok) {
        const vendorData = await vendorRes.json();
        setVendor(vendorData);

        // 2. Fetch only this vendor's products
        const productsRes = await fetch(`/api/products?vendorId=${vendorSlug}`);
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.filter((p: any) => p.status === 'approved'));
        }
      }
    } catch (error) {
      console.error('Error fetching storefront data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-xs">
        <Loader2 className="w-6 h-6 animate-spin mr-3 text-white" /> Loading Storefront Nodes...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Tenant not found</p>
        <Link href="/" className="px-6 py-3 border border-white/10 text-[9px] uppercase tracking-widest hover:border-white transition-all">
          Back to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Hero Header */}
      <div className="relative h-96 overflow-hidden border-b border-white/10 flex items-center justify-center">
        {/* Blurred background image fallback */}
        <div className="absolute inset-0 bg-neutral-900 filter blur-sm opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-all">
            <ArrowLeft className="w-3 h-3" /> Back to Market Hub
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mt-4">
            {vendor.name}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">{vendor.category || 'Luxury Collection'}</p>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xs font-black uppercase tracking-[0.4em]">Curated Manifest</h2>
          <span className="text-[9px] uppercase tracking-widest text-white/40">{products.length} Node Listings</span>
        </div>

        {products.length === 0 ? (
          <p className="text-xs font-mono text-white/40 text-center py-20 border border-dashed border-white/10">
            No active listings found for this vendor.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {products.map((product) => (
              <div key={product.id} className="bg-black p-6 space-y-6 group hover:bg-white/5 transition-all">
                <div className="aspect-square bg-neutral-900 border border-white/5 relative overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img 
                      src={getOptimizedImageUrl(product.images[0], 600)} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] uppercase text-white/20">No Visual Data</div>
                  )}
                  {product.fulfillmentType === 'FBA' && (
                    <span className="absolute top-3 right-3 text-[7px] font-black uppercase tracking-widest bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2 py-0.5">
                      FBA Express
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xs font-bold truncate text-white">{product.name}</h3>
                    <span className="text-[10px] font-mono text-white font-bold whitespace-nowrap">SAR {product.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] uppercase tracking-widest text-white/40">
                    <span>{product.brand}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-current text-accent" /> {product.rating || '5.0'}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Added ${product.name} to cart!`)}
                  className="w-full py-3 bg-white text-black text-[8px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Acquire Asset
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

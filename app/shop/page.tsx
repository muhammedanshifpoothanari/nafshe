'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCart } from '@/lib/context/cart-context';
import { NafsheFooter } from '@/components/nafshe-footer';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Star } from 'lucide-react';

const CATEGORIES = ['All', 'Abayas', 'Formal', 'Casual', 'Accessories', 'Limited'];
const BRANDS = ['All', 'Reverie', 'Luxe', 'Nafshe'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: '$0 - $500', min: 0, max: 500 },
  { label: '$500 - $1500', min: 500, max: 1500 },
  { label: '$1500 - $3000', min: 1500, max: 3000 },
  { label: '$3000+', min: 3000, max: Infinity },
];

export default function ShopPage() {
  const { count } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [sortBy, setSortBy] = useState('newest');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const priceRange = PRICE_RANGES.find(r => r.label === selectedPrice) || PRICE_RANGES[0];

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (sortBy) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'name':
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return result;
    }
  }, [products, selectedCategory, selectedBrand, selectedPrice, sortBy]);

  return (
    <div className="bg-background min-h-screen text-foreground">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="py-12 border-b border-border">
          <h1 className="text-4xl font-semibold mb-2">Shop</h1>
          <p className="text-muted-foreground">Discover our premium collection of fashion and accessories</p>
        </div>

        <div className="flex gap-8 py-12">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-4">Category</h3>
                <div className="space-y-3">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left text-sm py-1 transition ${
                        selectedCategory === cat
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-4">Brand</h3>
                <div className="space-y-3">
                  {BRANDS.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`block w-full text-left text-sm py-1 transition ${
                        selectedBrand === brand
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-4">Price</h3>
                <div className="space-y-3">
                  {PRICE_RANGES.map(range => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPrice(range.label)}
                      className={`block w-full text-left text-sm py-1 transition ${
                        selectedPrice === range.label
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setSelectedPrice('All Prices');
                }}
                className="w-full py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              <div className="w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="luxury-input text-sm w-full sm:w-48"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="bg-muted h-80 sm:h-96 rounded-lg" />
                    <div className="h-4 bg-muted w-3/4 rounded" />
                    <div className="h-4 bg-muted w-1/4 rounded" />
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {filtered.map(product => (
                  <Link key={product.id} href={`/product/${product.id}`} className="group">
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-lg bg-muted h-80 sm:h-96">
                        <Image
                          src={(product.images?.[0] && (product.images[0].startsWith('/') || product.images[0].startsWith('http://') || product.images[0].startsWith('https://'))) ? product.images[0] : '/assets/bag.jpg'}
                          alt={product.name}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-primary">
                            ${product.price.toLocaleString()}
                          </p>
                          {product.rating && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star size={14} className="fill-accent text-accent" />
                              <span className="text-muted-foreground">{product.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products match your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                    setSelectedPrice('All Prices');
                  }}
                  className="mt-4 text-primary hover:text-primary/80 transition text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <NafsheFooter />
    </div>
  );
}

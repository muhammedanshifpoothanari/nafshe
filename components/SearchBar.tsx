'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Zap } from 'lucide-react';
import { products } from '@/lib/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';

export function SearchBar() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={t('nav.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-muted/50 rounded-lg text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50">
          {results.length > 0 ? (
            <>
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => handleClear()}
                    className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-accent font-semibold truncate">{product.brand}</p>
                      <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">${product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/products?q=${encodeURIComponent(searchQuery)}`}
                onClick={() => handleClear()}
                className="block px-4 py-3 text-center text-sm font-medium text-accent border-t border-border hover:bg-muted transition-colors"
              >
                View All Results
              </Link>
            </>
          ) : (
            <div className="p-8 text-center">
              <Zap className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

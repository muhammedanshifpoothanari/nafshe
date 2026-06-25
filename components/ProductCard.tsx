'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useRecentlyViewed } from '@/lib/hooks/useRecentlyViewed';
import { ProductBadges, SocialProof } from './ProductBadges';
import { useTranslation } from '@/lib/i18n';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  isLimited?: boolean;
  isSale?: boolean;
}

export function ProductCard({ product, isNew, isLimited, isSale }: ProductCardProps) {
  const { addItem } = useCart();
  const { addProduct } = useRecentlyViewed();
  const { t } = useTranslation();
  const [added, setAdded] = useState(false);

  const stock = Math.random() * 10 > 5 ? Math.floor(Math.random() * 10) : 50;
  const viewCount = Math.floor(Math.random() * 50);
  const buyCount = Math.floor(Math.random() * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, product.price, product.name);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleViewProduct = () => {
    addProduct(product.id);
  };

  return (
    <Link href={`/product/${product.id}`} onClick={handleViewProduct}>
      <div className="luxury-card p-0 overflow-hidden group h-full flex flex-col transition-all hover:shadow-xl">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-72 md:h-80">
          <Image
            src={(product.images?.[0] && (product.images[0].startsWith('/') || product.images[0].startsWith('http://') || product.images[0].startsWith('https://'))) ? product.images[0] : '/assets/bag.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10">
            <ProductBadges
              isNew={isNew}
              isLimited={isLimited}
              isSale={isSale}
              rating={product.rating}
              stock={stock}
              maxStock={50}
              viewCount={viewCount}
              buyCount={buyCount}
            />
          </div>

          {/* Quick View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
            <div className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg font-semibold hover:bg-accent/90">
              <Eye className="w-4 h-4" />
              {t('products.viewDetails')}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Brand */}
          <p className="text-xs font-semibold text-accent mb-1">{product.brand}</p>

          {/* Name */}
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-accent text-accent'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews || 0})</span>
            </div>
          )}

          {/* Social Proof - Compact */}
          {(viewCount > 0 || buyCount > 0) && (
            <div className="mb-3">
              <SocialProof viewCount={viewCount} buyCount={buyCount} compact />
            </div>
          )}

          {/* Price and Button */}
          <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-border">
            <p className="text-lg font-bold text-accent">${product.price.toLocaleString()}</p>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

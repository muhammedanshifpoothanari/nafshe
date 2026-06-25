'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/cart-context';
import { NafsheFooter } from '@/components/nafshe-footer';
import { ProductBadges, SocialProof } from '@/components/ProductBadges';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart, Star, Check, Share2, Truck, RotateCcw, Shield } from 'lucide-react';

import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    // Pass ID directly to API (DB IDs are in format prod-xxx-1234)
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setProduct(data);
          setSelectedColor(data.colors?.[0]);
          setSelectedSize(data.sizes?.[0]);
          
          // Fetch related
          fetch(`/api/products?category=${data.category}`)
            .then(res => res.json())
            .then(allProducts => {
              const filtered = allProducts.filter((p: any) => p.id !== data.id).slice(0, 4);
              setRelatedProducts(filtered);
            })
            .catch(err => console.error(err));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold animate-pulse">
          Retrieving Curated Masterpiece...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold">{t('products.notFound')}</h1>
            <Link href="/products" className="inline-block text-primary hover:text-primary/80 transition">
              {t('products.backToShop')}
            </Link>
          </div>
        </div>
        <NafsheFooter />
      </div>
    );
  }

  const stock = Math.random() * 10 > 5 ? Math.floor(Math.random() * 10) : 50;
  const viewCount = Math.floor(Math.random() * 100);
  const buyCount = Math.floor(Math.random() * 200);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      color: selectedColor,
      size: selectedSize,
      image: product.images?.[0] || product.image || '/placeholder.jpg',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };


  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col">

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-accent transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-accent transition">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-4">
            {(() => {
              const gallery = Array.isArray(product.images) && product.images.length > 0
                ? product.images
                : [
                    product.images?.[0] || product.image || '/assets/bag.jpg',
                    '/assets/jewelry.jpg',
                    '/assets/dress.jpg',
                    '/assets/bag.jpg'
                  ];
              return (
                <>
                  <div className="luxury-card relative p-0 overflow-hidden bg-muted h-96 md:h-[500px] flex items-center justify-center">
                    <Image
                      src={(gallery[selectedImageIndex] && (gallery[selectedImageIndex].startsWith('/') || gallery[selectedImageIndex].startsWith('http://') || gallery[selectedImageIndex].startsWith('https://'))) ? gallery[selectedImageIndex] : '/assets/bag.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  {gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`luxury-card relative p-0 overflow-hidden h-24 cursor-pointer transition-all ${
                            selectedImageIndex === idx ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={(img && (img.startsWith('/') || img.startsWith('http://') || img.startsWith('https://'))) ? img : '/assets/bag.jpg'}
                            alt={`${product.name} ${idx + 1}`}
                            fill
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Brand & Badges */}
            <div>
              <p className="text-sm font-semibold text-accent mb-3">{product.brand}</p>
              <div className="mb-4">
                <ProductBadges
                  rating={product.rating}
                  stock={stock}
                  maxStock={50}
                  isNew={true}
                  isSale={product.price < 1000}
                />
              </div>
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-luxury">{product.name}</h1>
              {product.rating && (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating!)
                            ? 'fill-accent text-accent'
                            : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-accent">${product.price.toLocaleString()}</p>
            </div>

            {product.description && (
              <p className="text-foreground leading-relaxed text-base">{product.description}</p>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Color</label>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border transition text-sm font-medium ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Size</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition text-sm font-medium ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3 pt-6 border-t border-border">
              <label className="block text-sm font-semibold">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 bg-transparent outline-none"
                    min="1"
                    max="10"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-4 py-2 hover:bg-muted transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    liked
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-500'
                      : 'border-border hover:border-red-400'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-6 h-6" fill={liked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} /> Added to Cart
                  </span>
                ) : (
                  `${t('products.addToCart')} - $${(product.price * quantity).toLocaleString()}`
                )}
              </button>
              <button className="w-full px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Product
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-muted-foreground text-xs">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-muted-foreground text-xs">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-muted-foreground text-xs">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-border pt-16 lg:pt-20">
            <h2 className="text-3xl font-semibold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <Link key={prod.id} href={`/product/${prod.id}`} className="group">
                  <div className="relative overflow-hidden rounded-lg bg-muted h-64 sm:h-72 mb-4">
                    <Image
                      src={(prod.images?.[0] && (prod.images[0].startsWith('/') || prod.images[0].startsWith('http://') || prod.images[0].startsWith('https://'))) ? prod.images[0] : '/assets/bag.jpg'}
                      alt={prod.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition line-clamp-2 mb-1">
                    {prod.name}
                  </h3>
                  <p className="text-lg font-semibold text-primary">${prod.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <NafsheFooter />
    </div>
  );
}

'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { ProductCard } from '@/components/ProductCard';
import { getBrandById } from '@/lib/data/brands';
import { getProductsByBrand } from '@/lib/data/products';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function BrandDetailPageContent() {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const brandId = params.brandId as string;

  const brand = getBrandById(brandId);
  const brandProducts = brand ? getProductsByBrand(brand.name) : [];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded || !brand) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-light mb-4">Brand Not Found</h1>
            <Link href="/brands" className="text-accent hover:text-accent/80">
              Back to Brands
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Navigation */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/brands" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Brands
            </Link>
          </div>
        </div>

        {/* Brand Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-6xl mb-6">{brand.logo}</div>
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-4">
              {brand.name}
            </h1>
            <p className="text-xl font-light text-accent mb-8">
              {brand.tagline}
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg font-light text-foreground/80 leading-relaxed">
                {brand.story}
              </p>
            </div>
          </div>
        </section>

        {/* Brand Products */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">
                Featured Collection
              </h2>
            </div>

            {brandProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {brandProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground font-light">
                  No products available for this brand yet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Brand Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-light text-center mb-12">
              About {brand.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-light">Heritage</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {brand.name} brings decades of expertise and tradition. Each piece is crafted with attention to detail and respect for heritage.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-light">Craftsmanship</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Artisan techniques combined with quality materials create timeless pieces designed to be cherished for generations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function BrandDetailPage({ params }: { params: Promise<{ brandId: string }> }) {
  return (
    <Suspense>
      <BrandDetailPageContent />
    </Suspense>
  );
}

'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook, Smartphone, ShieldCheck } from 'lucide-react';

export function NafsheFooter() {
  return (
    <footer className="bg-foreground text-background border-t border-accent/20">
      {/* Top Section with decorative line */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Newsletter CTA - Premium styling */}
        <div className="mb-20 pb-16 border-b border-background/20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-accent text-2xl">✦</span>
              <span className="text-xs tracking-[0.15em] text-accent/60 uppercase font-medium">Stay Updated</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
              Join <span className="italic serif text-accent">Our VIP Circle</span>
            </h3>
            <p className="text-lg text-background/80 font-light mb-8">
              Be the first to access new collections, exclusive previews, and VIP-only events.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-lg bg-background/10 text-white placeholder:text-background/60 text-sm border border-background/20 focus:outline-none focus:border-accent focus:bg-background/20 transition-all backdrop-blur-sm"
              />
              <button className="px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold uppercase tracking-wide text-sm hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-background/60 mt-3 font-light">
              You&apos;ll receive early access and 15% off your first order.
            </p>
          </div>
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl font-light text-accent">Λ</span>
              <div>
                <span className="text-xl font-light tracking-[0.2em] text-white block leading-none">NAFSHE</span>
                <span className="text-[10px] tracking-[0.1em] text-accent/50 uppercase font-medium">Luxury Collective</span>
              </div>
            </div>
            <p className="text-sm text-background/80 font-light leading-relaxed mb-4">
              Where elegance meets exclusivity. Premium luxury for the discerning woman.
            </p>
            <p className="text-xs tracking-[0.1em] text-accent/60 uppercase font-semibold">
              Natural · Authentic · Timeless
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] font-semibold text-white mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Products', href: '/products' },
                { label: 'Brands', href: '/brands' },
                { label: 'Collections', href: '/products' },
                { label: 'Cart', href: '/cart' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-background/70 hover:text-white transition-colors font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping', href: '/shipping' },
                { label: 'Returns', href: '/shipping' },
                { label: 'Size Guide', href: '/size-guide' },
                { label: 'FAQ', href: '/faq' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-background/70 hover:text-white transition-colors font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Customers', href: '/all-customers' },
                { label: 'Contact', href: '/contact' },
                { label: 'Checkout', href: '/checkout' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-background/70 hover:text-accent transition-all text-xs font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-accent hover:text-white transition-all text-xs font-bold flex items-center gap-2">
                  Bespoke Sourcing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] font-semibold text-white mb-6">Connect</h4>
            <div className="flex gap-4 mb-8">
              <Link href="https://instagram.com/nafshe_official" target="_blank" className="text-background/60 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-3 text-sm font-light">
              <p className="text-background/80">safa@nafshe.com</p>
              <p className="text-background/80">+91 92928 98150</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — The Sanctuary Guarantee */}
      <div className="border-t border-background/20">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] text-background/40 uppercase tracking-[0.2em]">© 2026 Nafshe Luxury — Jeddah · Paris · Dubai</p>
            <div className="flex items-center gap-4 py-2 px-6 bg-white/5 border border-white/10 rounded-full">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent">Women-Only Secure Sanctuary</p>
            </div>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-background/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Maison Agreement</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Global Logistics</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 2500);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Newsletter Section - Minimal Luxury */}
        <div className="mb-20 pb-20 border-b border-border">
          <div className="max-w-2xl">
            <div className="flex justify-start mb-6">
              <div className="w-8 h-px bg-accent"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-light text-foreground mb-4 tracking-wide">Join Our VIP Circle</h3>
            <p className="text-base text-muted-foreground mb-8 font-light leading-relaxed">Be the first to discover new collections, exclusive offers, and styling tips for your special moments.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-all"
                required
              />
              <button
                type="submit"
                className={`px-8 py-3 border transition-all font-light tracking-wide uppercase text-xs ${
                  subscribed
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">Get 15% off your first order when you subscribe</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h4 className="text-lg font-light text-foreground tracking-widest uppercase">NAFSHE</h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Premium fashion for the discerning woman. Natural, authentic, and timeless elegance in every collection.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Middle East & Worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 234 567 890</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:hello@nafshe.com" className="hover:text-accent transition-colors">hello@nafshe.com</a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-light text-foreground mb-6 tracking-widest uppercase text-xs">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-accent transition-colors font-light">All Products</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors font-light">New Arrivals</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors font-light">Collections</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors font-light">About Us</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-light text-foreground mb-6 tracking-widest uppercase text-xs">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent transition-colors font-light">Contact</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-light">Blog</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-light">Press</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-light">Career</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-light text-foreground mb-6 tracking-widest uppercase text-xs">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent transition-colors font-light">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-light">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-light">Returns</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-light">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-muted-foreground font-light">
            <p>&copy; {currentYear} Nafshe. All rights reserved.</p>
            <div className="flex gap-8 tracking-wide uppercase">
              <a href="#" className="hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">Twitter</a>
              <a href="#" className="hover:text-accent transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

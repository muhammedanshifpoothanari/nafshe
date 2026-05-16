'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/cart-context';

export function NafsheHeader() {
  const { items, setIsOpen: setIsCartOpen } = useCart();
  const itemCount = items.length;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <header className={`sticky top-0 z-[60] transition-all duration-700 bg-white ${isScrolled ? 'py-2.5 shadow-sm' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-2xl font-light tracking-tighter text-foreground group-hover:text-accent transition-all duration-500">Λ</span>
            <span className="text-sm font-bold tracking-[0.4em] text-foreground uppercase pt-1">NAFSHE</span>
          </Link>

          {/* Reverted Navigation - Minimal Desktop Only */}
          <nav className="hidden lg:flex items-center gap-12">
            {[
              { label: 'Collections', href: '/products' },
              { label: 'The Houses', href: '/brands' },
              { label: 'Journal', href: '/about' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-bold text-foreground/50 hover:text-foreground transition-all uppercase tracking-[0.3em] relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-luxury hover:text-accent transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-5.5 md:h-5.5" />
            </button>
            
            <Link 
              href="/faq"
              className="p-2 text-luxury hover:text-accent transition-colors hidden md:block"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5 md:w-5.5 md:h-5.5" />
            </Link>

            <Link 
              href="/profile"
              className="p-2 text-luxury hover:text-accent transition-colors hidden md:block"
              aria-label="Profile"
            >
              <User className="w-5 h-5 md:w-5.5 md:h-5.5" />
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-luxury hover:text-accent transition-colors relative group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 md:w-5.5 md:h-5.5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            <button 
              className="p-2 text-luxury hover:text-accent transition-colors md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[110] bg-background animate-fade-in flex flex-col">
            <div className="p-8 flex items-center justify-between">
               <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 group">
                  <span className="text-2xl font-light tracking-tighter text-foreground group-hover:text-accent transition-all duration-500">Λ</span>
                  <span className="text-xs font-bold tracking-[0.3em] uppercase pt-1">NAFSHE</span>
               </Link>
               <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                 <X className="w-6 h-6" />
               </button>
            </div>

            <nav className="flex-1 px-8 py-12 space-y-10 overflow-y-auto">
               {[
                 { label: 'New Arrivals', href: '/products', subtitle: 'Explore the latest drops' },
                 { label: 'The Houses', href: '/brands', subtitle: 'Curated luxury labels' },
                 { label: 'Our Story', href: '/about', subtitle: 'The art of elegance' },
                 { label: 'Concierge', href: '/contact', subtitle: 'Personalized VIP support' },
                 { label: 'Private Profile', href: '/login', subtitle: 'Manage your acquisitions' },
               ].map((item, i) => (
                 <Link 
                   key={item.href}
                   href={item.href}
                   onClick={() => setIsMenuOpen(false)}
                   className="block group animate-fade-in-up"
                   style={{ animationDelay: `${i * 100}ms` }}
                 >
                    <div className="space-y-1">
                       <p className="text-2xl font-light text-luxury group-hover:text-accent transition-colors">{item.label}</p>
                       <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{item.subtitle}</p>
                    </div>
                 </Link>
               ))}
            </nav>

            <div className="p-8 border-t border-border bg-muted/10 space-y-6">
               <div className="flex justify-between items-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Follow the Maison</p>
                  <div className="flex gap-6 text-foreground/60">
                     <Link href="https://instagram.com/nafshe_official" target="_blank" className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-accent">Instagram</Link>
                     <span className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-accent">TikTok</span>
                  </div>
               </div>
               <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                  © 2026 NAFSHE LUXURY. <br /> RIYADH — DUBAI — PARIS
               </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

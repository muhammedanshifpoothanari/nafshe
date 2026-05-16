'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, User, Globe, Sun, Moon } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store/languageStore';
import { useTheme } from 'next-themes';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchBar } from './SearchBar';

export function Header() {
  const { count } = useCart();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isArabic = language === 'ar';

  return (
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border ${isArabic ? 'dir-rtl' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`h-16 flex items-center ${isArabic ? 'flex-row-reverse' : 'justify-between'}`}>
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 text-xl font-bold text-luxury ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary font-bold">
              N
            </div>
            <span className="hidden sm:inline text-foreground">Nafshe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex gap-8 items-center text-sm font-medium ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              {t('nav.products')}
            </Link>
            <Link href="#" className="text-foreground hover:text-accent transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="#" className="text-foreground hover:text-accent transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {/* Search Toggle - Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition"
              aria-label="Search"
            >
              <Search size={20} className="text-foreground" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-foreground" />
              ) : (
                <Moon size={20} className="text-foreground" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <Link href="/profile" className="p-2 hover:bg-muted rounded-lg transition hidden sm:block">
              <User size={20} className="text-foreground" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 hover:bg-muted rounded-lg transition"
            >
              <ShoppingBag size={20} className="text-foreground" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-border py-3 pb-4">
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="luxury-input text-sm w-full"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className={`md:hidden border-t border-border py-4 space-y-2 ${isArabic ? 'space-y-reverse' : ''}`}>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-lg transition">
              {t('nav.products')}
            </Link>
            <Link href="#" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-lg transition">
              {t('nav.about')}
            </Link>
            <Link href="#" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-lg transition">
              {t('nav.contact')}
            </Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-lg transition">
              {t('nav.account')}
            </Link>
            <div className="px-3 py-2 sm:hidden">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

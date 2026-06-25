'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/lib/context/auth-context';
import { CartProvider } from '@/lib/context/cart-context';
import { CartDrawer } from '@/components/cart-drawer';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered successfully:', reg.scope))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <CartDrawer />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}

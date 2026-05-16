'use client';

import { AuthProvider } from '@/lib/context/auth-context';
import { CartProvider } from '@/lib/context/cart-context';
import { CartDrawer } from '@/components/cart-drawer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CartDrawer />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}

'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface ViewedProduct {
  id: string;
  timestamp: number;
}

const RECENTLY_VIEWED_KEY = 'nafshe-recently-viewed';
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [viewed, setViewed] = useLocalStorage<ViewedProduct[]>(RECENTLY_VIEWED_KEY, []);

  const addProduct = useCallback(
    (productId: string) => {
      setViewed((prev) => {
        // Remove if already exists
        const filtered = prev.filter((p) => p.id !== productId);
        
        // Add to the beginning with current timestamp
        const updated = [
          { id: productId, timestamp: Date.now() },
          ...filtered,
        ];
        
        // Keep only the first MAX_ITEMS
        return updated.slice(0, MAX_ITEMS);
      });
    },
    [setViewed]
  );

  const getProductIds = useCallback(() => {
    return viewed.map((p) => p.id);
  }, [viewed]);

  const clearHistory = useCallback(() => {
    setViewed([]);
  }, [setViewed]);

  return {
    viewedProducts: viewed,
    productIds: getProductIds(),
    addProduct,
    clearHistory,
  };
}

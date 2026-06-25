type CacheEntry = {
  value: any;
  expiry: number;
};

// Use a global cache store to persist cache during development hot reloads
const globalCache = (global as any).cacheStore || new Map<string, CacheEntry>();
if (process.env.NODE_ENV !== 'production') {
  (global as any).cacheStore = globalCache;
}

export const cache = {
  get: (key: string): any | null => {
    const entry = globalCache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      globalCache.delete(key);
      return null;
    }
    return entry.value;
  },

  set: (key: string, value: any, ttlSeconds: number = 300): void => {
    const expiry = Date.now() + ttlSeconds * 1000;
    globalCache.set(key, { value, expiry });
  },

  delete: (key: string): void => {
    globalCache.delete(key);
  },

  invalidatePrefix: (prefix: string): void => {
    for (const key of globalCache.keys()) {
      if (key.startsWith(prefix)) {
        globalCache.delete(key);
      }
    }
  },

  clear: (): void => {
    globalCache.clear();
  }
};

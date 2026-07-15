import { Redis } from '@upstash/redis';

type CacheEntry = {
  value: any;
  expiry: number;
};

// In-memory fallback map
const globalCache = (global as any).cacheStore || new Map<string, CacheEntry>();
if (process.env.NODE_ENV !== 'production') {
  (global as any).cacheStore = globalCache;
}

// Initialize Upstash Redis if variables exist
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log('[CACHE ENGINE] Upstash Redis initialized successfully.');
} else {
  console.log('[CACHE ENGINE] Falling back to In-Memory Local Cache.');
}

export const cache = {
  get: async (key: string): Promise<any | null> => {
    if (redis) {
      try {
        return await redis.get(key);
      } catch (err) {
        console.error('[CACHE ERROR] Redis GET failed:', err);
        return null;
      }
    }

    // In-memory fallback
    const entry = globalCache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      globalCache.delete(key);
      return null;
    }
    return entry.value;
  },

  set: async (key: string, value: any, ttlSeconds: number = 300): Promise<void> => {
    if (redis) {
      try {
        await redis.set(key, value, { ex: ttlSeconds });
        return;
      } catch (err) {
        console.error('[CACHE ERROR] Redis SET failed:', err);
      }
    }

    // In-memory fallback
    const expiry = Date.now() + ttlSeconds * 1000;
    globalCache.set(key, { value, expiry });
  },

  delete: async (key: string): Promise<void> => {
    if (redis) {
      try {
        await redis.del(key);
        return;
      } catch (err) {
        console.error('[CACHE ERROR] Redis DEL failed:', err);
      }
    }

    globalCache.delete(key);
  },

  invalidatePrefix: async (prefix: string): Promise<void> => {
    if (redis) {
      try {
        // Fetch keys matching the prefix
        const keys = await redis.keys(`${prefix}*`);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
        return;
      } catch (err) {
        console.error('[CACHE ERROR] Redis invalidatePrefix failed:', err);
      }
    }

    // In-memory fallback
    for (const key of globalCache.keys()) {
      if (key.startsWith(prefix)) {
        globalCache.delete(key);
      }
    }
  },

  clear: async (): Promise<void> => {
    if (redis) {
      try {
        await redis.flushdb();
        return;
      } catch (err) {
        console.error('[CACHE ERROR] Redis flushdb failed:', err);
      }
    }

    globalCache.clear();
  }
};

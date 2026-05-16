'use client';

import { Star, Zap, TrendingUp, Flame } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface ProductBadgesProps {
  isNew?: boolean;
  isLimited?: boolean;
  isSale?: boolean;
  rating?: number;
  stock?: number;
  maxStock?: number;
  viewCount?: number;
  buyCount?: number;
}

export function ProductBadges({
  isNew,
  isLimited,
  isSale,
  rating,
  stock,
  maxStock,
  viewCount,
  buyCount,
}: ProductBadgesProps) {
  const { t } = useTranslation();

  const stockPercentage = maxStock ? ((maxStock - stock!) / maxStock) * 100 : 0;
  const isLowStock = stock !== undefined && stock > 0 && stock <= 3;

  return (
    <div className="flex flex-wrap gap-2">
      {/* New Badge */}
      {isNew && (
        <div className="badge-new">
          <span>✨</span>
          {t('badges.new')}
        </div>
      )}

      {/* Limited Edition Badge */}
      {isLimited && (
        <div className="badge-limited">
          <Zap className="w-3 h-3" />
          {t('badges.limited')}
        </div>
      )}

      {/* Sale Badge */}
      {isSale && (
        <div className="badge-sale">
          <Flame className="w-3 h-3" />
          {t('badges.sale')}
        </div>
      )}

      {/* Low Stock / FOMO Badge */}
      {isLowStock && (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold animate-pulse">
          ⚠️ {t('badges.onlyLeft', { count: stock! })}
        </div>
      )}

      {/* Rating Badge */}
      {rating && rating >= 4.8 && (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <Star className="w-3 h-3 fill-current" />
          {rating.toFixed(1)}
        </div>
      )}

      {/* Best Seller Badge */}
      {buyCount && buyCount > 100 && (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold">
          <TrendingUp className="w-3 h-3" />
          {t('badges.bestSeller')}
        </div>
      )}
    </div>
  );
}

export function SocialProof({
  viewCount,
  buyCount,
  compact = false,
}: {
  viewCount?: number;
  buyCount?: number;
  compact?: boolean;
}) {
  const { t } = useTranslation();

  if (!viewCount && !buyCount) return null;

  if (compact) {
    return (
      <div className="space-y-1 text-xs text-muted-foreground">
        {viewCount && viewCount > 0 && (
          <p className="social-proof-text">👁️ {t('badges.viewed', { count: viewCount })}</p>
        )}
        {buyCount && buyCount > 0 && (
          <p className="social-proof-text">✓ {t('badges.bought', { count: buyCount })}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {viewCount && viewCount > 0 && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <span className="text-lg">👁️</span>
          <span className="text-sm text-foreground">
            {t('badges.viewed', { count: viewCount })}
          </span>
        </div>
      )}
      {buyCount && buyCount > 0 && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
          <span className="text-lg">✓</span>
          <span className="text-sm text-foreground">
            {t('badges.bought', { count: buyCount })}
          </span>
        </div>
      )}
    </div>
  );
}

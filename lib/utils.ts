import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes Cloudinary URLs dynamically to deliver the best quality-to-size ratio using AVIF/WebP,
 * automatic compression (q_auto:best), device pixel ratio matching, and dynamic dimension bounds.
 */
export function getOptimizedImageUrl(url: string, width = 800): string {
  if (!url) return '';
  if (url.includes('res.cloudinary.com')) {
    // Inject auto format (f_auto), best auto compression (q_auto:best), and width bounds into the URL path
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/f_auto,q_auto:best,w_${width},c_limit,dpr_auto/${parts[1]}`;
    }
  }
  return url;
}


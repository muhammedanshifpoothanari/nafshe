'use client';

import { useCallback, useMemo } from 'react';
import { useLanguageStore } from '@/lib/store/languageStore';
import enTranslations from './translations/en.json';
import arTranslations from './translations/ar.json';

type Messages = typeof enTranslations;

const translations: Record<'en' | 'ar', Messages> = {
  en: enTranslations,
  ar: arTranslations,
};

export function useTranslation() {
  const { language } = useLanguageStore();

  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>) => {
      const keys = key.split('.');
      let current: any = translations[language];

      for (const k of keys) {
        current = current?.[k];
        if (current === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      let result = String(current);
      
      if (replacements) {
        Object.entries(replacements).forEach(([key, value]) => {
          result = result.replace(`{${key}}`, String(value));
        });
      }

      return result;
    },
    [language]
  );

  return useMemo(() => ({ t, language }), [t, language]);
}

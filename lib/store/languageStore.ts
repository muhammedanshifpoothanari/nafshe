'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '@/lib/i18n/config';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from '@/lib/i18n/config';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      setLanguage: (language: Language) => set({ language }),
    }),
    {
      name: LANGUAGE_STORAGE_KEY,
    }
  )
);

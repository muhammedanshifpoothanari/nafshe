export type Language = 'en' | 'ar';

export const DEFAULT_LANGUAGE: Language = 'en';
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'ar'];

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  ar: 'العربية',
};

export const LANGUAGE_STORAGE_KEY = 'nafshe-language';

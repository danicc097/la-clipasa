import type { GenericTranslations } from 'i18nifty'

export const languages = ['en', 'es'] as const

export const fallbackLanguage = 'en'

export type Language = typeof languages[number]

export type ComponentKey = typeof import('../components/Header').i18n
// | typeof import('../components/Footer').i18n
// | typeof import('../components/Post').i18n
// | typeof import('../components/ProtectedRoute').i18n

export type Translations<L extends Language> = GenericTranslations<ComponentKey, Language, typeof fallbackLanguage, L>

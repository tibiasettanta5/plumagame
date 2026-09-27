export const LOCALES = [
  'en',
  'zh',
  'hi',
  'es',
  'fr',
  'ar',
  'pt',
  'ru',
  'ja',
  'de',
  'it',
] as const

export type Locale = (typeof LOCALES)[number]

/** Lingue più usate al mondo (+ italiano di partenza). */
export const LOCALE_META: Record<
  Locale,
  { label: string; dir: 'ltr' | 'rtl' }
> = {
  en: { label: 'English', dir: 'ltr' },
  zh: { label: '中文', dir: 'ltr' },
  hi: { label: 'हिन्दी', dir: 'ltr' },
  es: { label: 'Español', dir: 'ltr' },
  fr: { label: 'Français', dir: 'ltr' },
  ar: { label: 'العربية', dir: 'rtl' },
  pt: { label: 'Português', dir: 'ltr' },
  ru: { label: 'Русский', dir: 'ltr' },
  ja: { label: '日本語', dir: 'ltr' },
  de: { label: 'Deutsch', dir: 'ltr' },
  it: { label: 'Italiano', dir: 'ltr' },
}

export type Dict = Record<string, string>

export type Vars = Record<string, string | number>

export function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  )
}

/** Rileva la lingua del browser senza scelta manuale. */
export function detectLocale(): Locale {
  const supported = new Set<string>(LOCALES)
  const candidates = [
    ...(typeof navigator !== 'undefined' ? navigator.languages ?? [] : []),
    typeof navigator !== 'undefined' ? navigator.language : 'en',
  ]

  for (const raw of candidates) {
    if (!raw) continue
    const lower = raw.toLowerCase()
    const base = lower.split('-')[0]
    // cinesi
    if (lower.startsWith('zh')) return 'zh'
    if (supported.has(base)) return base as Locale
  }
  return 'en'
}

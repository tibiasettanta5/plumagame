import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { ar } from './messages/ar'
import { de } from './messages/de'
import { en } from './messages/en'
import { es } from './messages/es'
import { fr } from './messages/fr'
import { hi } from './messages/hi'
import { it } from './messages/it'
import { ja } from './messages/ja'
import { pt } from './messages/pt'
import { ru } from './messages/ru'
import { zh } from './messages/zh'
import {
  detectLocale,
  interpolate,
  LOCALE_META,
  type Dict,
  type Locale,
  type Vars,
} from './types'

const TABLES: Record<Locale, Dict> = {
  en,
  it,
  es,
  fr,
  de,
  pt,
  zh,
  ja,
  ru,
  ar,
  hi,
}

export type TFunction = (key: string, vars?: Vars) => string

type I18nValue = {
  locale: Locale
  t: TFunction
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nValue | null>(null)

function makeT(locale: Locale): TFunction {
  const table = TABLES[locale]
  return (key, vars) => {
    const raw = table[key] ?? TABLES.en[key] ?? key
    return interpolate(raw, vars)
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useMemo(() => detectLocale(), [])
  const t = useMemo(() => makeT(locale), [locale])
  const dir = LOCALE_META[locale].dir

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  const value = useMemo(() => ({ locale, t, dir }), [locale, t, dir])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export function useT(): TFunction {
  return useI18n().t
}

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { siteEs, type SiteCopy } from '@/content/site'
import { siteEn } from '@/content/site.en'
import { menuEs } from '@/content/menu'
import { menuEn } from '@/content/menu.en'
import type { Lang, MenuCategory } from '@/content/types'

/**
 * i18n mínimo: dos diccionarios y un interruptor. Sin librería y sin rutas
 * separadas — el HTML estático se genera en español (que es lo que indexa
 * Google) y el inglés se aplica en cliente.
 */

const STORAGE_KEY = 'koi-taberna:lang'

const COPY: Record<Lang, SiteCopy> = { es: siteEs, en: siteEn }

/** Mezcla los textos ingleses sobre la carta española. Los precios no se tocan. */
function translateMenu(): MenuCategory[] {
  return menuEs.map((category) => ({
    ...category,
    name: menuEn.categories[category.id] ?? category.name,
    note: category.note ? menuEn.notes[category.id] ?? category.note : undefined,
    items: category.items.map((item) => {
      const translated = menuEn.items[item.id]
      return translated
        ? { ...item, name: translated.name, description: translated.description }
        : item
    }),
  }))
}

const MENUS: Record<Lang, MenuCategory[]> = { es: menuEs, en: translateMenu() }

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: SiteCopy
  menu: MenuCategory[]
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  // Siempre arranca en español para que el HTML servido y el primer render
  // coincidan. La preferencia guardada se aplica justo después de montar.
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'es') setLangState(stored)
    } catch {
      // localStorage bloqueado (modo privado, cookies denegadas): se queda en español.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin persistencia; el cambio sigue funcionando durante la visita.
    }
  }, [])

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: COPY[lang], menu: MENUS[lang] }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const context = useContext(LangContext)
  if (!context) throw new Error('useLang debe usarse dentro de <LangProvider>')
  return context
}

/** Locale completo, para Intl. */
export const LOCALES: Record<Lang, string> = { es: 'es-ES', en: 'en-GB' }

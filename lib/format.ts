import type { Lang } from '@/content/types'
import { LOCALES } from './i18n'

/** Números siempre por Intl: 4,6 en español y 4.6 en inglés, sin literales. */
export function formatNumber(
  value: number,
  lang: Lang,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(LOCALES[lang], options).format(value)
}

/** Precio en euros. Solo se usa si SHOW_PRICES está activo. */
export function formatPrice(value: number, lang: Lang): string {
  return formatNumber(value, lang, { style: 'currency', currency: 'EUR' })
}

/** La nota media, con un decimal siempre visible. */
export function formatRating(value: number, lang: Lang): string {
  return formatNumber(value, lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

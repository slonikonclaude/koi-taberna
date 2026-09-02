'use client'

import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import type { Lang } from '@/content/types'

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
]

/**
 * Cambio de idioma. Dos botones, no un <select>: son dos opciones y así se ve
 * de un vistazo cuál está activa. La preferencia se guarda en localStorage.
 */
export function LangSwitch({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  const { lang, setLang, t } = useLang()
  const dark = tone === 'dark'

  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={cn(
        'flex items-center gap-0.5 rounded-full p-0.5',
        dark ? 'bg-cream/12' : 'bg-ink/8',
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const active = lang === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            aria-label={option.value === 'en' ? t.nav.switchToEn : t.nav.switchToEs}
            className={cn(
              'h-8 cursor-pointer rounded-full px-2.5 text-xs font-semibold tracking-wide',
              'transition-colors duration-150 ease-out',
              active
                ? dark
                  ? 'bg-cream text-wave-deep'
                  : 'bg-ink text-cream'
                : dark
                  ? 'text-cream/75 hover:text-cream'
                  : 'text-muted hover:text-ink',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

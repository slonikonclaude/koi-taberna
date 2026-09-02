'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { asset } from '@/lib/asset'
import { useReserve } from '../reserve/ReserveProvider'
import { Button } from '../ui/Button'
import { Container } from '../ui/Section'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'
import { cn } from '@/lib/cn'

/** Anclas de la portada. La clave apunta al diccionario de `nav`. */
const SECTIONS = [
  { id: 'nosotros', key: 'about' },
  { id: 'platos', key: 'dishes' },
  { id: 'resenas', key: 'reviews' },
  { id: 'galeria', key: 'gallery' },
  { id: 'visitanos', key: 'visit' },
] as const

export function Header() {
  const { t } = useLang()
  const { open: openReserve } = useReserve()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const onHome = pathname === '/' || pathname === ''

  // Esc cierra el menú móvil, como cualquier capa desplegable.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => setMenuOpen(false), [pathname])

  // Desde la carta o las legales hay que volver a la portada primero. Estos
  // son <a> normales, no next/link, así que la ruta base la ponemos nosotros.
  const anchor = (id: string) => (onHome ? `#${id}` : `${asset('/')}#${id}`)

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-lg">
      <a href="#contenido" className="skip-link rounded-full bg-ink px-4 py-2 text-sm text-cream">
        {t.nav.skipToContent}
      </a>

      <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 rounded-lg"
          aria-label={`${t.hero.title} — ${t.actions.backHome}`}
        >
          <Logo />
        </Link>

        <nav aria-label={t.nav.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={anchor(section.id)}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink/80 transition-colors duration-150 ease-out hover:bg-ink/6 hover:text-ink"
                >
                  {t.nav[section.key]}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/carta"
                aria-current={onHome ? undefined : 'page'}
                className={cn(
                  'rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-150 ease-out',
                  onHome ? 'text-ink/80 hover:bg-ink/6 hover:text-ink' : 'bg-ink/8 text-ink',
                )}
              >
                {t.nav.carta}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch />
          <Button size="sm" className="hidden sm:inline-flex" onClick={openReserve}>
            {t.actions.reserve}
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink transition-colors duration-150 ease-out hover:bg-ink/10 lg:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label={t.nav.mainNav}
          className="border-t border-line/70 bg-cream lg:hidden"
        >
          <Container className="py-3">
            <ul className="flex flex-col">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={anchor(section.id)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors duration-150 ease-out hover:bg-ink/6"
                  >
                    {t.nav[section.key]}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/carta"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-ink transition-colors duration-150 ease-out hover:bg-ink/6"
                >
                  {t.nav.carta}
                </Link>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Leaf } from 'lucide-react'
import { BUSINESS, SHOW_PRICES } from '@/content/site'
import type { DietTag, MenuItem } from '@/content/types'
import { useLang } from '@/lib/i18n'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useReserve } from '../reserve/ReserveProvider'
import { Button, buttonClasses } from '../ui/Button'
import { Container, Eyebrow } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { SeigaihaField } from '../brand/Waves'

export function MenuView() {
  const { t, menu } = useLang()
  const { open } = useReserve()
  const [activeId, setActiveId] = useState(menu[0]?.id ?? '')

  // Marca en el índice la categoría que se está leyendo.
  useEffect(() => {
    const headings = menu
      .map((category) => document.getElementById(`categoria-${category.id}`))
      .filter((element) => element !== null)

    if (headings.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveId(visible.target.id.replace('categoria-', ''))
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    for (const heading of headings) observer.observe(heading)
    return () => observer.disconnect()
  }, [menu])

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-28 h-96 w-[30rem] text-wave/10"
          style={{
            maskImage: 'radial-gradient(closest-side, black, transparent)',
            WebkitMaskImage: 'radial-gradient(closest-side, black, transparent)',
          }}
        >
          <SeigaihaField id="carta-seigaiha" scale={70} strokeWidth={1.8} />
        </div>

        <Container className="relative py-10 sm:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t.actions.backHome}
          </Link>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>{t.menuPage.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-[clamp(2.2rem,7vw,3.6rem)] font-extrabold leading-[1.02]">
                {t.menuPage.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {t.menuPage.subtitle}
              </p>
            </div>
            <Button size="lg" onClick={open} className="w-full shrink-0 md:w-auto">
              {t.actions.reserveTable}
            </Button>
          </div>
        </Container>
      </section>

      <Container className="pb-16 pt-0">
        <div className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-12">
          <nav
            aria-label={t.menuPage.jumpTo}
            className={cn(
              'sticky top-[var(--header-h)] z-30 -mx-5 border-b border-line/70 bg-cream/90 px-5 py-3 backdrop-blur-lg',
              'lg:top-[calc(var(--header-h)+2.5rem)] lg:mx-0 lg:h-fit lg:border-0 lg:bg-transparent lg:px-0 lg:pt-10 lg:backdrop-blur-none',
            )}
          >
            <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
              {menu.map((category) => {
                const active = activeId === category.id
                return (
                  <li key={category.id} className="shrink-0">
                    <a
                      href={`#categoria-${category.id}`}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium',
                        'transition-colors duration-150 ease-out lg:rounded-xl',
                        active
                          ? 'bg-ink text-cream'
                          : 'bg-ink/6 text-ink/80 hover:bg-ink/12 hover:text-ink lg:bg-transparent',
                      )}
                    >
                      {category.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="pt-10">
            {menu.map((category) => (
              <section key={category.id} className="mb-12 last:mb-0">
                <h2
                  id={`categoria-${category.id}`}
                  className="text-2xl font-bold sm:text-3xl"
                >
                  {category.name}
                </h2>
                {category.note && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{category.note}</p>
                )}

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {category.items.map((item, index) => (
                    <Reveal as="li" key={item.id} delay={Math.min(index, 4) * 40}>
                      <MenuItemCard item={item} />
                    </Reveal>
                  ))}
                </ul>
              </section>
            ))}

            <div className="mt-12 rounded-card bg-foam p-6 ring-1 ring-ink/6">
              <p className="text-sm text-ink">
                {t.menuPage.priceNote}{' '}
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded font-semibold text-wave underline decoration-wave/30 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-wave"
                >
                  {t.menuPage.priceNoteLink}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.menuPage.allergens}</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button onClick={open} className="w-full sm:w-auto">
                  {t.actions.reserveTable}
                </Button>
                <Link href="/" className={buttonClasses('secondary', 'md', 'w-full sm:w-auto')}>
                  {t.actions.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

function MenuItemCard({ item }: { item: MenuItem }) {
  const { t, lang } = useLang()

  return (
    <article className="flex h-full gap-4 rounded-2xl bg-foam p-4 ring-1 ring-ink/6 sm:p-5">
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold leading-snug">{item.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
        {item.tags.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li key={tag}>
                <DietChip tag={tag} label={t.menuPage.tags[tag]} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* La columna de precios desaparece entera con SHOW_PRICES en false. */}
      {SHOW_PRICES && (
        <p className="tnum shrink-0 text-base font-bold text-ink">
          {item.price === null ? (
            <span className="text-muted" aria-label={t.menuPage.priceColumn}>
              {t.menuPage.noPrice}
            </span>
          ) : (
            formatPrice(item.price, lang)
          )}
        </p>
      )}
    </article>
  )
}

function DietChip({ tag, label }: { tag: DietTag; label: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold',
        tag === 'vegano' ? 'bg-wave text-cream' : 'bg-ink/10 text-ink',
      )}
    >
      <Leaf size={12} aria-hidden="true" strokeWidth={2.2} />
      {label}
    </span>
  )
}

'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BUSINESS } from '@/content/site'
import { IMAGES } from '@/content/images'
import { useLang } from '@/lib/i18n'
import { formatNumber, formatRating } from '@/lib/format'
import { useReserve } from '../reserve/ReserveProvider'
import { Button, buttonClasses } from '../ui/Button'
import { Container, Eyebrow } from '../ui/Section'
import { Placeholder } from '../ui/Placeholder'
import { Stars } from '../ui/Stars'
import { SeigaihaField } from '../brand/Waves'

export function Hero() {
  const { t, lang } = useLang()
  const { open } = useReserve()

  const rating = formatRating(BUSINESS.rating, lang)
  const reviews = formatNumber(BUSINESS.reviewCount, lang)

  return (
    <section className="relative isolate overflow-hidden">
      {/* Seigaiha de fondo, desvanecido hacia el centro. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[34rem] text-wave/10"
        style={{
          maskImage: 'radial-gradient(closest-side, black, transparent)',
          WebkitMaskImage: 'radial-gradient(closest-side, black, transparent)',
        }}
      >
        <SeigaihaField id="hero-seigaiha" scale={72} strokeWidth={1.8} />
      </div>

      <Container className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>

          <h1
            translate="no"
            className="mt-5 text-[clamp(2.45rem,8.5vw,4.6rem)] font-extrabold leading-[0.97]"
          >
            {t.hero.title}
          </h1>

          {/* 20 px como mínimo y semibold: con ese tamaño el naranja profundo
              sobre crema cumple el contraste AA para texto grande. */}
          <p className="mt-5 font-display text-[clamp(1.25rem,3.4vw,1.6rem)] font-semibold leading-snug text-koi-deep">
            {t.hero.tagline}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={open} className="w-full sm:w-auto">
              {t.actions.reserveTable}
            </Button>
            <Link href="/carta" className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}>
              {t.actions.viewMenu}
            </Link>
          </div>

          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg text-sm text-muted transition-colors duration-150 ease-out hover:text-ink"
          >
            <Stars
              value={BUSINESS.rating}
              label={`${t.reviews.ratingLabel}: ${rating} / 5`}
              className="text-gold"
            />
            <span className="tnum font-semibold text-ink">{rating}</span>
            <span aria-hidden="true">·</span>
            <span className="tnum">
              {reviews} {t.hero.ratingSuffix}
            </span>
            <ArrowUpRight size={15} aria-hidden="true" className="shrink-0" />
          </a>
        </div>

        <div className="relative">
          <Placeholder
            slot={IMAGES.hero}
            priority
            className="shadow-2xl shadow-wave/15 lg:rotate-[1.2deg]"
          />
        </div>
      </Container>
    </section>
  )
}

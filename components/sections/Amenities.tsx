'use client'

import {
  Accessibility,
  Baby,
  CreditCard,
  Dog,
  Heart,
  Leaf,
  Martini,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { Container, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { SeigaihaField } from '../brand/Waves'

/** Iconos SVG de Lucide. Nunca emoji: no escalan ni se leen igual en todos los sistemas. */
const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  leaf: Leaf,
  dog: Dog,
  accessibility: Accessibility,
  card: CreditCard,
  baby: Baby,
  bar: Martini,
  heart: Heart,
}

export function Amenities() {
  const { t } = useLang()

  return (
    <section className="on-dark relative isolate mt-14 overflow-hidden bg-wave py-14 text-cream sm:mt-20 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-full w-[30rem] text-cream/8"
        style={{
          maskImage: 'linear-gradient(to right, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
        }}
      >
        <SeigaihaField id="amenities-seigaiha" scale={60} strokeWidth={1.6} />
      </div>

      <Container className="relative">
        <SectionHeading tone="dark" eyebrow={t.amenities.eyebrow} title={t.amenities.title} />

        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
          {t.amenities.items.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Heart
            return (
              <Reveal as="li" key={item.icon} delay={Math.min(index, 5) * 45}>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream/12 text-gold"
                  >
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 text-sm font-medium leading-snug text-cream">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </ul>

        <p className="mt-10 text-sm text-cream/70">{t.amenities.footnote}</p>
      </Container>
    </section>
  )
}

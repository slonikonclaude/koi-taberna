'use client'

import { Phone } from 'lucide-react'
import { RESERVATION_PHONE, RESERVATION_PHONE_DISPLAY } from '@/content/site'
import { useLang } from '@/lib/i18n'
import { useReserve } from '../reserve/ReserveProvider'
import { Button, ButtonLink } from '../ui/Button'
import { Container, Eyebrow } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { SeigaihaField } from '../brand/Waves'
import { KoiMark } from '../brand/KoiMark'

export function ReserveCta() {
  const { t } = useLang()
  const { open } = useReserve()

  return (
    <section className="pb-16 pt-6 sm:pb-20">
      <Container>
        <Reveal className="on-dark relative isolate overflow-hidden rounded-[1.75rem] bg-wave px-6 py-12 text-cream sm:rounded-[2.25rem] sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 text-cream/10"
            style={{
              maskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 70%)',
            }}
          >
            <SeigaihaField id="cta-seigaiha" scale={68} strokeWidth={1.8} />
          </div>

          <KoiMark
            variant="mono"
            className="pointer-events-none absolute -bottom-8 -right-6 w-40 -rotate-12 text-cream/10 sm:w-56"
          />

          <div className="relative max-w-xl">
            <Eyebrow tone="dark">{t.reserveCta.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.9rem,5.2vw,3.1rem)] font-bold leading-[1.05] text-cream">
              {t.reserveCta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80 sm:text-lg">
              {t.reserveCta.text}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="onDark" size="lg" onClick={open} className="w-full sm:w-auto">
                {t.actions.reserveTable}
              </Button>
              <ButtonLink
                href={`tel:${RESERVATION_PHONE}`}
                size="lg"
                variant="onDarkOutline"
                className="w-full sm:w-auto"
              >
                <Phone size={18} aria-hidden="true" />
                <span className="tnum">{RESERVATION_PHONE_DISPLAY}</span>
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

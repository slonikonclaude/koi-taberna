'use client'

import Link from 'next/link'
import { Instagram, MapPin, Phone, ShoppingBag } from 'lucide-react'
import {
  ADDRESS_LINE,
  BUSINESS,
  DELIVERY_ENABLED,
  DELIVERY_URL,
  RESERVATION_PHONE,
  RESERVATION_PHONE_DISPLAY,
} from '@/content/site'
import { labelledHourGroups } from '@/lib/hours'
import { useLang } from '@/lib/i18n'
import { Container } from '../ui/Section'
import { SeigaihaField, WaveEdge } from '../brand/Waves'
import { Logo } from './Logo'

const LINK =
  'inline-flex items-start gap-2 rounded-md text-cream/80 transition-colors duration-150 ease-out hover:text-cream'

export function Footer() {
  const { t } = useLang()
  const groups = labelledHourGroups(t.common.days.short)

  return (
    <footer className="on-dark">
      {/* Transición de ola entre el fondo crema y el pie azul. */}
      <div className="bg-cream">
        <WaveEdge className="text-wave-deep" />
      </div>

      <div className="relative isolate overflow-hidden bg-wave-deep pb-10 pt-12 text-cream sm:pt-14">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 text-cream/8" aria-hidden="true">
          <SeigaihaField id="footer-seigaiha" scale={64} strokeWidth={1.6} />
        </div>

        <Container className="relative">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo tone="dark" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">
                {t.footer.tagline}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-cream/12 px-4 text-sm font-medium text-cream transition-colors duration-150 ease-out hover:bg-cream/20"
                >
                  <Instagram size={16} aria-hidden="true" />
                  {BUSINESS.instagramHandle}
                </a>
                {DELIVERY_ENABLED && (
                  <a
                    href={DELIVERY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-cream/12 px-4 text-sm font-medium text-cream transition-colors duration-150 ease-out hover:bg-cream/20"
                  >
                    <ShoppingBag size={16} aria-hidden="true" />
                    Glovo
                  </a>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-gold">
                {t.footer.contact}
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                <li>
                  <a
                    href={BUSINESS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK}
                  >
                    <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{ADDRESS_LINE}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${RESERVATION_PHONE}`} className={LINK}>
                    <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="tnum">{RESERVATION_PHONE_DISPLAY}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-gold">
                {t.footer.hours}
              </h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                {groups.map((group) => (
                  <div key={group.label} className="flex flex-wrap items-baseline gap-x-3">
                    <dt className="min-w-20 font-medium text-cream">{group.label}</dt>
                    <dd className="tnum text-cream/75">
                      {group.ranges.map((range) => `${range[0]}–${range[1]}`).join(' · ')}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <nav aria-label={t.nav.footerNav}>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-gold">
                {t.footer.legal}
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/aviso-legal" className={LINK}>
                    {t.footer.legalLinks.notice}
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className={LINK}>
                    {t.footer.legalLinks.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className={LINK}>
                    {t.footer.legalLinks.cookies}
                  </Link>
                </li>
                <li>
                  <Link href="/carta" className={LINK}>
                    {t.nav.carta}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
            <p translate="no">© {BUSINESS.name}. {t.footer.rights}</p>
            <p>{t.footer.credits}</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}

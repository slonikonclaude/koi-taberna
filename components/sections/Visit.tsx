'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, MapPin, Navigation, Phone, ShoppingBag } from 'lucide-react'
import {
  ADDRESS_LINE,
  BUSINESS,
  DELIVERY_ENABLED,
  DELIVERY_URL,
  DIRECTIONS_URL,
  MAP_EMBED_URL,
  RESERVATION_PHONE,
  RESERVATION_PHONE_DISPLAY,
} from '@/content/site'
import { labelledHourGroups, openState, restaurantClock, type Clock } from '@/lib/hours'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { ButtonLink } from '../ui/Button'
import { Container, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

/**
 * Hora del restaurante, no la del visitante. `null` hasta montar: así el HTML
 * estático y el primer render del cliente coinciden.
 */
function useRestaurantClock(): Clock | null {
  const [clock, setClock] = useState<Clock | null>(null)

  useEffect(() => {
    const update = () => setClock(restaurantClock())
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return clock
}

export function Visit() {
  const { t } = useLang()
  const clock = useRestaurantClock()
  const groups = labelledHourGroups(t.common.days.long)
  const status = clock ? openState(clock) : null

  return (
    <section id="visitanos" className="py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow={t.visit.eyebrow} title={t.visit.title} />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal className="rounded-card bg-foam p-6 ring-1 ring-ink/6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold">{t.visit.hoursTitle}</h3>
              {/* Reserva de altura fija: el indicador aparece sin mover nada. */}
              <div className="min-h-8">
                {status && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
                      status.open ? 'bg-wave text-cream' : 'bg-ink/8 text-muted',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        status.open ? 'bg-gold' : 'bg-line-strong',
                      )}
                    />
                    {status.open ? t.visit.openNow : t.visit.closedNow}
                    {status.nextChange && (
                      <span className="tnum font-normal">
                        · {status.open ? t.visit.closesAt : t.visit.opensAt}{' '}
                        {status.nextChange}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>

            <dl className="mt-5 divide-y divide-line">
              {groups.map((group) => {
                const isToday = clock !== null && group.days.includes(clock.day)
                return (
                  <div
                    key={group.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                  >
                    <dt
                      className={cn(
                        'text-sm sm:text-base',
                        isToday ? 'font-bold text-ink' : 'font-medium text-ink/85',
                      )}
                    >
                      {group.label}
                      {isToday && (
                        <span className="ml-2 rounded-full bg-gold/25 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink">
                          {t.visit.todayLabel}
                        </span>
                      )}
                    </dt>
                    <dd className="tnum text-sm text-muted sm:text-base">
                      {group.ranges.map((range) => `${range[0]}–${range[1]}`).join(' · ')}
                    </dd>
                  </div>
                )
              })}
            </dl>

            {DELIVERY_ENABLED && (
              <div className="mt-6 rounded-2xl bg-cream p-4">
                <p className="text-sm leading-relaxed text-muted">{t.visit.deliveryNote}</p>
                <a
                  href={DELIVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-wave underline decoration-wave/30 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-wave"
                >
                  <ShoppingBag size={16} aria-hidden="true" />
                  {t.actions.delivery}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            )}
          </Reveal>

          <Reveal delay={70} className="flex flex-col gap-6">
            <div className="rounded-card bg-foam p-6 ring-1 ring-ink/6 sm:p-8">
              <h3 className="text-xl font-bold">{t.visit.contactTitle}</h3>

              <dl className="mt-5 space-y-4 text-sm sm:text-base">
                <div className="flex gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-koi-deep" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {t.visit.addressLabel}
                    </dt>
                    <dd className="mt-0.5 leading-relaxed">{ADDRESS_LINE}</dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone size={18} className="mt-1 shrink-0 text-koi-deep" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {t.visit.phoneLabel}
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${RESERVATION_PHONE}`}
                        className="tnum rounded font-semibold text-wave underline decoration-wave/30 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-wave"
                      >
                        {RESERVATION_PHONE_DISPLAY}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-line pt-4 text-xs">
                  <div>
                    <dt className="font-semibold uppercase tracking-wide text-muted">
                      {t.visit.plusCodeLabel}
                    </dt>
                    <dd className="tnum mt-1 text-ink">{BUSINESS.plusCode}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-wide text-muted">
                      {t.visit.coordsLabel}
                    </dt>
                    <dd className="tnum mt-1 text-ink">
                      {BUSINESS.lat}, {BUSINESS.lng}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Navigation size={17} aria-hidden="true" />
                  {t.actions.directions}
                </ButtonLink>
                <ButtonLink
                  variant="secondary"
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  {t.actions.openMaps}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>

            <MapCard />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/**
 * Mapa bajo demanda. Se muestra una tarjeta propia y el iframe de Google solo
 * se carga si el visitante lo pide: ni peso ni cookies de terceros de entrada.
 */
function MapCard() {
  const { t } = useLang()
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div className="overflow-hidden rounded-card ring-1 ring-ink/6">
        <iframe
          src={MAP_EMBED_URL}
          title={t.visit.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-72 w-full border-0 sm:h-80"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative isolate block h-72 w-full cursor-pointer overflow-hidden rounded-card ring-1 ring-ink/6 sm:h-80"
      style={{ background: 'linear-gradient(150deg, #F7F5F0 0%, #EFE3D3 60%, #E4D3BC 100%)' }}
    >
      <MapSketch />

      <span className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-foam/92 px-4 py-3 text-left backdrop-blur-sm">
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ink">{t.visit.mapCaption}</span>
          <span className="mt-0.5 block text-xs text-muted">{t.visit.mapLoadNote}</span>
        </span>
        <span className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-koi-deep px-4 text-xs font-semibold text-white transition-colors duration-150 ease-out group-hover:bg-koi-press">
          {t.actions.showMap}
        </span>
      </span>
    </button>
  )
}

/** Trama de calles abstracta: no pretende ser el plano real, solo dar contexto. */
function MapSketch() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#1B3A5C" strokeOpacity="0.16" strokeWidth="10" strokeLinecap="square">
        <path d="M-20 90h440M-20 210h440M110 -20v340M270 -20v340" />
      </g>
      <g stroke="#1B3A5C" strokeOpacity="0.1" strokeWidth="4">
        <path d="M-20 40h440M-20 150h440M-20 262h440M50 -20v340M190 -20v340M340 -20v340" />
      </g>
      <rect x="120" y="100" width="140" height="100" fill="#D9A441" fillOpacity="0.18" />
      <g transform="translate(190 150)">
        <circle r="26" fill="#E4572E" fillOpacity="0.18" />
        <path
          d="M0-20c-6.6 0-12 5.4-12 12 0 9 12 22 12 22s12-13 12-22c0-6.6-5.4-12-12-12Z"
          fill="#C4451F"
        />
        <circle cy="-8" r="4.4" fill="#F7F5F0" />
      </g>
    </svg>
  )
}

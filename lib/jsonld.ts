import { ADDRESS_LINE, BUSINESS, RESERVATION_PHONE, SITE_URL } from '@/content/site'
import { hourGroups } from './hours'

const SCHEMA_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

/**
 * JSON-LD de tipo Restaurant. El horario se deriva de OPENING_HOURS, así que
 * cambiar el horario en `content/site.ts` actualiza también los datos
 * estructurados. Sin duplicados que se queden desfasados.
 */
export function restaurantJsonLd() {
  const openingHoursSpecification = hourGroups().flatMap((group) =>
    group.ranges.map((range) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: group.days.map((day) => SCHEMA_DAYS[day]),
      opens: range[0],
      closes: range[1],
    })),
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    url: `${SITE_URL}/`,
    telephone: RESERVATION_PHONE,
    servesCuisine: 'Japanese',
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Efectivo, tarjeta, contactless',
    acceptsReservations: 'True',
    image: `${SITE_URL}/og.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.lat,
      longitude: BUSINESS.lng,
    },
    hasMap: BUSINESS.mapsUrl,
    openingHoursSpecification,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [BUSINESS.instagram, BUSINESS.mapsUrl],
    description: `Restaurante japonés en ${BUSINESS.cityAlt}: ramen, sushi y bao. ${ADDRESS_LINE}.`,
    menu: `${SITE_URL}/carta/`,
  }
}

/** Migas de pan para la página de la carta. */
export function cartaBreadcrumbJsonLd(name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BUSINESS.shortName, item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}/carta/` },
    ],
  }
}

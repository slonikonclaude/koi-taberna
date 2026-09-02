import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

export const dynamic = 'force-static'

/** Cinco páginas fijas. Si se añade una ruta nueva, añadirla también aquí. */
const ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/carta/', priority: 0.9 },
  { path: '/aviso-legal/', priority: 0.3 },
  { path: '/privacidad/', priority: 0.3 },
  { path: '/cookies/', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: 'monthly',
    priority: route.priority,
  }))
}

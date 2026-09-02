import type { Metadata } from 'next'
import { siteEs } from '@/content/site'
import { asset } from '@/lib/asset'
import { cartaBreadcrumbJsonLd } from '@/lib/jsonld'
import { MenuView } from '@/components/menu/MenuView'

export const metadata: Metadata = {
  title: siteEs.meta.carta.title,
  description: siteEs.meta.carta.description,
  alternates: { canonical: asset('/carta/') },
  openGraph: {
    type: 'article',
    locale: 'es_ES',
    url: asset('/carta/'),
    title: siteEs.meta.carta.title,
    description: siteEs.meta.carta.description,
    images: [{ url: asset('/og.png'), width: 1200, height: 630, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteEs.meta.carta.title,
    description: siteEs.meta.carta.description,
    images: [asset('/og.png')],
  },
}

export default function CartaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cartaBreadcrumbJsonLd(siteEs.menuPage.title)),
        }}
      />
      <MenuView />
    </>
  )
}

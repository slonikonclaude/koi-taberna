import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { BUSINESS, SITE_ORIGIN, siteEs } from '@/content/site'
import { asset } from '@/lib/asset'
import { restaurantJsonLd } from '@/lib/jsonld'
import { LangProvider } from '@/lib/i18n'
import { ReserveProvider } from '@/components/reserve/ReserveProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBar } from '@/components/layout/MobileBar'

/**
 * Dos familias, ninguna imitación de caligrafía japonesa: Outfit (grotesca
 * geométrica) para titulares, Inter para texto largo. Se autoalojan en la
 * compilación, así que no hay peticiones a Google en tiempo de ejecución.
 */
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

/**
 * La imagen de redes es un PNG estático en `public/og.png`, no una ruta
 * generada: así se sirve con extensión y con el Content-Type correcto en
 * cualquier hosting estático, que es lo que necesitan los rastreadores de
 * WhatsApp, Facebook y X.
 */
const OG_IMAGE = {
  url: asset('/og.png'),
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: `${BUSINESS.name} — ${siteEs.hero.tagline}`,
}

export const metadata: Metadata = {
  // Solo el origen: las rutas absolutas de abajo se resuelven contra él, y la
  // ruta base ya la añade asset(). Si metadataBase incluyera la ruta base,
  // un '/og.png' seguiría resolviéndose contra la raíz del dominio.
  metadataBase: new URL(SITE_ORIGIN),
  title: siteEs.meta.home.title,
  description: siteEs.meta.home.description,
  applicationName: BUSINESS.name,
  alternates: { canonical: asset('/') },
  icons: {
    icon: [{ url: asset('/icon.svg'), type: 'image/svg+xml' }],
    apple: [{ url: asset('/apple-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: asset('/'),
    siteName: BUSINESS.name,
    title: siteEs.meta.home.title,
    description: siteEs.meta.home.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteEs.meta.home.title,
    description: siteEs.meta.home.description,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  category: 'restaurant',
}

export const viewport: Viewport = {
  themeColor: '#F0E2D0',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Marca que hay JavaScript. Las animaciones de entrada solo esconden el
          contenido si este atributo existe: sin JS la página se ve completa.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js='on'" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
        />
      </head>
      <body>
        <LangProvider>
          <ReserveProvider>
            <Header />
            <main id="contenido">{children}</main>
            <Footer />
            <MobileBar />
          </ReserveProvider>
        </LangProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { PRIVACIDAD } from '@/content/legal'
import { asset } from '@/lib/asset'
import { LegalArticle } from '@/components/legal/LegalArticle'

export const metadata: Metadata = {
  title: PRIVACIDAD.metaTitle,
  description: PRIVACIDAD.metaDescription,
  alternates: { canonical: asset('/privacidad/') },
}

export default function PrivacidadPage() {
  return <LegalArticle document={PRIVACIDAD} />
}

import type { Metadata } from 'next'
import { AVISO_LEGAL } from '@/content/legal'
import { asset } from '@/lib/asset'
import { LegalArticle } from '@/components/legal/LegalArticle'

export const metadata: Metadata = {
  title: AVISO_LEGAL.metaTitle,
  description: AVISO_LEGAL.metaDescription,
  alternates: { canonical: asset('/aviso-legal/') },
}

export default function AvisoLegalPage() {
  return <LegalArticle document={AVISO_LEGAL} />
}

import type { Metadata } from 'next'
import { COOKIES } from '@/content/legal'
import { asset } from '@/lib/asset'
import { LegalArticle } from '@/components/legal/LegalArticle'

export const metadata: Metadata = {
  title: COOKIES.metaTitle,
  description: COOKIES.metaDescription,
  alternates: { canonical: asset('/cookies/') },
}

export default function CookiesPage() {
  return <LegalArticle document={COOKIES} />
}

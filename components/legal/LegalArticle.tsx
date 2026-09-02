import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { LegalDocument } from '@/content/legal'
import { siteEs } from '@/content/site'
import { Container } from '../ui/Section'
import { SeigaihaDivider } from '../brand/Waves'

/**
 * Las páginas legales van solo en español: son los textos con efectos
 * jurídicos y traducirlos sin revisión sería un problema, no una mejora.
 * Por eso este componente no usa el diccionario de idiomas.
 */
export function LegalArticle({ document }: { document: LegalDocument }) {
  return (
    <Container className="py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {siteEs.legal.backHome}
      </Link>

      <article className="mx-auto mt-8 max-w-2xl">
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-extrabold leading-[1.05]">
          {document.title}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {siteEs.legal.lastUpdated}: <time>{document.updated}</time>
        </p>

        <p className="mt-6 text-base leading-relaxed text-ink">{document.intro}</p>

        <SeigaihaDivider id={`legal-${document.slug}`} className="my-8" />

        {document.blocks.map((block, index) => {
          if (block.type === 'h2') {
            return (
              <h2 key={index} className="mt-9 text-xl font-bold sm:text-2xl">
                {block.text}
              </h2>
            )
          }
          if (block.type === 'ul') {
            return (
              <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {block.items.map((item) => (
                  <li key={item.slice(0, 32)} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )
          }
          return (
            <p key={index} className="mt-4 leading-relaxed text-muted">
              {block.text}
            </p>
          )
        })}
      </article>
    </Container>
  )
}

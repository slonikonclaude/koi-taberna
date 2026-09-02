'use client'

import { ArrowUpRight, Quote } from 'lucide-react'
import { BUSINESS } from '@/content/site'
import { useLang } from '@/lib/i18n'
import { formatRating } from '@/lib/format'
import { Container, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { Stars } from '../ui/Stars'

export function Reviews() {
  const { t, lang } = useLang()

  return (
    <section id="resenas" className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.reviews.eyebrow}
          title={t.reviews.title}
          subtitle={t.reviews.subtitle}
          aside={
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg font-medium text-wave underline decoration-wave/30 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-wave"
            >
              {t.actions.allReviews}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          }
        />

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {t.reviews.items.map((review, index) => (
            <Reveal as="li" key={review.id} delay={index * 70}>
              <figure className="flex h-full flex-col rounded-card bg-foam p-6 ring-1 ring-ink/6">
                <Quote
                  size={26}
                  aria-hidden="true"
                  className="mb-4 shrink-0 text-gold"
                  strokeWidth={1.8}
                />
                <blockquote
                  lang={review.lang}
                  className="flex-1 text-base leading-relaxed text-ink"
                >
                  {review.text}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <div className="flex items-center gap-2">
                    <Stars
                      value={review.rating}
                      label={`${t.reviews.ratingLabel}: ${formatRating(review.rating, lang)} / 5`}
                      className="text-gold"
                      size={15}
                    />
                    <span className="text-sm font-semibold text-ink">{review.author}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {t.reviews.source}
                    {review.translated ? ` · ${t.reviews.translatedNote}` : ''}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

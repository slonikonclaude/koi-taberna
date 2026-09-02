'use client'

import Link from 'next/link'
import { dishImage } from '@/content/images'
import { MOST_ORDERED_COUNT, POPULAR_IDS } from '@/content/menu'
import { useLang } from '@/lib/i18n'
import { buttonClasses } from '../ui/Button'
import { Container, SectionHeading } from '../ui/Section'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'
import { SeigaihaDivider } from '../brand/Waves'

export function Popular() {
  const { t, menu } = useLang()

  // Los platos se leen de la carta: una sola fuente de nombres y descripciones.
  const byId = new Map(menu.flatMap((category) => category.items).map((item) => [item.id, item]))
  const dishes = POPULAR_IDS.map((id) => byId.get(id)).filter((item) => item !== undefined)

  return (
    <section id="platos" className="py-4 sm:py-6">
      <SeigaihaDivider id="popular-divider" className="mb-10 sm:mb-14" />

      <Container>
        <SectionHeading
          eyebrow={t.popular.eyebrow}
          title={t.popular.title}
          subtitle={t.popular.subtitle}
          aside={
            <Link href="/carta" className={buttonClasses('secondary', 'md')}>
              {t.popular.cta}
            </Link>
          }
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, index) => {
            const image = dishImage(dish.id)
            return (
              <Reveal as="li" key={dish.id} delay={Math.min(index, 3) * 60}>
                <article className="group h-full overflow-hidden rounded-card bg-foam ring-1 ring-ink/6 transition-shadow duration-200 ease-out hover:shadow-xl hover:shadow-wave/10">
                  <div className="relative">
                    {image && <Placeholder slot={image} className="rounded-b-none" />}
                    {index < MOST_ORDERED_COUNT && (
                      <span className="absolute left-3 top-3 rounded-full bg-wave px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-cream">
                        {t.popular.mostOrdered}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-snug">{dish.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{dish.description}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

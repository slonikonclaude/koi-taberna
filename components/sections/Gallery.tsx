'use client'

import { GALLERY_IDS, IMAGES } from '@/content/images'
import { useLang } from '@/lib/i18n'
import { Container, SectionHeading } from '../ui/Section'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'

export function Gallery() {
  const { t } = useLang()

  return (
    <section id="galeria" className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        {/* Columnas CSS: cada plateado conserva su proporción real, sin recortes. */}
        <ul className="mt-10 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {GALLERY_IDS.map((id, index) => {
            const slot = IMAGES[id]
            if (!slot) return null
            return (
              <Reveal
                as="li"
                key={id}
                delay={Math.min(index, 5) * 50}
                className="mb-3 break-inside-avoid"
              >
                <Placeholder slot={slot} hideLabel={index % 2 === 1} />
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

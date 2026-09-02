'use client'

import { IMAGES } from '@/content/images'
import { useLang } from '@/lib/i18n'
import { Container, Eyebrow } from '../ui/Section'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'

export function About() {
  const { t } = useLang()

  return (
    <section id="nosotros" className="py-14 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.9rem,5vw,3.1rem)] font-bold leading-[1.06]">
            {t.about.title}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80} className="grid grid-cols-2 gap-3 sm:gap-4">
          <Placeholder
            slot={IMAGES.aboutRoom}
            ratio="auto"
            className="row-span-2 h-full min-h-64"
          />
          <Placeholder slot={IMAGES.aboutBroth} />
          <Placeholder slot={IMAGES.aboutSushi} />
        </Reveal>
      </Container>
    </section>
  )
}

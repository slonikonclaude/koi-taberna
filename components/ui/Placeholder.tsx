'use client'

import { useState } from 'react'
import type { ImageSlot, ImageTone } from '@/content/types'
import { useLang } from '@/lib/i18n'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import { KoiMark } from '../brand/KoiMark'
import { SeigaihaField } from '../brand/Waves'

/**
 * Hueco de foto.
 *
 * Si el slot de `content/images.ts` ya tiene `src`, pinta la imagen real con
 * su tamaño declarado (nada de saltos de maquetación). Si no, dibuja un
 * marcador de la propia marca: degradado, patrón seigaiha, silueta de carpa y
 * la etiqueta de para qué es el hueco. La página se ve terminada sin fotos.
 */

const TONES: Record<
  ImageTone,
  { background: string; pattern: string; watermark: string; chip: string }
> = {
  warm: {
    background: 'linear-gradient(145deg, #F6EADA 0%, #EFCFAE 52%, #E0A17E 100%)',
    pattern: 'text-[#B8642F]/25',
    watermark: 'text-[#B8642F]/20',
    chip: 'bg-foam/85 text-ink',
  },
  deep: {
    background: 'linear-gradient(145deg, #34618A 0%, #1B3A5C 55%, #12293F 100%)',
    pattern: 'text-cream/25',
    watermark: 'text-cream/20',
    chip: 'bg-wave-deep/80 text-cream',
  },
  soft: {
    background: 'linear-gradient(145deg, #FBF8F3 0%, #EFE3D3 55%, #DAC8B1 100%)',
    pattern: 'text-wave/18',
    watermark: 'text-wave/15',
    chip: 'bg-foam/85 text-ink',
  },
  gold: {
    background: 'linear-gradient(145deg, #F5E8CE 0%, #E9CD93 55%, #D9A441 100%)',
    pattern: 'text-[#8A6A1F]/25',
    watermark: 'text-[#8A6A1F]/20',
    chip: 'bg-foam/85 text-ink',
  },
}

interface PlaceholderProps {
  slot: ImageSlot
  className?: string
  /** Solo para la imagen del hero: se carga sin esperar al scroll. */
  priority?: boolean
  /** Oculta la etiqueta del hueco (galerías muy densas). */
  hideLabel?: boolean
  /** Fuerza una proporción distinta a la del slot. */
  ratio?: string
}

export function Placeholder({
  slot,
  className,
  priority = false,
  hideLabel = false,
  ratio,
}: PlaceholderProps) {
  const { lang, t } = useLang()
  // Si el fichero no existe o está vacío, se vuelve al marcador de la marca en
  // lugar de dejar el icono de imagen rota. Importa porque las fotos las irá
  // sustituyendo el restaurante y un fallo no debe estropear la página.
  const [failed, setFailed] = useState(false)
  // El id del hueco ya es único: sirve tal cual para el <pattern>. No se usa
  // useId() porque React 19 genera identificadores con caracteres que no
  // encajan bien en una referencia `url(#...)` dentro de un SVG.
  const patternId = `seigaiha-${slot.id}`
  const tone = TONES[slot.tone]
  const aspectRatio = ratio ?? slot.ratio

  if (slot.src && !failed) {
    return (
      <img
        onError={() => setFailed(true)}
        // asset() añade la ruta base: en `content/images.ts` se escribe
        // '/images/foto.jpg' y aquí sale bien tanto en la raíz como en /koi-taberna.
        src={asset(slot.src)}
        alt={slot.alt[lang]}
        width={slot.width}
        height={slot.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn('h-full w-full rounded-card object-cover', className)}
        style={{ aspectRatio }}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={slot.alt[lang]}
      className={cn(
        'relative isolate overflow-hidden rounded-card ring-1 ring-ink/8',
        className,
      )}
      style={{ aspectRatio, background: tone.background }}
    >
      <div className={cn('absolute inset-0', tone.pattern)} aria-hidden="true">
        <SeigaihaField id={patternId} scale={46} strokeWidth={1.3} />
      </div>

      <KoiMark
        variant="mono"
        className={cn(
          'pointer-events-none absolute -bottom-[6%] -right-[6%] w-[46%] max-w-40 -rotate-12',
          tone.watermark,
        )}
      />

      {!hideLabel && (
        <span
          className={cn(
            'absolute bottom-3 left-3 right-3 w-fit max-w-[calc(100%-1.5rem)] truncate',
            'rounded-full px-3 py-1.5 text-[0.7rem] font-medium tracking-tight',
            tone.chip,
          )}
        >
          {t.common.photoPrefix}: {slot.purpose[lang]}
        </span>
      )}
    </div>
  )
}

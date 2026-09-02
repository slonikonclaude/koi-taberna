import { cn } from '@/lib/cn'

interface StarsProps {
  /** De 0 a 5. Admite decimales: 4,6 deja la última estrella a medias. */
  value: number
  /** Texto para lectores de pantalla, p. ej. «Valoración: 4,6 de 5». */
  label: string
  className?: string
  size?: number
}

const STAR_PATH =
  'M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z'

function Row({ size }: { size: number }) {
  return (
    <span className="flex w-max gap-0.5">
      {[0, 1, 2, 3, 4].map((index) => (
        <svg
          key={index}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className="shrink-0"
        >
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

/**
 * Estrellas de valoración. Dos filas superpuestas y un recorte por anchura:
 * sin `id` de gradiente, así que se puede repetir en la misma página sin
 * duplicar identificadores.
 *
 * Nunca es el único indicador: la cifra siempre va escrita al lado.
 */
export function Stars({ value, label, className, size = 16 }: StarsProps) {
  const percent = Math.max(0, Math.min(1, value / 5)) * 100

  return (
    <span
      role="img"
      aria-label={label}
      className={cn('relative inline-flex shrink-0 align-middle', className)}
    >
      <span className="opacity-25" aria-hidden="true">
        <Row size={size} />
      </span>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${percent}%` }}
        aria-hidden="true"
      >
        <Row size={size} />
      </span>
    </span>
  )
}

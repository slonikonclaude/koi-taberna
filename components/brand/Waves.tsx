import { cn } from '@/lib/cn'

/**
 * Gráfica de marca: seigaiha (el patrón de escamas de ola japonés) y la
 * silueta de ola tipo Hokusai. Todo SVG propio, sin imágenes ni fuentes
 * externas, y coloreado con `currentColor` para poder usarlo sobre crema o
 * sobre azul sin duplicar componentes.
 */

interface SeigaihaFieldProps {
  /** Debe ser único en la página: el <pattern> se referencia por id. */
  id: string
  className?: string
  /** Tamaño de la baldosa en píxeles. Más pequeño = patrón más fino. */
  scale?: number
  strokeWidth?: number
}

export function SeigaihaField({
  id,
  className,
  scale = 40,
  strokeWidth = 1.4,
}: SeigaihaFieldProps) {
  const half = scale / 2

  return (
    <svg
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={id}
          width={scale}
          height={half}
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`scale(${scale / 40})`}
          >
            {/* Fila inferior: arcos centrados en x = 0 y x = 40 */}
            <path d="M-20 20a20 20 0 0 1 40 0M20 20a20 20 0 0 1 40 0" />
            <path d="M-14 20a14 14 0 0 1 28 0M26 20a14 14 0 0 1 28 0" />
            <path d="M-8 20a8 8 0 0 1 16 0M32 20a8 8 0 0 1 16 0" />
            {/* Fila superior, desplazada media baldosa */}
            <path d="M0 10a20 20 0 0 1 40 0" />
            <path d="M6 10a14 14 0 0 1 28 0" />
            <path d="M12 10a8 8 0 0 1 16 0" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/**
 * Franja divisoria entre secciones: el patrón se desvanece hacia los dos
 * lados con una máscara, para que no corte en seco.
 */
export function SeigaihaDivider({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none h-10 w-full text-gold/45 sm:h-14', className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 22%, black 78%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 22%, black 78%, transparent)',
      }}
    >
      <SeigaihaField id={id} scale={36} strokeWidth={1.2} />
    </div>
  )
}

/**
 * Borde de ola para la parte alta de una sección oscura. Dos capas: la de
 * atrás más clara, la de delante sólida, más un hilo de espuma en las crestas.
 */
export function WaveEdge({
  className,
  fill = 'currentColor',
  flip = false,
}: {
  className?: string
  fill?: string
  flip?: boolean
}) {
  return (
    <svg
      className={cn('block h-10 w-full sm:h-14', flip && 'rotate-180', className)}
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 30C120 6 240 6 360 30s240 24 360 0 240-24 360 0 240 24 360 0v30H0Z"
        fill={fill}
        opacity="0.4"
      />
      <path
        d="M0 40C120 18 240 18 360 40s240 22 360 0 240-22 360 0 240 22 360 0v20H0Z"
        fill={fill}
      />
      <path
        d="M300 24c20-9 40-9 60 0M1020 24c20-9 40-9 60 0M660 40c20 9 40 9 60 0"
        fill="none"
        stroke="#F7F5F0"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

/**
 * Carpa koi — icono provisional.
 *
 * TODO: sustituir por el logotipo definitivo (la carpa comiendo ramen del bol
 * con palillos). Cuando llegue el fichero real basta con reemplazar el
 * contenido de este componente y `app/icon.svg`; nadie más lo importa.
 *
 * Dibujado a mano en SVG para que sirva de favicon, de marca en la cabecera y
 * de filigrana en los huecos de foto sin depender de ningún fichero externo.
 */

interface KoiMarkProps {
  className?: string
  /** 'color' para la marca; 'mono' hereda currentColor (filigranas, favicon). */
  variant?: 'color' | 'mono'
}

export function KoiMark({ className, variant = 'color' }: KoiMarkProps) {
  const mono = variant === 'mono'
  const body = mono ? 'currentColor' : '#E4572E'
  const patch = mono ? 'currentColor' : '#F7F5F0'
  const detail = mono ? 'currentColor' : '#141210'

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {/* Cola: dos lóbulos que salen del cuerpo hacia la izquierda */}
      <path
        d="M25 33C18 28 11 22 6 16c-2 9-2 26 0 35 6-5 12-11 19-18Z"
        fill={body}
        opacity={mono ? 0.75 : 0.85}
      />
      {/* Aleta dorsal */}
      <path d="M29 23c3-6 9-9 15-8-2 4-6 8-11 10l-4-2Z" fill={body} opacity={mono ? 0.75 : 0.9} />
      {/* Aleta pectoral */}
      <path d="M33 42c2 6 6 9 11 9-2-4-4-7-5-10l-6 1Z" fill={body} opacity={mono ? 0.75 : 0.9} />
      {/* Cuerpo */}
      <ellipse cx="35" cy="33" rx="19" ry="12" fill={body} />
      {/* Manchas del koi kohaku */}
      <ellipse cx="30" cy="28" rx="6.5" ry="4" fill={patch} opacity={mono ? 0.35 : 1} />
      <ellipse cx="42" cy="38.5" rx="4.5" ry="3" fill={patch} opacity={mono ? 0.35 : 1} />
      {/* Barbillones */}
      <path
        d="M53 31c3-.5 6 0 8.5 1.5M52.5 36c3 1 5 2.5 6.5 4.5"
        stroke={body}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Ojo */}
      <circle cx="45" cy="29.5" r="2.2" fill={detail} />
      <circle cx="45.8" cy="28.8" r="0.7" fill={patch} opacity={mono ? 0 : 1} />
    </svg>
  )
}

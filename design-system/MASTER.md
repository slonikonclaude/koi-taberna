# Koi Taberna — sistema de diseño

Los tokens viven en `app/globals.css`, dentro del bloque `@theme`. Ese es el
único sitio donde se definen. Si hace falta un color o una curva nueva, se
añade ahí; no se crea una segunda escala en un componente.

## Clasificación

- **Tipo de producto:** restaurante. Patrón de portada: héroe con foto → carta
  → ubicación → pedir/reservar.
- **Estilo:** minimalismo cálido con toque editorial. Mucho aire, tipografía
  grande, frases cortas.
- **Tono:** artesano y algo juguetón por el tema anime, nunca infantil.

## Color

| Token | Valor | Uso |
| --- | --- | --- |
| `cream` | `#F0E2D0` | Fondo general |
| `ink` | `#141210` | Texto y titulares |
| `koi` | `#E4572E` | Naranja de marca: relleno decorativo, ilustración |
| `koi-deep` | `#C4451F` | Botones y texto naranja (4,98:1 con blanco) |
| `koi-press` | `#AD3C1A` | Hover del botón principal |
| `koi-soft` | `#F08A5D` | Acento naranja legible sobre fondo azul |
| `wave` | `#1B3A5C` | Secciones de contraste, enlaces, anillo de foco |
| `wave-deep` | `#12293F` | Pie de página |
| `foam` | `#F7F5F0` | Tarjetas sobre el crema |
| `gold` | `#D9A441` | Acento secundario, filetes, estrellas |
| `muted` | `#5A5048` | Texto secundario (6,2:1 sobre crema) |
| `line` / `line-strong` | `#D8C7B2` / `#8A7B6B` | Filetes y bordes de campos |

**Regla dura:** `koi` (`#E4572E`) nunca se usa como texto ni como fondo de
botón. Sobre crema da 2,89:1 y con texto blanco 3,68:1 — no llega a AA. Para
cualquier cosa interactiva o legible se usa `koi-deep`. El naranja de marca se
reserva para la ilustración y los rellenos decorativos.

Sobre el azul, el naranja de marca tampoco llega: ahí se usa `koi-soft` o
`gold`.

Ningún significado se transmite solo con color: las estrellas siempre llevan la
cifra al lado, los iconos de servicios siempre llevan su etiqueta escrita, y
los errores del formulario llevan texto además de borde.

## Tipografía

- **Titulares:** Outfit (grotesca geométrica, variable). Interletraje `-0.02em`,
  `text-wrap: balance`.
- **Texto:** Inter. Cuerpo de 16 px como mínimo, interlineado 1,5–1,7.
- Dos familias como máximo. Nada de tipografías que imitan caligrafía japonesa.
- `tabular-nums` en horarios, teléfonos, coordenadas y precios.

## Movimiento

| Token | Curva | Para qué |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entradas, salidas, casi todo |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Movimiento en pantalla |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | La hoja de reserva en móvil |

Duraciones: 140 ms para la pulsación de un botón, 150 ms para cambios de color,
260–300 ms para el diálogo, 620 ms para la aparición al hacer scroll (que es
decorativa y no bloquea nada).

Solo se animan `transform` y `opacity`. Nunca `transition: all`. Nada entra
desde `scale(0)`. `ease-in` no se usa en interfaz.

Todo está detrás de `prefers-reduced-motion: reduce`, que deja las
transiciones en 0,01 ms y muestra el contenido tal cual. El estado oculto de la
aparición al hacer scroll solo se aplica si hay JavaScript (`data-js="on"`),
así que sin JS la página se ve completa.

## Anti-patrones para este proyecto

- Azul como color dominante: es un restaurante, el azul no abre el apetito. El
  `wave` se usa en franjas y en el pie, nunca de fondo general.
- Fotos de comida pequeñas. Los huecos son grandes a propósito.
- Emoji como icono. Se usa Lucide o SVG propio.
- Degradado morado o rosa. No aparece en ninguna parte.
- Inventar datos. Si un dato no está confirmado, no se pone: por eso no hay
  precios, ni año de fundación, ni nombre de chef.

## Accesibilidad — comprobado

- Un único anillo de foco (`3px` sólido `wave`, o `cream` sobre fondo oscuro)
  definido una vez en `globals.css` y visible en todo lo interactivo.
- Todo elemento pulsable es `<button>` o `<a>`; ningún `<div onClick>`.
- Los botones de solo icono llevan `aria-label`; los iconos decorativos,
  `aria-hidden`.
- Los huecos de foto son `role="img"` con `aria-label`; las fotos reales llevan
  `alt` desde `content/images.ts`.
- Enlace de salto al contenido, jerarquía de encabezados correcta y
  `scroll-margin-top` en los anclas para que la cabecera fija no los tape.
- El diálogo de reserva es `<dialog>` nativo: foco atrapado y cierre con Esc.
- Comprobado a 375 / 768 / 1024 / 1440.

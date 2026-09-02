import type { ImageSlot } from './types'

/**
 * HUECOS DE IMAGEN.
 *
 * Mientras `src` sea `null` se pinta el componente <Placeholder>: degradado de
 * los colores de marca + patrón seigaiha + la etiqueta de para qué es el hueco.
 * La maqueta se ve terminada sin una sola foto.
 *
 * Para poner una foto real:
 *   1. Copia el fichero en `public/images/` (p. ej. `public/images/hero.jpg`).
 *   2. Escribe aquí `src: '/images/hero.jpg'`.
 *   3. Ajusta `alt` si hace falta. Nada más: ningún componente cambia.
 *
 * `width`/`height` son el tamaño recomendado del fichero. Se escriben también
 * como atributos de la etiqueta <img> para que no haya saltos de maquetación.
 */

const slot = (s: ImageSlot): ImageSlot => s

export const IMAGES: Record<string, ImageSlot> = {
  hero: slot({
    id: 'hero',
    src: null,
    purpose: {
      es: 'Bol de ramen de pato en primer plano',
      en: 'Close-up of the duck ramen bowl',
    },
    alt: {
      es: 'Bol de ramen de pato de Koi Taberna Japonesa',
      en: 'Bowl of duck ramen at Koi Taberna Japonesa',
    },
    width: 1000,
    height: 1250,
    ratio: '4 / 5',
    tone: 'warm',
  }),

  aboutBroth: slot({
    id: 'about-broth',
    src: null,
    purpose: { es: 'Caldo de ramen en la olla', en: 'Ramen broth in the pot' },
    alt: {
      es: 'Caldo de ramen cociendo en la cocina',
      en: 'Ramen broth simmering in the kitchen',
    },
    width: 800,
    height: 800,
    ratio: '1 / 1',
    tone: 'deep',
  }),

  aboutRoom: slot({
    id: 'about-room',
    src: null,
    purpose: { es: 'Interior — mesas y figuras', en: 'Interior — tables and figures' },
    alt: {
      es: 'Sala del restaurante con figuras de anime',
      en: 'Dining room with anime figures',
    },
    width: 800,
    height: 1000,
    ratio: '4 / 5',
    tone: 'soft',
  }),

  aboutSushi: slot({
    id: 'about-sushi',
    src: null,
    purpose: { es: 'Tabla de nigiris y uramakis', en: 'Board of nigiri and uramaki' },
    alt: {
      es: 'Nigiris y uramakis servidos en una tabla',
      en: 'Nigiri and uramaki served on a board',
    },
    width: 800,
    height: 800,
    ratio: '1 / 1',
    tone: 'gold',
  }),

  /* Platos destacados. La clave es `dish-<id del plato en menu.ts>`. */
  'dish-ramen-pato': slot({
    id: 'dish-ramen-pato',
    src: null,
    purpose: { es: 'Ramen de pato', en: 'Duck ramen' },
    alt: { es: 'Ramen de pato', en: 'Duck ramen' },
    width: 800,
    height: 600,
    ratio: '4 / 3',
    tone: 'warm',
  }),
  'dish-takoyaki': slot({
    id: 'dish-takoyaki',
    src: null,
    purpose: { es: 'Takoyaki con pulpo', en: 'Takoyaki with octopus' },
    alt: { es: 'Takoyaki con pulpo, cuatro piezas', en: 'Takoyaki with octopus, four pieces' },
    width: 800,
    height: 600,
    ratio: '4 / 3',
    tone: 'gold',
  }),
  'dish-bao-pato': slot({
    id: 'dish-bao-pato',
    src: null,
    purpose: { es: 'Bao de pato', en: 'Duck bao' },
    alt: { es: 'Bao de pato al vapor', en: 'Steamed duck bao' },
    width: 800,
    height: 600,
    ratio: '4 / 3',
    tone: 'soft',
  }),
  'dish-ramen-ternera': slot({
    id: 'dish-ramen-ternera',
    src: null,
    purpose: { es: 'Ramen de ternera', en: 'Beef ramen' },
    alt: { es: 'Ramen de ternera', en: 'Beef ramen' },
    width: 800,
    height: 600,
    ratio: '4 / 3',
    tone: 'deep',
  }),
  'dish-boniato-boom': slot({
    id: 'dish-boniato-boom',
    src: null,
    purpose: { es: 'Boniato boom', en: 'Boniato boom' },
    alt: { es: 'Boniato frito', en: 'Fried sweet potato' },
    width: 800,
    height: 600,
    ratio: '4 / 3',
    tone: 'warm',
  }),
  'dish-crispy-ebi': slot({
    id: 'dish-crispy-ebi',
    src: null,
    purpose: { es: 'Crispy ebi', en: 'Crispy ebi' },
    alt: { es: 'Langostinos crujientes', en: 'Crispy prawns' },
    width: 800,
    height: 600,
    ratio: '4 / 3',
    tone: 'gold',
  }),

  /* Galería del local. */
  'gallery-1': slot({
    id: 'gallery-1',
    src: null,
    purpose: { es: 'Sala vista desde la entrada', en: 'Room seen from the entrance' },
    alt: { es: 'Sala del restaurante vista desde la entrada', en: 'Dining room seen from the entrance' },
    width: 900,
    height: 1125,
    ratio: '4 / 5',
    tone: 'soft',
  }),
  'gallery-2': slot({
    id: 'gallery-2',
    src: null,
    purpose: { es: 'Figura de Totoro', en: 'Totoro figure' },
    alt: { es: 'Figura de Totoro en el comedor', en: 'Totoro figure in the dining room' },
    width: 900,
    height: 900,
    ratio: '1 / 1',
    tone: 'deep',
  }),
  'gallery-3': slot({
    id: 'gallery-3',
    src: null,
    purpose: { es: 'Bancos con cojines', en: 'Benches with cushions' },
    alt: { es: 'Bancos con cojines junto a la pared', en: 'Benches with cushions along the wall' },
    width: 900,
    height: 900,
    ratio: '1 / 1',
    tone: 'warm',
  }),
  'gallery-4': slot({
    id: 'gallery-4',
    src: null,
    purpose: { es: 'Barra del local', en: 'The bar' },
    alt: { es: 'Barra del restaurante', en: 'The restaurant bar' },
    width: 900,
    height: 1125,
    ratio: '4 / 5',
    tone: 'gold',
  }),
  'gallery-5': slot({
    id: 'gallery-5',
    src: null,
    purpose: { es: 'Detalle de figuras de manga', en: 'Manga figures, detail' },
    alt: { es: 'Estantería con figuras de manga', en: 'Shelf with manga figures' },
    width: 900,
    height: 900,
    ratio: '1 / 1',
    tone: 'deep',
  }),
  'gallery-6': slot({
    id: 'gallery-6',
    src: null,
    purpose: { es: 'Aseos temáticos', en: 'Themed toilets' },
    alt: { es: 'Aseos decorados con temática de anime', en: 'Toilets decorated with an anime theme' },
    width: 900,
    height: 1125,
    ratio: '4 / 5',
    tone: 'soft',
  }),
  'gallery-7': slot({
    id: 'gallery-7',
    src: null,
    purpose: { es: 'Mesa servida', en: 'A set table' },
    alt: { es: 'Mesa con varios platos servidos', en: 'Table with several dishes served' },
    width: 900,
    height: 900,
    ratio: '1 / 1',
    tone: 'warm',
  }),
  'gallery-8': slot({
    id: 'gallery-8',
    src: null,
    purpose: { es: 'Fachada y entrada', en: 'Facade and entrance' },
    alt: { es: 'Fachada del restaurante en Carrer Catalunya', en: 'Restaurant facade on Carrer Catalunya' },
    width: 900,
    height: 900,
    ratio: '1 / 1',
    tone: 'gold',
  }),
}

/** Orden de las plateas de la galería de la portada. */
export const GALLERY_IDS = [
  'gallery-1',
  'gallery-2',
  'gallery-3',
  'gallery-4',
  'gallery-5',
  'gallery-6',
  'gallery-7',
  'gallery-8',
]

/** Devuelve el hueco de un plato, o `undefined` si ese plato no tiene foto. */
export function dishImage(dishId: string): ImageSlot | undefined {
  return IMAGES[`dish-${dishId}`]
}

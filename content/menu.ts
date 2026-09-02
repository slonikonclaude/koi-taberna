import type { MenuCategory } from './types'

/**
 * CARTA — fuente única de verdad.
 *
 * Precios
 * -------
 * Todos los `price` están a `null` a propósito: el restaurante no publica
 * precios fuera de las apps de reparto y aquí no se inventa ninguna cifra.
 * Para activarlos: poner el número en euros (p. ej. `price: 12.5`) y cambiar
 * SHOW_PRICES a `true` en `content/site.ts`.
 *
 * Etiquetas
 * ---------
 * TODO: confirmar con el restaurante las etiquetas vegano/vegetariano.
 * Solo se marca lo que es inequívoco por la propia receta; el kimchi y el
 * boniato pueden variar según el proveedor. No se etiqueta nada como picante
 * porque no está confirmado.
 *
 * Los `id` son la clave que enlaza con `content/menu.en.ts`. No cambiarlos.
 */
export const menuEs: MenuCategory[] = [
  {
    id: 'entrantes',
    name: 'Entrantes',
    items: [
      {
        id: 'takoyaki',
        name: 'Takoyaki con pulpo (4 pzs)',
        description: 'Bolitas de masa con pulpo dentro, cuatro unidades.',
        price: null,
        tags: [],
      },
      {
        id: 'crispy-ebi',
        name: 'Crispy ebi',
        description: 'Langostinos rebozados y fritos.',
        price: null,
        tags: [],
      },
      {
        id: 'karaage',
        name: 'Karaage de pollo',
        description: 'Pollo marinado y frito, crujiente por fuera.',
        price: null,
        tags: [],
      },
      {
        id: 'edamame',
        name: 'Edamame salteado',
        description: 'Vainas de soja salteadas y con sal.',
        price: null,
        tags: ['vegano'],
      },
      {
        id: 'goma-wakame',
        name: 'Ensalada de algas goma wakame',
        description: 'Algas wakame aliñadas con sésamo.',
        price: null,
        tags: ['vegano'],
      },
      {
        id: 'kimchi',
        name: 'Kimchi',
        description: 'Col fermentada, para acompañar.',
        price: null,
        tags: ['vegetariano'],
      },
      {
        id: 'boniato-boom',
        name: 'Boniato boom',
        description: 'Boniato frito, dulce y crujiente.',
        price: null,
        tags: ['vegetariano'],
      },
    ],
  },
  {
    id: 'bao',
    name: 'Bao',
    note: 'Pan al vapor, esponjoso, para comer con la mano.',
    items: [
      {
        id: 'bao-pato',
        name: 'Bao de pato',
        description: 'Bollo al vapor relleno de pato.',
        price: null,
        tags: [],
      },
      {
        id: 'bao-pollo',
        name: 'Bao de pollo',
        description: 'Bollo al vapor relleno de pollo.',
        price: null,
        tags: [],
      },
    ],
  },
  {
    id: 'ramen',
    name: 'Ramen',
    note: 'Caldos de cocción larga, hechos en casa.',
    items: [
      {
        id: 'ramen-pato',
        name: 'Ramen de pato (200 g)',
        description: 'Caldo espeso, fideos y 200 g de pato.',
        price: null,
        tags: [],
      },
      {
        id: 'ramen-ternera',
        name: 'Ramen de ternera',
        description: 'Caldo de casa, fideos y ternera.',
        price: null,
        tags: [],
      },
    ],
  },
  {
    id: 'sushi',
    name: 'Sushi',
    items: [
      {
        id: 'nigiris',
        name: 'Nigiris',
        description: 'Bocados de arroz con pescado fresco encima.',
        price: null,
        tags: [],
      },
      {
        id: 'uramakis',
        name: 'Uramakis',
        description: 'Rollos con el arroz por fuera.',
        price: null,
        tags: [],
      },
    ],
  },
  {
    id: 'fuera-de-carta',
    name: 'Fuera de carta',
    note: 'Pregunta si está disponible ese día.',
    items: [
      {
        id: 'katsudon-premium',
        name: 'Katsudon premium',
        description: 'Pollo crujiente con huevo y verduras.',
        price: null,
        tags: [],
      },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    items: [
      {
        id: 'dorayaki',
        name: 'Dorayaki',
        description: 'Dos tortitas japonesas con relleno.',
        price: null,
        tags: [],
      },
      {
        id: 'mochi',
        name: 'Mochi',
        description: 'Bolitas de arroz glutinoso, para acabar.',
        price: null,
        tags: [],
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    items: [
      {
        id: 'cerveza',
        name: 'Cerveza',
        description: 'Servida bien fría.',
        price: null,
        tags: [],
      },
      {
        id: 'vino',
        name: 'Vino',
        description: 'Pregúntanos por la selección.',
        price: null,
        tags: [],
      },
    ],
  },
]

/**
 * Orden del bloque «Lo que más se pide» de la portada.
 * Los dos primeros son los más pedidos según Google.
 */
export const POPULAR_IDS = [
  'ramen-pato',
  'takoyaki',
  'bao-pato',
  'ramen-ternera',
  'boniato-boom',
  'crispy-ebi',
] as const

/** Cuántos de POPULAR_IDS llevan el distintivo «Lo más pedido». */
export const MOST_ORDERED_COUNT = 2

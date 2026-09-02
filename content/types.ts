/**
 * Tipos compartidos por todo el contenido.
 * Cambiar textos = tocar `content/*.ts`. Nunca hace falta abrir un componente.
 */

export type Lang = 'es' | 'en'

/** Etiquetas dietéticas. No existe «picante»: no está confirmado en ningún plato. */
export type DietTag = 'vegano' | 'vegetariano'

export interface MenuItem {
  /** Identificador estable. Es la clave que enlaza ES ↔ EN. No cambiarlo. */
  id: string
  name: string
  description: string
  /**
   * Precio en euros. `null` = sin dato público todavía.
   * Ver SHOW_PRICES en `content/site.ts`.
   */
  price: number | null
  tags: DietTag[]
}

export interface MenuCategory {
  id: string
  name: string
  /** Línea opcional bajo el título de la categoría. */
  note?: string
  items: MenuItem[]
}

/** Solo textos. Los precios viven únicamente en `content/menu.ts`. */
export interface MenuTranslation {
  categories: Record<string, string>
  notes: Record<string, string>
  items: Record<string, { name: string; description: string }>
}

export type ImageTone = 'warm' | 'deep' | 'soft' | 'gold'

export interface ImageSlot {
  id: string
  /** Ruta dentro de /public. `null` mientras no haya foto real. */
  src: string | null
  /** Texto que se pinta en el placeholder y describe para qué es el hueco. */
  purpose: { es: string; en: string }
  /** Atributo alt cuando ya hay foto. */
  alt: { es: string; en: string }
  /** Tamaño recomendado del fichero, en píxeles. */
  width: number
  height: number
  /** Proporción CSS, p. ej. '4 / 3'. */
  ratio: string
  tone: ImageTone
}

/** Un tramo horario: ['13:00', '16:00']. */
export type TimeRange = [string, string]

export interface DaySchedule {
  /** Día según Date#getDay(): 0 = domingo … 6 = sábado. */
  day: number
  ranges: TimeRange[]
}

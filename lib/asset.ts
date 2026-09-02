import { BASE_PATH } from '@/content/site'

/**
 * Antepone la ruta base a una ruta absoluta del propio sitio.
 *
 * Next.js prefija solo lo suyo: los ficheros de `_next/` y los `href` de
 * `next/link`. NO toca las rutas escritas a mano —un `<img src="/images/x.jpg">`,
 * los iconos declarados en `metadata` o la imagen de Open Graph—, así que esas
 * hay que pasarlas por aquí o darán 404 al publicar en un subdirectorio.
 *
 *   asset('/og.png')  →  '/koi-taberna/og.png'   (con ruta base)
 *   asset('/og.png')  →  '/og.png'               (en la raíz del dominio)
 *
 * Las URLs externas (wa.me, tel:, Google Maps, Instagram) se devuelven intactas.
 */
export function asset(path: string): string {
  if (!path.startsWith('/')) return path
  return `${BASE_PATH}${path}`
}

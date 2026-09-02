/**
 * Ruta base cuando el sitio NO se sirve en la raíz del dominio.
 *
 *   GitHub Pages de proyecto  →  NEXT_PUBLIC_BASE_PATH=/koi-taberna
 *   Dominio propio o raíz     →  dejarlo sin definir
 *
 * Sin barra final. Se lee también desde el navegador (por eso NEXT_PUBLIC_).
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/**
 * Normalización obligatoria: `actions/configure-pages` devuelve `/` para los
 * sitios de usuario, y Next se niega a arrancar si la ruta base acaba en barra.
 * Aquí `/` y `''` acaban siendo lo mismo: sitio en la raíz.
 */
const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/+$/, '')

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,

  // El valor ya normalizado se inyecta en el paquete del navegador, para que
  // `asset()` y `next build` usen exactamente la misma cadena.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // Exportación estática: `npm run build` genera la carpeta `out/`,
  // subible tal cual a Netlify, Vercel, Cloudflare Pages o un hosting clásico.
  output: 'export',

  // Sin servidor no hay optimizador de imágenes: se sirven los ficheros tal cual.
  images: { unoptimized: true },

  // `/carta` -> `out/carta/index.html`. Necesario para hostings sin reescrituras.
  trailingSlash: true,
}

export default nextConfig

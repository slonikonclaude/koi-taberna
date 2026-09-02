# Koi Taberna Japonesa — sitio web

Sitio de una sola página con carta aparte para **Koi Taberna Japonesa**
(Carrer Catalunya, 4 — Puerto de Sagunto, Valencia).

Next.js 15 (App Router) + Tailwind v4 + TypeScript. Se compila a **HTML
estático**: no hay servidor, ni base de datos, ni panel de administración.

---

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
```

## Compilar y previsualizar

```bash
npm run build      # genera la carpeta out/ con el sitio estático
npm run preview    # sirve out/ en local para comprobarlo antes de subir
npm run typecheck  # comprueba los tipos sin compilar
```

---

## ⚠️ Antes de publicar: qué hay que sustituir sí o sí

| Qué | Dónde | Estado |
| --- | --- | --- |
| `RESERVATION_PHONE` | `content/site.ts` | Número correcto, **falta confirmar que tiene WhatsApp**. Si no lo tiene → `WHATSAPP_ENABLED = false` y el botón desaparece solo. |
| `DELIVERY_URL` | `content/site.ts` | Apunta a la portada de Glovo. Hay que poner la URL de la ficha del restaurante. |
| `SITE_ORIGIN` | `content/site.ts` | Ahora `https://koitaberna.es`. Poner el dominio real (afecta a canonical, sitemap, JSON-LD y Open Graph). En GitHub Pages lo pone solo el workflow. |
| Datos de la empresa | `content/legal.ts` | Todo lo que está `[ENTRE CORCHETES]`: razón social, NIF, domicilio fiscal, correo de contacto, datos registrales. |
| `LEGAL_UPDATED` | `content/legal.ts` | Fecha real de publicación de los textos legales. |
| Puntuación de las reseñas | `content/site.ts` → `reviews.items[].rating` | Están a 5 ★. Comprobar en Google la nota exacta de cada una. |
| Etiquetas vegano/vegetariano | `content/menu.ts` | Marcadas solo las inequívocas. Confirmar con el restaurante, sobre todo kimchi y boniato. |

Todos estos puntos están marcados con `TODO:` en el código.

---

## Dónde se cambia cada cosa

Ningún texto vive dentro de un componente. Todo está en `content/`:

| Fichero | Qué contiene |
| --- | --- |
| `content/site.ts` | Constantes de configuración, datos del negocio, **horario** y todos los textos en español. |
| `content/site.en.ts` | Los mismos textos en inglés. Está tipado contra el español: si falta una clave, `npm run typecheck` avisa. |
| `content/menu.ts` | La carta: categorías, platos, descripciones, **precios** y etiquetas. |
| `content/menu.en.ts` | Solo los nombres y descripciones en inglés. Los precios no se duplican aquí. |
| `content/images.ts` | Los huecos de foto. |
| `content/legal.ts` | Aviso legal, privacidad y cookies. |
| `content/types.ts` | Los tipos que usan los anteriores. |

### El horario

Se edita **en un solo sitio**, `OPENING_HOURS` en `content/site.ts`. De ahí salen
automáticamente la tabla de la web, el indicador de «Abierto ahora», las horas
disponibles del formulario de reserva y el `openingHoursSpecification` del
JSON-LD para Google. No hay que tocar nada más.

### Los precios

Hoy **no hay ni un precio inventado**: el restaurante no publica carta con
precios fuera de las apps de reparto, así que todos los `price` valen `null` y
la columna está oculta.

Para activarlos:

1. En `content/menu.ts`, poner el importe en euros de cada plato:
   `price: 12.5`.
2. En `content/site.ts`, cambiar `SHOW_PRICES` a `true`.

Con `SHOW_PRICES = true`, los platos que sigan a `null` muestran un guion
discreto en lugar del precio, así que se puede ir rellenando poco a poco.

### Las fotos

1. Copia el fichero en `public/images/`.
2. Abre `content/images.ts` y escribe la ruta en el hueco:
   `src: '/images/hero.jpg'`.
3. Ajusta `width` y `height` al tamaño real del fichero (evita saltos de
   maquetación) y revisa el `alt`.

Mientras `src` sea `null` se dibuja un marcador de la propia marca —degradado,
patrón seigaiha y la etiqueta de para qué es el hueco— para que la maqueta se
vea terminada sin fotos. Recomendado: `.webp` o `.jpg`, lado largo de 1000 a
1600 px.

### El logotipo

`components/brand/KoiMark.tsx` y `public/icon.svg` llevan una carpa dibujada a
mano como sustituto provisional. Cuando llegue el logotipo definitivo (la carpa
comiendo ramen del bol), basta con reemplazar esos dos ficheros; nada más los
usa.

`public/og.png` y `public/apple-icon.png` se generaron con los elementos de
marca. Si cambia el logotipo, conviene rehacerlos con las mismas medidas
(1200×630 y 180×180).

---

## Cómo funciona lo que no es obvio

**Reservas sin servidor.** El formulario no envía nada a ningún sitio: compone
un mensaje en español y abre `wa.me` para que sea la persona quien lo envíe.
Al lado siempre hay un botón de llamar, que en móvil es el que más se usa. Las
horas del desplegable salen del horario real y el último pase se corta 60
minutos antes del cierre (`LAST_SEATING_MINUTES_BEFORE_CLOSE`).

**Idiomas.** Diccionario de textos y un interruptor, sin librería de i18n y sin
rutas separadas. El HTML estático se genera en español —que es lo que indexa
Google— y el inglés se aplica en el navegador. La preferencia se guarda en
`localStorage`.

**Mapa.** No se carga el iframe de Google de entrada: se muestra una tarjeta
propia y el mapa solo se carga si se pulsa el botón. Así la página no arrastra
peso ni cookies de terceros que nadie ha pedido.

**Diálogo de reserva.** Es el `<dialog>` nativo del navegador: trampa de foco,
cierre con Esc y fondo inerte sin una sola línea de JavaScript para ello.

---

## Publicar en GitHub Pages

Ya está todo preparado: `.github/workflows/deploy.yml` compila y publica en
cada `push` a `main`.

### Pasos, en orden

1. **El repositorio tiene que ser público.** En el plan gratuito de GitHub,
   Pages solo funciona con repos públicos.

2. Subir el proyecto (incluido `package-lock.json`, que el workflow necesita
   para `npm ci`):

   ```bash
   git init
   git add .
   git commit -m "Sitio de Koi Taberna"
   git branch -M main
   git remote add origin https://github.com/USUARIO/koi-taberna.git
   git push -u origin main
   ```

3. En GitHub: **Settings → Pages → Build and deployment → Source:
   «GitHub Actions»**. Este paso es obligatorio y hay que hacerlo a mano; si
   se queda en «Deploy from a branch», el workflow falla.

4. **Actions → Deploy to GitHub Pages → Run workflow** (o esperar al siguiente
   `push`). Tarda un par de minutos.

5. La URL sale al final del job `deploy`:
   `https://USUARIO.github.io/koi-taberna/`.

### La ruta base se resuelve sola

Es el punto donde más gente se atasca. Si el sitio vive en
`usuario.github.io/koi-taberna/`, todo lo que apunte a `/algo` se rompe.

Aquí lo resuelve `NEXT_PUBLIC_BASE_PATH`, que el workflow saca de
`actions/configure-pages`. Funciona sin tocar nada en los tres casos:

| Dónde se publica | `base_path` | Resultado |
| --- | --- | --- |
| Repo `koi-taberna` | `/koi-taberna` | Todo bajo `/koi-taberna/` |
| Repo `USUARIO.github.io` | `/` | `next.config.mjs` lo normaliza a `''` |
| Dominio propio | `/` | Igual, sitio en la raíz |

Next.js **solo** prefija lo suyo: los ficheros de `_next/` y los `href` de
`next/link`. No toca las rutas escritas a mano. Por eso los iconos, la imagen
de Open Graph, las fotos de `content/images.ts` y los enlaces de vuelta a la
portada pasan por `asset()` (`lib/asset.ts`). **Si añades una ruta absoluta
nueva a mano, envuélvela en `asset()`** o dará 404 al publicar.

### Comprobar en local antes de subir

```bash
npm run build && npm run preview     # sitio en la raíz, http://localhost:3000
```

Para ver cómo queda con subcarpeta (PowerShell):

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/koi-taberna'
$env:NEXT_PUBLIC_SITE_URL='https://USUARIO.github.io'
npm run build
```

Los enlaces del HTML generado deben empezar todos por `/koi-taberna/`.
Ojo: `npm run preview` sirve en la raíz, así que un build con subcarpeta se
verá sin estilos en local. Eso es normal y en Pages funciona.

### Dominio propio

1. **Settings → Pages → Custom domain**, escribir el dominio y guardar.
2. En el DNS del dominio, un `CNAME` de `www` a `USUARIO.github.io`, o cuatro
   registros `A` a las IP de GitHub Pages si es un dominio sin `www`.
3. Marcar **Enforce HTTPS** cuando GitHub termine de emitir el certificado.
4. Volver a lanzar el workflow: `configure-pages` ya devolverá el dominio
   nuevo y el sitio se recompila con las URLs correctas.

Alternativa sin tocar la interfaz: crear `public/CNAME` con el dominio dentro.
`next build` copia `public/` entera a `out/`.

### Por qué hay un `.nojekyll`

GitHub Pages ignora las carpetas que empiezan por guion bajo, y Next publica
todo el JS y el CSS en `_next/`. Sin ese fichero el sitio sale sin estilos.
Está en `public/.nojekyll` y el workflow además lo vuelve a crear.

### Verificar que ha salido bien

- La portada carga **con estilos** (si se ve texto plano, es el `.nojekyll`).
- El favicon aparece en la pestaña.
- `/carta/` abre y el botón «Volver al inicio» funciona.
- Desde `/carta/`, los enlaces del menú vuelven a la portada y bajan a la
  sección correcta.
- Pegar la URL en un chat de WhatsApp: tiene que salir la tarjeta con
  `og.png`. Si no sale, la caché del rastreador tarda; forzarlo con el
  depurador de Facebook.
- Abrir `.../sitemap.xml`: las URLs deben llevar el dominio y la subcarpeta
  reales, no `koitaberna.es`.

### Otros hostings

`npm run build` deja el sitio entero en `out/`. Sin `NEXT_PUBLIC_BASE_PATH`
sale para servir en la raíz del dominio:

- **Netlify** — comando `npm run build`, carpeta de publicación `out`.
- **Cloudflare Pages** — comando `npm run build`, directorio `out`.
- **Vercel** — detecta Next.js solo.
- **Hosting clásico (FTP)** — subir el contenido de `out/` a la raíz. Como
  `trailingSlash` está activado, cada página es una carpeta con su
  `index.html` y funciona sin reescrituras.

Con el dominio definitivo ya en marcha:

- Dar de alta el sitio en Google Search Console y enviar el `sitemap.xml`.
- Comprobar el JSON-LD en la prueba de resultados enriquecidos de Google.
- Enlazar la web desde la ficha de Google Maps y desde la biografía de
  Instagram.

---

## Estructura

```
app/            rutas y metadatos (/, /carta, legales, sitemap, robots)
components/
  brand/        carpa y olas seigaiha
  layout/       cabecera, pie, barra móvil, cambio de idioma
  menu/         la carta
  reserve/      diálogo de reserva
  sections/     bloques de la portada
  ui/           botones, huecos de foto, títulos, estrellas
content/        TODOS los textos, la carta, el horario y las fotos
lib/            idiomas, horarios, huecos de reserva, JSON-LD, formatos
public/         imágenes, iconos y og.png
```

## Qué no lleva, a propósito

Sin pago en línea, sin carrito, sin cuentas de usuario, sin blog, sin
formulario de suscripción y sin chat. Y ningún dato inventado: no hay precios,
ni año de fundación, ni nombre de chef, ni historia del local, porque no están
confirmados.

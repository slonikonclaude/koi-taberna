import type { DaySchedule } from './types'

/* ==========================================================================
   1. CONFIGURACIÓN — revisar antes de publicar
   ========================================================================== */

/**
 * Teléfono del restaurante en formato E.164, sin espacios.
 * Se usa para `tel:` y para el enlace de WhatsApp.
 *
 * TODO: confirmar que este número tiene WhatsApp activo.
 * Si NO lo tiene, poner WHATSAPP_ENABLED = false y el botón de WhatsApp
 * desaparece solo; queda únicamente «Llamar».
 */
export const RESERVATION_PHONE = '+34962077577'

/** El mismo número, formateado para leerlo en pantalla. */
export const RESERVATION_PHONE_DISPLAY = '+34 962 077 577'

/** Interruptor del botón de WhatsApp. Ver la nota de RESERVATION_PHONE. */
export const WHATSAPP_ENABLED = true

/**
 * TODO: sustituir por la URL directa del restaurante en Glovo.
 * Ahora apunta a la portada de Glovo España como marcador de posición.
 * Se encuentra buscando «Koi Taberna» en Glovo → copiar la URL de la ficha.
 */
export const DELIVERY_URL = 'https://glovoapp.com/es/es/'

/** Poner en false si en algún momento el restaurante deja de repartir. */
export const DELIVERY_ENABLED = true

/**
 * Precios. Hoy el restaurante no publica carta con precios en ningún sitio
 * salvo las apps de reparto, así que no hay ni una cifra inventada en el
 * proyecto: todos los `price` de `content/menu.ts` valen `null`.
 *
 * false → la columna de precios no se pinta y la maqueta queda cerrada.
 * true  → cada plato muestra su precio; los que sigan a `null` muestran «—».
 *
 * TODO: rellenar precios en `content/menu.ts` y poner esto a true.
 */
export const SHOW_PRICES = false

/**
 * Origen del sitio: esquema + dominio, sin barra final y SIN la ruta base.
 *
 * TODO: sustituir por el dominio real (o definir NEXT_PUBLIC_SITE_URL al compilar).
 * En GitHub Pages de proyecto sería, por ejemplo, 'https://USUARIO.github.io'.
 */
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://koitaberna.es'

/**
 * Ruta base cuando el sitio no vive en la raíz del dominio.
 * GitHub Pages de proyecto → '/koi-taberna'. Dominio propio → ''.
 * Se define al compilar con NEXT_PUBLIC_BASE_PATH; ver next.config.mjs.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** URL pública de la portada, ya con la ruta base. Sin barra final. */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`

/* ==========================================================================
   2. DATOS DEL NEGOCIO — verificados, no tocar sin comprobar la fuente
   ========================================================================== */

export const BUSINESS = {
  name: 'Koi Taberna Japonesa',
  shortName: 'Koi Taberna',
  street: 'Carrer Catalunya, 4',
  postalCode: '46520',
  city: 'Port de Sagunt',
  cityAlt: 'Puerto de Sagunto',
  region: 'Valencia',
  country: 'ES',
  countryName: 'España',
  lat: 39.6616839,
  lng: -0.2113238,
  plusCode: 'MQ6Q+MF Puerto de Sagunto',
  instagram: 'https://instagram.com/koitaberna',
  instagramHandle: '@koitaberna',
  instagramFollowers: 3167,
  mapsUrl: 'https://maps.app.goo.gl/uCLjt124pWe4qz4g9',
  rating: 4.6,
  reviewCount: 296,
  priceRange: '€€',
  pricePerPerson: '10–20 €',
} as const

/** Dirección en una línea, tal como se lee en la web. */
export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city} (${BUSINESS.cityAlt}), ${BUSINESS.region}`

/** «Cómo llegar»: abre la navegación de Google Maps hacia las coordenadas. */
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.lat},${BUSINESS.lng}`

/** Mapa incrustado. Se carga solo cuando el visitante pulsa «Ver el mapa». */
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${BUSINESS.lat},${BUSINESS.lng}&z=17&output=embed`

/**
 * Horario real. Fuente única: alimenta la tabla, los huecos de reserva,
 * el indicador «abierto ahora» y el JSON-LD. Editar solo aquí.
 * day: 0 = domingo … 6 = sábado.
 */
export const OPENING_HOURS: DaySchedule[] = [
  { day: 1, ranges: [['13:00', '16:00'], ['20:00', '23:00']] }, // lunes
  { day: 2, ranges: [['13:00', '16:00'], ['20:00', '23:00']] },
  { day: 3, ranges: [['13:00', '16:00'], ['20:00', '23:00']] },
  { day: 4, ranges: [['13:00', '16:00'], ['20:00', '23:00']] },
  { day: 5, ranges: [['13:00', '16:00'], ['20:00', '23:30']] }, // viernes
  { day: 6, ranges: [['13:00', '16:00'], ['20:00', '23:30']] }, // sábado
  { day: 0, ranges: [['13:00', '16:00'], ['20:00', '23:00']] }, // domingo
]

/** Zona horaria del local: el estado «abierto ahora» no depende del visitante. */
export const TIMEZONE = 'Europe/Madrid'

/** Un hueco de reserva cada 30 minutos. */
export const SLOT_STEP_MINUTES = 30

/**
 * Último pase: 60 minutos antes del cierre.
 * TODO: confirmar con el restaurante a qué hora aceptan la última mesa.
 */
export const LAST_SEATING_MINUTES_BEFORE_CLOSE = 60

/* ==========================================================================
   3. TEXTOS EN ESPAÑOL (idioma por defecto)
   ========================================================================== */

export const siteEs = {
  meta: {
    home: {
      title: 'Koi Taberna Japonesa | Ramen, sushi y bao en Puerto de Sagunto',
      description:
        'Taberna japonesa en Puerto de Sagunto: ramen de caldo largo, sushi fresco y bao esponjosos en una sala decorada con anime y manga. 4,6 ★ en Google.',
    },
    carta: {
      title: 'Carta | Koi Taberna Japonesa — Puerto de Sagunto',
      description:
        'Entrantes, bao, ramen, sushi y postres de Koi Taberna Japonesa en Puerto de Sagunto. Opciones veganas y vegetarianas. Reserva por WhatsApp o teléfono.',
    },
  },

  nav: {
    about: 'Nosotros',
    dishes: 'Platos',
    reviews: 'Reseñas',
    gallery: 'Galería',
    visit: 'Visítanos',
    carta: 'Carta',
    openMenu: 'Abrir el menú de navegación',
    closeMenu: 'Cerrar el menú de navegación',
    mainNav: 'Navegación principal',
    footerNav: 'Navegación del pie',
    langLabel: 'Idioma',
    switchToEn: 'Cambiar a inglés',
    switchToEs: 'Cambiar a español',
    skipToContent: 'Saltar al contenido',
  },

  actions: {
    reserve: 'Reservar',
    reserveTable: 'Reservar mesa',
    viewMenu: 'Ver la carta',
    directions: 'Cómo llegar',
    call: 'Llamar',
    whatsapp: 'Enviar por WhatsApp',
    delivery: 'Pedir en Glovo',
    openMaps: 'Abrir en Google Maps',
    showMap: 'Ver el mapa',
    allReviews: 'Ver las reseñas en Google',
    backHome: 'Volver al inicio',
    instagram: 'Ver Instagram',
  },

  hero: {
    eyebrow: 'Taberna japonesa · Puerto de Sagunto',
    title: 'Koi Taberna Japonesa',
    tagline: 'Ramen, sushi y bao en una sala llena de anime.',
    intro:
      'Caldos que se cuecen despacio, pescado fresco y bollos al vapor. Se come tranquilo, entre figuras de manga, y se sale con ganas de volver.',
    ratingSuffix: 'reseñas en Google',
  },

  about: {
    eyebrow: 'Nosotros',
    title: 'Cocina de casa, sala de anime',
    paragraphs: [
      'El ramen se hace aquí. Los caldos cuecen durante horas hasta quedar densos y con cuerpo, y llegan a la mesa con los fideos justos, el pato o la ternera encima y nada de adorno de más.',
      'Al lado, sushi con pescado fresco, bao al vapor bien esponjosos y una barra larga de entrantes: takoyaki, karaage, edamame, algas. Hay bastantes platos veganos y vegetarianos, no como excepción sino como parte de la carta.',
      'Y luego está la sala: figuras grandes de anime y manga —Totoro incluido, el de las fotos—, cojines en los bancos y hasta los baños decorados. Es un sitio tranquilo, con trato cercano, donde se está a gusto sin prisa.',
    ],
  },

  popular: {
    eyebrow: 'Platos',
    title: 'Lo que más se pide',
    subtitle: 'Selección corta. La carta completa está a un clic.',
    mostOrdered: 'Lo más pedido',
    cta: 'Ver la carta completa',
  },

  amenities: {
    eyebrow: 'El local',
    title: 'Todo listo para que vengas como quieras',
    items: [
      { icon: 'wifi', label: 'Wi-Fi gratis' },
      { icon: 'leaf', label: 'Opciones veganas y vegetarianas' },
      { icon: 'dog', label: 'Se admiten perros' },
      { icon: 'accessibility', label: 'Entrada y aseo accesibles' },
      { icon: 'card', label: 'Tarjeta y pago sin contacto' },
      { icon: 'baby', label: 'Apto para niños' },
      { icon: 'bar', label: 'Barra' },
      { icon: 'heart', label: 'Espacio LGBTQ+ friendly' },
    ],
    footnote: 'Negocio regentado por una mujer. Se recomienda reservar.',
  },

  reviews: {
    eyebrow: 'Reseñas',
    title: 'Lo que cuenta la gente',
    subtitle: '4,6 sobre 5 con 296 reseñas en Google.',
    translatedNote: 'Reseña traducida del ruso',
    source: 'Google',
    ratingLabel: 'Valoración',
    // TODO: comprobar en Google la puntuación exacta de cada reseña.
    // De momento se muestran 5 ★; el campo está en `rating` más abajo.
    items: [
      {
        id: 'kaitlyn',
        author: 'Kaitlyn C.',
        rating: 5,
        translated: false,
        text: 'The atmosphere here is really awesome. You can tell there was a lot of effort put into it and if you watch anime this is a really cool experience. The service was great, they were really nice and made conversation and very welcoming.',
        lang: 'en',
      },
      {
        id: 'jay',
        author: 'Jay C.',
        rating: 5,
        translated: false,
        text: 'Food was really good and nice waitress. I think it’s my most favourite restaurant I have ever been to. I like that it’s quiet and the people do it from love.',
        lang: 'en',
      },
      {
        id: 'lyubov',
        author: 'Liubov R.',
        rating: 5,
        translated: true,
        text: 'A mis amigos y a mí nos gustó todo: la comida, el interior y el servicio. Volveré sin falta.',
        lang: 'es',
      },
    ],
  },

  gallery: {
    eyebrow: 'Galería',
    title: 'La sala, plato a plato',
    subtitle: 'Un vistazo al local y a lo que sale de la cocina.',
  },

  visit: {
    eyebrow: 'Visítanos',
    title: 'Horario y contacto',
    hoursTitle: 'Horario',
    todayLabel: 'Hoy',
    openNow: 'Abierto ahora',
    closedNow: 'Cerrado',
    opensAt: 'abre a las',
    closesAt: 'cierra a las',
    contactTitle: 'Dónde estamos',
    addressLabel: 'Dirección',
    phoneLabel: 'Teléfono',
    plusCodeLabel: 'Plus Code',
    coordsLabel: 'Coordenadas',
    mapCaption: 'Carrer Catalunya, 4 — Puerto de Sagunto',
    mapLoadNote: 'El mapa se carga desde Google al pulsar.',
    mapTitle: 'Mapa de Koi Taberna Japonesa',
    deliveryNote: 'También repartimos a domicilio con Glovo en Puerto de Sagunto.',
  },

  reserveCta: {
    eyebrow: 'Reservas',
    title: 'Guardamos tu mesa',
    text: 'Es un local pequeño y se llena. Escríbenos por WhatsApp o llámanos y lo dejamos apuntado.',
  },

  reserve: {
    title: 'Reservar mesa',
    subtitle:
      'Rellena los datos y se abre WhatsApp con el mensaje ya escrito. También puedes llamarnos directamente.',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    people: 'Personas',
    date: 'Fecha',
    time: 'Hora',
    phone: 'Teléfono',
    phonePlaceholder: '+34 600 000 000',
    notes: 'Comentario',
    notesPlaceholder: 'Alergias, trona, celebración…',
    optional: 'opcional',
    noSlots: 'Ese día no hay servicio a esa hora. Prueba con otra fecha.',
    closedDay: 'Elige otra fecha: ese día no abrimos.',
    close: 'Cerrar',
    errorName: 'Escribe un nombre para la reserva.',
    errorPhone: 'Escribe un teléfono de contacto.',
    errorDate: 'Elige una fecha.',
    errorTime: 'Elige una hora.',
    lunch: 'Comida',
    dinner: 'Cena',
    callInstead: 'Prefiero llamar',
    disclaimer:
      'La reserva no queda confirmada hasta que respondemos al mensaje.',
    // Plantilla del mensaje de WhatsApp. {{...}} se sustituye con los datos.
    whatsappTemplate: [
      'Hola, me gustaría reservar mesa en Koi Taberna.',
      '',
      'Nombre: {{name}}',
      'Personas: {{people}}',
      'Fecha: {{date}}',
      'Hora: {{time}}',
      'Teléfono: {{phone}}',
      '{{notes}}',
    ].join('\n'),
    whatsappNotesLine: 'Comentario: {{notes}}',
  },

  footer: {
    tagline: 'Ramen, sushi y bao en Puerto de Sagunto.',
    contact: 'Contacto',
    hours: 'Horario',
    follow: 'Síguenos',
    legal: 'Legal',
    legalLinks: {
      notice: 'Aviso legal',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
    },
    rights: 'Todos los derechos reservados.',
    credits: 'Sitio de demostración.',
  },

  menuPage: {
    eyebrow: 'Carta',
    title: 'La carta',
    subtitle:
      'Entrantes, bao, ramen, sushi y postres. Pregúntanos por alérgenos y por las opciones veganas del día.',
    jumpTo: 'Ir a la sección',
    priceNote: 'Precios orientativos: 10–20 € por persona',
    priceNoteLink: 'según Google',
    allergens:
      'Si tienes alguna alergia o intolerancia, dínoslo al reservar y lo miramos contigo.',
    priceColumn: 'Precio',
    noPrice: '—',
    tags: {
      vegano: 'Vegano',
      vegetariano: 'Vegetariano',
    },
  },

  legal: {
    lastUpdated: 'Última actualización',
    backHome: 'Volver al inicio',
  },

  common: {
    photoPrefix: 'Foto',
    loading: 'Cargando…',
    days: {
      long: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      short: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    },
    and: 'y',
    to: 'a',
  },
}

/**
 * Forma del diccionario. `content/site.en.ts` se tipa contra esto,
 * así que si añades una clave en español TypeScript te obliga a añadirla
 * también en inglés. Es intencionado.
 */
export type SiteCopy = typeof siteEs

import type { SiteCopy } from './site'

/**
 * English strings. Typed against the Spanish dictionary: if a key is missing
 * or misspelled, `npm run typecheck` fails. Spanish stays the source of truth.
 */
export const siteEn: SiteCopy = {
  meta: {
    home: {
      title: 'Koi Taberna Japonesa | Ramen, sushi and bao in Puerto de Sagunto',
      description:
        'Japanese taberna in Puerto de Sagunto: slow-simmered ramen broth, fresh sushi and fluffy bao in a room full of anime and manga. 4.6 ★ on Google.',
    },
    carta: {
      title: 'Menu | Koi Taberna Japonesa — Puerto de Sagunto',
      description:
        'Starters, bao, ramen, sushi and desserts at Koi Taberna Japonesa in Puerto de Sagunto. Vegan and vegetarian options. Book by WhatsApp or phone.',
    },
  },

  nav: {
    about: 'About',
    dishes: 'Dishes',
    reviews: 'Reviews',
    gallery: 'Gallery',
    visit: 'Visit us',
    carta: 'Menu',
    openMenu: 'Open the navigation menu',
    closeMenu: 'Close the navigation menu',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    langLabel: 'Language',
    switchToEn: 'Switch to English',
    switchToEs: 'Switch to Spanish',
    skipToContent: 'Skip to content',
  },

  actions: {
    reserve: 'Book',
    reserveTable: 'Book a table',
    viewMenu: 'See the menu',
    directions: 'Get directions',
    call: 'Call',
    whatsapp: 'Send on WhatsApp',
    delivery: 'Order on Glovo',
    openMaps: 'Open in Google Maps',
    showMap: 'Show the map',
    allReviews: 'Read the reviews on Google',
    backHome: 'Back to home',
    instagram: 'See Instagram',
  },

  hero: {
    eyebrow: 'Japanese taberna · Puerto de Sagunto',
    title: 'Koi Taberna Japonesa',
    tagline: 'Ramen, sushi and bao in a room full of anime.',
    intro:
      'Broths that simmer slowly, fresh fish and steamed buns. You eat unhurried, surrounded by manga figures, and you leave wanting to come back.',
    ratingSuffix: 'reviews on Google',
  },

  about: {
    eyebrow: 'About',
    title: 'Home cooking, anime room',
    paragraphs: [
      'The ramen is made here. The broths simmer for hours until they turn thick and full-bodied, and they reach the table with the right amount of noodles, duck or beef on top and nothing extra for show.',
      'Alongside it: sushi with fresh fish, steamed bao that are properly fluffy, and a long list of starters — takoyaki, karaage, edamame, seaweed. There are plenty of vegan and vegetarian dishes, not as an afterthought but as part of the menu.',
      'And then there is the room: large anime and manga figures — Totoro included, the one everyone photographs — cushions on the benches and even the toilets decorated. It is a quiet place, warmly run, where you can sit without rushing.',
    ],
  },

  popular: {
    eyebrow: 'Dishes',
    title: 'What people order most',
    subtitle: 'A short selection. The full menu is one click away.',
    mostOrdered: 'Most ordered',
    cta: 'See the full menu',
  },

  amenities: {
    eyebrow: 'The place',
    title: 'Set up for however you want to come',
    items: [
      { icon: 'wifi', label: 'Free Wi-Fi' },
      { icon: 'leaf', label: 'Vegan and vegetarian options' },
      { icon: 'dog', label: 'Dog friendly' },
      { icon: 'accessibility', label: 'Step-free entrance and toilet' },
      { icon: 'card', label: 'Card and contactless payment' },
      { icon: 'baby', label: 'Good for kids' },
      { icon: 'bar', label: 'Bar' },
      { icon: 'heart', label: 'LGBTQ+ friendly' },
    ],
    footnote: 'Woman-owned business. Booking recommended.',
  },

  reviews: {
    eyebrow: 'Reviews',
    title: 'What people say',
    subtitle: '4.6 out of 5 from 296 Google reviews.',
    translatedNote: 'Review translated from Russian',
    source: 'Google',
    ratingLabel: 'Rating',
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
        text: 'My friends and I liked everything: the food, the interior and the service. I will definitely be back.',
        lang: 'en',
      },
    ],
  },

  gallery: {
    eyebrow: 'Gallery',
    title: 'The room, dish by dish',
    subtitle: 'A look at the place and at what comes out of the kitchen.',
  },

  visit: {
    eyebrow: 'Visit us',
    title: 'Opening hours and contact',
    hoursTitle: 'Opening hours',
    todayLabel: 'Today',
    openNow: 'Open now',
    closedNow: 'Closed',
    opensAt: 'opens at',
    closesAt: 'closes at',
    contactTitle: 'Where we are',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    plusCodeLabel: 'Plus Code',
    coordsLabel: 'Coordinates',
    mapCaption: 'Carrer Catalunya, 4 — Puerto de Sagunto',
    mapLoadNote: 'The map loads from Google when you press.',
    mapTitle: 'Map of Koi Taberna Japonesa',
    deliveryNote: 'We also deliver with Glovo in Puerto de Sagunto.',
  },

  reserveCta: {
    eyebrow: 'Bookings',
    title: 'We will hold your table',
    text: 'It is a small place and it fills up. Message us on WhatsApp or call and we will write it down.',
  },

  reserve: {
    title: 'Book a table',
    subtitle:
      'Fill in the details and WhatsApp opens with the message already written. You can also call us directly.',
    name: 'Name',
    namePlaceholder: 'Your name',
    people: 'People',
    date: 'Date',
    time: 'Time',
    phone: 'Phone',
    phonePlaceholder: '+34 600 000 000',
    notes: 'Notes',
    notesPlaceholder: 'Allergies, high chair, celebration…',
    optional: 'optional',
    noSlots: 'There is no service at that time on that day. Try another date.',
    closedDay: 'Pick another date: we are closed that day.',
    close: 'Close',
    errorName: 'Please enter a name for the booking.',
    errorPhone: 'Please enter a contact phone number.',
    errorDate: 'Please pick a date.',
    errorTime: 'Please pick a time.',
    lunch: 'Lunch',
    dinner: 'Dinner',
    callInstead: 'I would rather call',
    disclaimer: 'The booking is not confirmed until we reply to your message.',
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
    tagline: 'Ramen, sushi and bao in Puerto de Sagunto.',
    contact: 'Contact',
    hours: 'Opening hours',
    follow: 'Follow us',
    legal: 'Legal',
    legalLinks: {
      notice: 'Legal notice',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
    },
    rights: 'All rights reserved.',
    credits: 'Demo site.',
  },

  menuPage: {
    eyebrow: 'Menu',
    title: 'The menu',
    subtitle:
      'Starters, bao, ramen, sushi and desserts. Ask us about allergens and the vegan options of the day.',
    jumpTo: 'Jump to section',
    priceNote: 'Indicative prices: €10–20 per person',
    priceNoteLink: 'according to Google',
    allergens:
      'If you have an allergy or intolerance, tell us when you book and we will go through it with you.',
    priceColumn: 'Price',
    noPrice: '—',
    tags: {
      vegano: 'Vegan',
      vegetariano: 'Vegetarian',
    },
  },

  legal: {
    lastUpdated: 'Last updated',
    backHome: 'Back to home',
  },

  common: {
    photoPrefix: 'Photo',
    loading: 'Loading…',
    days: {
      long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    and: 'and',
    to: 'to',
  },
}

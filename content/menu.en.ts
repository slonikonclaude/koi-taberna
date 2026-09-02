import type { MenuTranslation } from './types'

/**
 * English menu strings only. Prices, diet tags and ordering live in
 * `content/menu.ts` — never duplicate them here.
 *
 * Dish names that are Japanese (takoyaki, bao, ramen, nigiri…) stay as they
 * are: they read the same in both languages.
 */
export const menuEn: MenuTranslation = {
  categories: {
    entrantes: 'Starters',
    bao: 'Bao',
    ramen: 'Ramen',
    sushi: 'Sushi',
    'fuera-de-carta': 'Off-menu',
    postres: 'Desserts',
    bebidas: 'Drinks',
  },

  notes: {
    bao: 'Steamed buns, fluffy, meant to be eaten by hand.',
    ramen: 'Slow-simmered broths, made in house.',
    'fuera-de-carta': 'Ask whether it is available that day.',
  },

  items: {
    takoyaki: {
      name: 'Takoyaki with octopus (4 pcs)',
      description: 'Batter balls with octopus inside, four pieces.',
    },
    'crispy-ebi': {
      name: 'Crispy ebi',
      description: 'Battered and fried prawns.',
    },
    karaage: {
      name: 'Chicken karaage',
      description: 'Marinated fried chicken, crisp on the outside.',
    },
    edamame: {
      name: 'Sautéed edamame',
      description: 'Soy bean pods, sautéed and salted.',
    },
    'goma-wakame': {
      name: 'Goma wakame seaweed salad',
      description: 'Wakame seaweed dressed with sesame.',
    },
    kimchi: {
      name: 'Kimchi',
      description: 'Fermented cabbage, as a side.',
    },
    'boniato-boom': {
      name: 'Boniato boom',
      description: 'Fried sweet potato, sweet and crunchy.',
    },
    'bao-pato': {
      name: 'Duck bao',
      description: 'Steamed bun filled with duck.',
    },
    'bao-pollo': {
      name: 'Chicken bao',
      description: 'Steamed bun filled with chicken.',
    },
    'ramen-pato': {
      name: 'Duck ramen (200 g)',
      description: 'Thick broth, noodles and 200 g of duck.',
    },
    'ramen-ternera': {
      name: 'Beef ramen',
      description: 'House broth, noodles and beef.',
    },
    nigiris: {
      name: 'Nigiri',
      description: 'Rice bites topped with fresh fish.',
    },
    uramakis: {
      name: 'Uramaki',
      description: 'Rolls with the rice on the outside.',
    },
    'katsudon-premium': {
      name: 'Premium katsudon',
      description: 'Crispy chicken with egg and vegetables.',
    },
    dorayaki: {
      name: 'Dorayaki',
      description: 'Two Japanese pancakes with a filling.',
    },
    mochi: {
      name: 'Mochi',
      description: 'Glutinous rice bites, to finish.',
    },
    cerveza: {
      name: 'Beer',
      description: 'Served properly cold.',
    },
    vino: {
      name: 'Wine',
      description: 'Ask us about the selection.',
    },
  },
}

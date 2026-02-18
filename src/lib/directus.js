import { createDirectus, rest } from '@directus/sdk';

// Замени на URL твоего Directus
const DIRECTUS_URL = 'https://directus.iliev.click'; 

export const directus = createDirectus(DIRECTUS_URL).with(rest());

// Хелпер для получения URL картинки
export const getAssetUrl = (id) => {
  if (!id) return '';
  return `${DIRECTUS_URL}/assets/${id}`;
}
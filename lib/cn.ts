import clsx, { type ClassValue } from 'clsx'

/** Une clases condicionales sin ternarios anidados en el JSX. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

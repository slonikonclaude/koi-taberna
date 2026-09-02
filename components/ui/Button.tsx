import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'onDark' | 'onDarkOutline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold ' +
  'leading-none whitespace-nowrap cursor-pointer select-none ' +
  'transition-[transform,background-color,border-color,color] duration-150 ease-out ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55'

const VARIANTS: Record<ButtonVariant, string> = {
  // Naranja profundo: 4,98:1 con texto blanco, el naranja de marca no llega a AA.
  primary: 'bg-koi-deep text-white hover:bg-koi-press',
  secondary: 'border-2 border-ink/25 bg-transparent text-ink hover:border-ink/60 hover:bg-ink/5',
  onDark: 'bg-cream text-wave-deep hover:bg-white',
  onDarkOutline:
    'border-2 border-cream/35 text-cream hover:border-cream/70 hover:bg-cream/10',
  ghost: 'bg-transparent text-ink hover:bg-ink/8',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base sm:text-lg',
}

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className)
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

/** Para navegar. Nunca uses <Button> con un onClick que cambie de página. */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  )
}

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

export function Eyebrow({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]',
        tone === 'dark' ? 'text-gold' : 'text-muted',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-px w-7', tone === 'dark' ? 'bg-gold/70' : 'bg-line-strong/60')}
      />
      {children}
    </p>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
  /** Contenido a la derecha del título en pantallas anchas (botones, enlaces). */
  aside?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = 'light',
  align = 'left',
  className,
  aside,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'text-center')}>
        {eyebrow && (
          <Eyebrow tone={tone} className={cn('mb-4', align === 'center' && 'justify-center')}>
            {eyebrow}
          </Eyebrow>
        )}
        <h2
          className={cn(
            'text-[clamp(1.9rem,5vw,3.1rem)] font-bold leading-[1.06]',
            tone === 'dark' ? 'text-cream' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mt-4 text-base leading-relaxed sm:text-lg',
              tone === 'dark' ? 'text-cream/80' : 'text-muted',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}

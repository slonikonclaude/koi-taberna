import { BUSINESS } from '@/content/site'
import { cn } from '@/lib/cn'
import { KoiMark } from '../brand/KoiMark'

/** Marca de la cabecera y del pie. El nombre no se traduce nunca. */
export function Logo({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <KoiMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex min-w-0 flex-col leading-none" translate="no">
        <span
          className={cn(
            'font-display text-[1.05rem] font-extrabold tracking-tight sm:text-lg',
            tone === 'dark' ? 'text-cream' : 'text-ink',
          )}
        >
          {BUSINESS.shortName}
        </span>
        <span
          className={cn(
            'mt-1 text-[0.58rem] uppercase tracking-[0.2em]',
            tone === 'dark' ? 'text-cream/65' : 'text-muted',
          )}
        >
          Japonesa · {BUSINESS.city}
        </span>
      </span>
    </span>
  )
}

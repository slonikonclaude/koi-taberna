'use client'

import { Navigation } from 'lucide-react'
import { DIRECTIONS_URL } from '@/content/site'
import { useLang } from '@/lib/i18n'
import { useReserve } from '../reserve/ReserveProvider'
import { Button, ButtonLink } from '../ui/Button'

/**
 * Barra fija de móvil. Casi todo el tráfico llega de Instagram, en el teléfono
 * y con una sola mano: las dos acciones que importan quedan siempre a la vista.
 */
export function MobileBar() {
  const { t } = useLang()
  const { open } = useReserve()

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-cream/95 backdrop-blur-lg md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex gap-2 px-4 py-2.5">
        <Button className="flex-1" onClick={open}>
          {t.actions.reserve}
        </Button>
        <ButtonLink
          variant="secondary"
          className="flex-1"
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation size={17} aria-hidden="true" />
          {t.actions.directions}
        </ButtonLink>
      </div>
    </div>
  )
}

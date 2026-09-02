'use client'

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react'
import { ReserveDialog } from './ReserveDialog'

/**
 * El diálogo de reserva vive una sola vez, en el layout, y cualquier botón de
 * la página lo abre con `useReserve().open()`.
 *
 * Se usa el <dialog> nativo: trampa de foco, cierre con Esc y fondo inerte
 * salen gratis, sin librería ni JavaScript propio para gestionarlo.
 */

interface ReserveContextValue {
  open: () => void
  close: () => void
}

const ReserveContext = createContext<ReserveContextValue | null>(null)

export function ReserveProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = useCallback(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const close = useCallback(() => dialogRef.current?.close(), [])

  const value = useMemo(() => ({ open, close }), [open, close])

  return (
    <ReserveContext.Provider value={value}>
      {children}
      <ReserveDialog dialogRef={dialogRef} />
    </ReserveContext.Provider>
  )
}

export function useReserve(): ReserveContextValue {
  const context = useContext(ReserveContext)
  if (!context) throw new Error('useReserve debe usarse dentro de <ReserveProvider>')
  return context
}

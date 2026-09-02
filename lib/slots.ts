import {
  LAST_SEATING_MINUTES_BEFORE_CLOSE,
  OPENING_HOURS,
  SLOT_STEP_MINUTES,
} from '@/content/site'
import { toMinutes, toTime } from './hours'

export interface SlotGroup {
  /** 'lunch' para el primer servicio del día, 'dinner' para el segundo. */
  kind: 'lunch' | 'dinner'
  times: string[]
}

/** 'YYYY-MM-DD' → día de la semana, sin que el huso del navegador lo mueva. */
function weekdayFromIso(iso: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  const [, y, m, d] = match
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d))).getUTCDay()
}

/**
 * Horas reservables de una fecha concreta.
 * Solo salen huecos dentro del horario real, y el último pase se corta
 * LAST_SEATING_MINUTES_BEFORE_CLOSE antes de cerrar.
 */
export function slotsForDate(iso: string): SlotGroup[] {
  const weekday = weekdayFromIso(iso)
  if (weekday === null) return []

  const schedule = OPENING_HOURS.find((d) => d.day === weekday)
  if (!schedule) return []

  return schedule.ranges
    .map((range, index): SlotGroup => {
      const start = toMinutes(range[0])
      const lastSeating = toMinutes(range[1]) - LAST_SEATING_MINUTES_BEFORE_CLOSE
      const times: string[] = []
      for (let m = start; m <= lastSeating; m += SLOT_STEP_MINUTES) times.push(toTime(m))
      return { kind: index === 0 ? 'lunch' : 'dinner', times }
    })
    .filter((group) => group.times.length > 0)
}

/** Fecha de hoy en formato 'YYYY-MM-DD', en hora local del visitante. */
export function todayIso(): string {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

/** 'YYYY-MM-DD' → '24/12/2026'. Formato español para el mensaje de WhatsApp. */
export function formatIsoDate(iso: string, locale = 'es-ES'): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return iso
  const [, y, m, d] = match
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(Number(y), Number(m) - 1, Number(d)))
}

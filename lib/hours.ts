import { OPENING_HOURS, TIMEZONE } from '@/content/site'
import type { TimeRange } from '@/content/types'

/** Orden de lectura de la tabla: de lunes a domingo. */
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
}

/** '20:30' → 1230 minutos desde medianoche. */
export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/** 1230 → '20:30'. */
export function toTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function sameRanges(a: TimeRange[], b: TimeRange[]): boolean {
  return a.length === b.length && a.every((r, i) => r[0] === b[i][0] && r[1] === b[i][1])
}

export interface HourGroup {
  /** Índices de día (Date#getDay) que comparten el mismo horario. */
  days: number[]
  ranges: TimeRange[]
}

/**
 * Agrupa días consecutivos con horario idéntico.
 * Con el horario actual devuelve: lunes–jueves, viernes–sábado, domingo.
 */
export function hourGroups(): HourGroup[] {
  const groups: HourGroup[] = []
  for (const day of DISPLAY_ORDER) {
    const ranges = OPENING_HOURS.find((d) => d.day === day)?.ranges ?? []
    const last = groups[groups.length - 1]
    if (last && sameRanges(last.ranges, ranges)) last.days.push(day)
    else groups.push({ days: [day], ranges })
  }
  return groups
}

export interface LabelledHourGroup extends HourGroup {
  label: string
}

/** Los mismos grupos, con la etiqueta ya traducida: «Lunes – Jueves». */
export function labelledHourGroups(dayNames: string[]): LabelledHourGroup[] {
  return hourGroups().map((group) => ({
    ...group,
    label:
      group.days.length === 1
        ? dayNames[group.days[0]]
        : `${dayNames[group.days[0]]} – ${dayNames[group.days[group.days.length - 1]]}`,
  }))
}

export interface Clock {
  /** Día de la semana en el huso del restaurante. */
  day: number
  /** Minutos desde medianoche en el huso del restaurante. */
  minutes: number
}

/**
 * Hora actual **en el restaurante**, no en el dispositivo del visitante.
 * Importa: mucho tráfico llega de fuera de España.
 */
export function restaurantClock(now: Date = new Date()): Clock {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = WEEKDAY_INDEX[get('weekday')] ?? now.getDay()
  const hour = Number(get('hour')) % 24
  return { day, minutes: hour * 60 + Number(get('minute')) }
}

export interface OpenState {
  open: boolean
  /** Hora del próximo cambio de estado: cierre si está abierto, apertura si no. */
  nextChange: string | null
}

/** ¿Está abierto ahora mismo? Se calcula sobre OPENING_HOURS. */
export function openState(clock: Clock): OpenState {
  const today = OPENING_HOURS.find((d) => d.day === clock.day)

  if (today) {
    for (const [from, to] of today.ranges) {
      if (clock.minutes >= toMinutes(from) && clock.minutes < toMinutes(to)) {
        return { open: true, nextChange: to }
      }
    }
    const upcoming = today.ranges
      .map((r) => r[0])
      .find((start) => toMinutes(start) > clock.minutes)
    if (upcoming) return { open: false, nextChange: upcoming }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = OPENING_HOURS.find((d) => d.day === (clock.day + offset) % 7)
    if (next && next.ranges.length > 0) return { open: false, nextChange: next.ranges[0][0] }
  }

  return { open: false, nextChange: null }
}

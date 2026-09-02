'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
  type RefObject,
} from 'react'
import { Phone, X } from 'lucide-react'
import {
  RESERVATION_PHONE,
  RESERVATION_PHONE_DISPLAY,
  WHATSAPP_ENABLED,
} from '@/content/site'
import { formatIsoDate, slotsForDate, todayIso } from '@/lib/slots'
import { LOCALES, useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { Button } from '../ui/Button'
import { KoiMark } from '../brand/KoiMark'

const FIELD =
  'h-12 w-full rounded-xl border-2 border-line-strong/45 bg-white px-3.5 text-base text-ink ' +
  'placeholder:text-muted/85 transition-colors duration-150 ease-out hover:border-line-strong ' +
  'focus:border-wave'

const LABEL = 'mb-1.5 block text-sm font-medium text-ink'

/** Flecha del desplegable: los <select> nativos no se pueden estilar de otra forma. */
const SELECT_STYLE: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235A5048' stroke-width='2' stroke-linecap='round'><path d='M6 9l6 6 6-6'/></svg>\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.85rem center',
  backgroundSize: '1.1rem',
}

/** wa.me solo acepta dígitos. */
const WHATSAPP_NUMBER = RESERVATION_PHONE.replace(/\D/g, '')

type FieldName = 'name' | 'phone' | 'date' | 'time'

export function ReserveDialog({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement | null> }) {
  const { t } = useLang()

  const [name, setName] = useState('')
  const [people, setPeople] = useState('2')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [minDate, setMinDate] = useState('')

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLSelectElement>(null)

  // La fecha de hoy se resuelve después de montar: calcularla al renderizar
  // haría que el HTML estático y el del cliente no coincidiesen.
  useEffect(() => {
    const today = todayIso()
    setMinDate(today)
    setDate((current) => current || today)
  }, [])

  const slotGroups = useMemo(() => (date ? slotsForDate(date) : []), [date])
  const availableTimes = useMemo(() => slotGroups.flatMap((group) => group.times), [slotGroups])

  // Si al cambiar de día la hora elegida deja de existir, se limpia.
  useEffect(() => {
    setTime((current) => (current && availableTimes.includes(current) ? current : ''))
  }, [availableTimes])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const found: Partial<Record<FieldName, string>> = {}
    if (!name.trim()) found.name = t.reserve.errorName
    if (!phone.trim()) found.phone = t.reserve.errorPhone
    if (!date) found.date = t.reserve.errorDate
    if (!time) found.time = t.reserve.errorTime
    setErrors(found)

    const order: FieldName[] = ['name', 'phone', 'date', 'time']
    const firstInvalid = order.find((field) => found[field])
    if (firstInvalid) {
      const element = { name: nameRef, phone: phoneRef, date: dateRef, time: timeRef }[firstInvalid]
        .current
      element?.focus()
      return
    }

    const notesLine = notes.trim()
      ? t.reserve.whatsappNotesLine.replace('{{notes}}', notes.trim())
      : ''

    // El mensaje va siempre en español: lo lee el restaurante, no el visitante.
    const message = t.reserve.whatsappTemplate
      .replace('{{name}}', name.trim())
      .replace('{{people}}', people)
      .replace('{{date}}', formatIsoDate(date, LOCALES.es))
      .replace('{{time}}', time)
      .replace('{{phone}}', phone.trim())
      .replace('{{notes}}', notesLine)
      .trim()

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  /** Clic en el fondo oscuro. `detail > 0` descarta los clics del teclado. */
  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current
    if (!dialog || event.detail === 0 || event.target !== dialog) return
    const box = dialog.getBoundingClientRect()
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom
    if (!inside) dialog.close()
  }

  const closedThatDay = date !== '' && slotGroups.length === 0

  return (
    <dialog
      ref={dialogRef}
      className="reserve-dialog"
      aria-labelledby="reserve-title"
      onClick={handleBackdropClick}
    >
      <div className="flex max-h-[inherit] flex-col overflow-hidden rounded-t-3xl bg-foam shadow-2xl shadow-wave-deep/25 sm:rounded-3xl">
        <header className="flex items-start gap-4 border-b border-line px-5 py-5 sm:px-7">
          <KoiMark className="mt-0.5 hidden h-9 w-9 shrink-0 sm:block" />
          <div className="min-w-0 flex-1">
            <h2 id="reserve-title" className="text-xl font-bold sm:text-2xl">
              {t.reserve.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{t.reserve.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={t.reserve.close}
            className="-mr-1 -mt-1 grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-ink transition-colors duration-150 ease-out hover:bg-ink/10"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="reserve-name" className={LABEL}>
                {t.reserve.name}
              </label>
              <input
                id="reserve-name"
                ref={nameRef}
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                name="name"
                autoComplete="name"
                placeholder={t.reserve.namePlaceholder}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'reserve-name-error' : undefined}
                className={cn(FIELD, errors.name && 'border-koi-deep')}
              />
              <FieldError id="reserve-name-error" message={errors.name} />
            </div>

            <div>
              <label htmlFor="reserve-people" className={LABEL}>
                {t.reserve.people}
              </label>
              <select
                id="reserve-people"
                name="people"
                value={people}
                onChange={(event) => setPeople(event.target.value)}
                style={SELECT_STYLE}
                className={cn(FIELD, 'cursor-pointer appearance-none pr-10')}
              >
                {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="reserve-date" className={LABEL}>
                {t.reserve.date}
              </label>
              <input
                id="reserve-date"
                ref={dateRef}
                type="date"
                name="date"
                value={date}
                min={minDate || undefined}
                onChange={(event) => setDate(event.target.value)}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'reserve-date-error' : undefined}
                className={cn(FIELD, 'cursor-pointer', errors.date && 'border-koi-deep')}
              />
              <FieldError id="reserve-date-error" message={errors.date} />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="reserve-time" className={LABEL}>
                {t.reserve.time}
              </label>
              <select
                id="reserve-time"
                ref={timeRef}
                name="time"
                value={time}
                disabled={closedThatDay}
                onChange={(event) => setTime(event.target.value)}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={
                  errors.time
                    ? 'reserve-time-error'
                    : closedThatDay
                      ? 'reserve-time-closed'
                      : undefined
                }
                style={SELECT_STYLE}
                className={cn(
                  FIELD,
                  'cursor-pointer appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-60',
                  errors.time && 'border-koi-deep',
                )}
              >
                <option value="">—</option>
                {slotGroups.map((group) => (
                  <optgroup
                    key={group.kind}
                    label={group.kind === 'lunch' ? t.reserve.lunch : t.reserve.dinner}
                  >
                    {group.times.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {closedThatDay && (
                <p id="reserve-time-closed" className="mt-1.5 text-sm text-muted">
                  {t.reserve.closedDay}
                </p>
              )}
              <FieldError id="reserve-time-error" message={errors.time} />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="reserve-phone" className={LABEL}>
                {t.reserve.phone}
              </label>
              <input
                id="reserve-phone"
                ref={phoneRef}
                type="tel"
                name="tel"
                inputMode="tel"
                autoComplete="tel"
                spellCheck={false}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={t.reserve.phonePlaceholder}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'reserve-phone-error' : undefined}
                className={cn(FIELD, errors.phone && 'border-koi-deep')}
              />
              <FieldError id="reserve-phone-error" message={errors.phone} />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="reserve-notes" className={LABEL}>
                {t.reserve.notes}{' '}
                <span className="font-normal text-muted">({t.reserve.optional})</span>
              </label>
              <textarea
                id="reserve-notes"
                name="notes"
                rows={2}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder={t.reserve.notesPlaceholder}
                className={cn(FIELD, 'h-auto resize-y py-2.5 leading-relaxed')}
              />
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">{t.reserve.disclaimer}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {WHATSAPP_ENABLED && (
              <Button type="submit" size="lg" className="w-full sm:flex-1">
                <WhatsAppGlyph />
                {t.actions.whatsapp}
              </Button>
            )}
            <a
              href={`tel:${RESERVATION_PHONE}`}
              className={cn(
                'inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full',
                'border-2 border-ink/25 font-display font-semibold text-ink',
                'transition-[transform,border-color,background-color] duration-150 ease-out',
                'hover:border-ink/60 hover:bg-ink/5 active:scale-[0.97]',
                WHATSAPP_ENABLED ? 'w-full sm:w-auto sm:px-7' : 'w-full sm:flex-1',
              )}
            >
              <Phone size={18} aria-hidden="true" />
              {WHATSAPP_ENABLED ? t.actions.call : `${t.actions.call} ${RESERVATION_PHONE_DISPLAY}`}
            </a>
          </div>
        </form>
      </div>
    </dialog>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-koi-deep">
      {message}
    </p>
  )
}

function WhatsAppGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  )
}

import { useEffect, useMemo, useRef, useState } from 'react'
import { formatDisplayDate, isSameDay, parseIsoDate, toIsoDate, today } from '../utils/date'
import { FormField, getErrorId, getFieldClass } from './form/FormField'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

type DatePickerProps = {
  /** Id of the text input (linked to the label). */
  id: string
  /** Visible label text. */
  label: string
  /** Selected date as "YYYY-MM-DD", or "" when empty. */
  value: string
  /** Called with the new "YYYY-MM-DD" value when a day is picked. */
  onChange: (value: string) => void
  /** Called when the calendar closes (used to validate the field). */
  onClose?: () => void
  /** Earliest selectable date. */
  min?: Date
  /** Latest selectable date. */
  max?: Date
  /** Error message shown under the field. */
  error?: string
  placeholder?: string
}

/** Returns every day shown in the month grid, starting on the Sunday before the 1st. */
function getCalendarDays(viewDate: Date): Date[] {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const leadingDays = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((leadingDays + daysInMonth) / 7) * 7

  return Array.from({ length: totalCells }, (_, index) => new Date(year, month, index - leadingDays + 1))
}

/** Keeps `date` inside the optional [min, max] range. */
function clampDate(date: Date, min?: Date, max?: Date): Date {
  if (min && date < min) return min
  if (max && date > max) return max
  return date
}

function isOutOfRange(date: Date, min?: Date, max?: Date): boolean {
  return Boolean((min && date < min) || (max && date > max))
}

/** Lists the years shown in the year selector, most recent first. */
function getYearOptions(viewYear: number, min?: Date, max?: Date): number[] {
  const first = min?.getFullYear() ?? viewYear - 100
  const last = max?.getFullYear() ?? viewYear + 10
  return Array.from({ length: last - first + 1 }, (_, index) => last - index)
}

/** Date picker (date only) with month/year navigation and optional min/max bounds. */
export default function DatePicker({
  id,
  label,
  value,
  onChange,
  onClose,
  min,
  max,
  error,
  placeholder = 'MM/DD/YYYY',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState<Date>(() => parseIsoDate(value) ?? clampDate(today(), min, max))
  const containerRef = useRef<HTMLDivElement | null>(null)
  const selectedDate = parseIsoDate(value)

  const open = () => {
    setViewDate(selectedDate ?? clampDate(today(), min, max))
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    onClose?.()
  }

  // Keeps the latest `close` in a ref so the listeners below are registered only once per opening
  const closeRef = useRef(close)
  useEffect(() => {
    closeRef.current = close
  })

  useEffect(() => {
    if (!isOpen) return undefined

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeRef.current()
      }
    }
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate])
  const yearOptions = useMemo(() => getYearOptions(viewDate.getFullYear(), min, max), [viewDate, min, max])

  const showMonth = (year: number, month: number) => setViewDate(new Date(year, month, 1))

  const handleSelectDate = (date: Date) => {
    onChange(toIsoDate(date))
    close()
  }

  return (
    <div ref={containerRef} className="relative">
      <FormField id={id} label={label} error={error}>
        <div className="relative">
          <input
            id={id}
            type="text"
            value={formatDisplayDate(value)}
            readOnly
            onClick={() => (isOpen ? close() : open())}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault()
                open()
              }
            }}
            placeholder={placeholder}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? getErrorId(id) : undefined}
            className={`${getFieldClass(Boolean(error))} cursor-pointer pr-11`}
          />

          <button
            type="button"
            onClick={() => (isOpen ? close() : open())}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl border-l border-slate-700 bg-slate-900/80 text-slate-200 transition hover:bg-slate-800"
            aria-label={`Open calendar for ${label}`}
          >
            📅
          </button>
        </div>
      </FormField>

      {isOpen ? (
        <div
          role="dialog"
          aria-label={`Choose ${label}`}
          className="absolute z-30 mt-2 w-[310px] rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-slate-950/80"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg text-slate-200 transition hover:bg-slate-700"
              onClick={() => showMonth(viewDate.getFullYear(), viewDate.getMonth() - 1)}
              aria-label="Previous month"
            >
              ‹
            </button>

            <div className="flex gap-1.5">
              <select
                aria-label="Month"
                value={viewDate.getMonth()}
                onChange={(event) => showMonth(viewDate.getFullYear(), Number(event.target.value))}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-white focus:border-sky-500 focus:outline-none"
              >
                {MONTH_NAMES.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              <select
                aria-label="Year"
                value={viewDate.getFullYear()}
                onChange={(event) => showMonth(Number(event.target.value), viewDate.getMonth())}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-white focus:border-sky-500 focus:outline-none"
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg text-slate-200 transition hover:bg-slate-700"
              onClick={() => showMonth(viewDate.getFullYear(), viewDate.getMonth() + 1)}
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {DAY_NAMES.map((day) => (
              <div key={day} className="py-1">{day}</div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {calendarDays.map((date) => {
              const isCurrentMonth = date.getMonth() === viewDate.getMonth()
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
              const isDisabled = isOutOfRange(date, min, max)

              return (
                <button
                  key={toIsoDate(date)}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelectDate(date)}
                  aria-label={formatDisplayDate(toIsoDate(date))}
                  aria-pressed={isSelected}
                  className={[
                    'flex h-9 items-center justify-center rounded-lg text-sm transition',
                    isCurrentMonth ? 'text-slate-200' : 'text-slate-500',
                    isDisabled ? 'cursor-not-allowed opacity-30' : '',
                    isSelected
                      ? 'bg-sky-500 font-semibold text-slate-950 shadow-lg shadow-sky-500/20'
                      : !isDisabled ? 'hover:bg-slate-800' : '',
                  ].join(' ')}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

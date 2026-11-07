/** Date helpers. Dates are stored as ISO strings (YYYY-MM-DD) in local time. */

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

/** Parses "YYYY-MM-DD" into a local Date, or returns null if the string is not a real date. */
export function parseIsoDate(value: string | null | undefined): Date | null {
  const match = value ? ISO_DATE_PATTERN.exec(value) : null
  if (!match) return null

  const [, year, month, day] = match.map(Number)
  const date = new Date(year, month - 1, day)

  // Rejects overflowing dates such as 2023-02-31
  const isSameDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  return isSameDate ? date : null
}

/** Formats a Date as "YYYY-MM-DD". */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Formats an ISO date as "MM/DD/YYYY" (format used by the legacy app), or "" if invalid. */
export function formatDisplayDate(value: string | null | undefined): string {
  const date = parseIsoDate(value)
  if (!date) return ''

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}/${day}/${date.getFullYear()}`
}

/** Returns today's date at midnight. */
export function today(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/** Returns a copy of `date` shifted by `years` years. */
export function addYears(date: Date, years: number): Date {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate())
}

/** True when both dates fall on the same calendar day. */
export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

import { DEPARTMENTS, STATES } from '../data/formOptions'
import type { EmployeeFormValues } from '../types/employee'
import { addYears, parseIsoDate, today } from './date'

export type EmployeeFormErrors = Partial<Record<keyof EmployeeFormValues, string>>

export const MIN_AGE = 18
export const MAX_AGE = 100
/** How far in the future a start date may be planned. */
export const MAX_START_YEARS_AHEAD = 1

const NAME_PATTERN = /^\p{L}[\p{L}\s'-]*$/u
const ZIP_CODE_PATTERN = /^\d{5}$/

/** Bounds of the date of birth: between MAX_AGE and MIN_AGE years ago. */
export function getBirthDateBounds() {
  const now = today()
  return { min: addYears(now, -MAX_AGE), max: addYears(now, -MIN_AGE) }
}

/** Bounds of the start date: from the employee's 18th birthday (if known) up to one year from now. */
export function getStartDateBounds(dateOfBirth: string) {
  const birthDate = parseIsoDate(dateOfBirth)
  return {
    min: birthDate ? addYears(birthDate, MIN_AGE) : undefined,
    max: addYears(today(), MAX_START_YEARS_AHEAD),
  }
}

function validateName(value: string, label: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return `${label} is required.`
  if (trimmed.length < 2) return `${label} must contain at least 2 characters.`
  if (trimmed.length > 50) return `${label} must contain at most 50 characters.`
  if (!NAME_PATTERN.test(trimmed)) return `${label} can only contain letters, spaces, hyphens and apostrophes.`
  return undefined
}

function validateDateOfBirth(value: string): string | undefined {
  if (!value) return 'Date of birth is required.'
  const date = parseIsoDate(value)
  if (!date) return 'Date of birth is not a valid date.'

  const { min, max } = getBirthDateBounds()
  if (date > max) return `The employee must be at least ${MIN_AGE} years old.`
  if (date < min) return `The employee must be under ${MAX_AGE} years old.`
  return undefined
}

function validateStartDate(value: string, dateOfBirth: string): string | undefined {
  if (!value) return 'Start date is required.'
  const date = parseIsoDate(value)
  if (!date) return 'Start date is not a valid date.'

  const { min, max } = getStartDateBounds(dateOfBirth)
  if (min && date < min) return `Start date must be after the employee's ${MIN_AGE}th birthday.`
  if (date > max) return `Start date cannot be more than ${MAX_START_YEARS_AHEAD} year ahead.`
  return undefined
}

function validateStreet(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'Street is required.'
  if (trimmed.length < 3) return 'Street must contain at least 3 characters.'
  if (trimmed.length > 100) return 'Street must contain at most 100 characters.'
  return undefined
}

function validateZipCode(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'Zip code is required.'
  if (!ZIP_CODE_PATTERN.test(trimmed)) return 'Zip code must contain exactly 5 digits.'
  return undefined
}

function validateOption(value: string, allowed: readonly string[], label: string): string | undefined {
  return allowed.includes(value) ? undefined : `Please select a valid ${label}.`
}

/**
 * Validates every field of the employee form.
 * Returns an object containing one message per invalid field (empty when the form is valid).
 */
export function validateEmployee(values: EmployeeFormValues): EmployeeFormErrors {
  const errors: EmployeeFormErrors = {
    firstName: validateName(values.firstName, 'First name'),
    lastName: validateName(values.lastName, 'Last name'),
    dateOfBirth: validateDateOfBirth(values.dateOfBirth),
    startDate: validateStartDate(values.startDate, values.dateOfBirth),
    department: validateOption(values.department, DEPARTMENTS, 'department'),
    street: validateStreet(values.street),
    city: validateName(values.city, 'City'),
    state: validateOption(values.state, STATES.map((state) => state.abbreviation), 'state'),
    zipCode: validateZipCode(values.zipCode),
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message !== undefined),
  ) as EmployeeFormErrors
}

/** Trims every text value before saving. */
export function normalizeEmployee(values: EmployeeFormValues): EmployeeFormValues {
  return {
    ...values,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    street: values.street.trim(),
    city: values.city.trim(),
    zipCode: values.zipCode.trim(),
  }
}

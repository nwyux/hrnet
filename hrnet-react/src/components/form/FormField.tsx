import type { ChangeEvent, ReactNode } from 'react'

/** Base Tailwind classes shared by text inputs, selects and the date picker input. */
export const FIELD_BASE_CLASS =
  'w-full rounded-xl border bg-slate-950/80 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-2'

/** Returns the field classes for the normal or error state. */
export function getFieldClass(hasError: boolean): string {
  return `${FIELD_BASE_CLASS} ${
    hasError
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
      : 'border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
  }`
}

/** Id of the element holding a field's error message (used by aria-describedby). */
export const getErrorId = (id: string) => `${id}-error`

type FormFieldProps = {
  /** Id of the input the label points to. */
  id: string
  /** Visible label text. */
  label: string
  /** Error message shown under the field; nothing is shown when undefined. */
  error?: string
  /** The input element itself. */
  children: ReactNode
}

/** Label + field + error message wrapper. */
export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      {children}
      {error ? (
        <p id={getErrorId(id)} role="alert" className="mt-1.5 text-sm text-rose-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextFieldProps = {
  id: string
  /** Name of the form value this field edits. */
  name: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  error?: string
  placeholder?: string
  /** Browser hint for the virtual keyboard, e.g. "numeric". */
  inputMode?: 'text' | 'numeric'
  maxLength?: number
  autoComplete?: string
}

/** Controlled text input with label and error message. */
export function TextField({ id, error, label, ...inputProps }: TextFieldProps) {
  return (
    <FormField id={id} label={label} error={error}>
      <input
        id={id}
        type="text"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? getErrorId(id) : undefined}
        className={getFieldClass(Boolean(error))}
        {...inputProps}
      />
    </FormField>
  )
}

type SelectFieldProps = {
  id: string
  name: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  /** Options displayed in the list: `value` is stored, `label` is displayed. */
  options: { value: string; label: string }[]
  error?: string
}

/** Controlled select with label and error message. */
export function SelectField({ id, name, label, value, onChange, options, error }: SelectFieldProps) {
  return (
    <FormField id={id} label={label} error={error}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? getErrorId(id) : undefined}
        className={getFieldClass(Boolean(error))}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}

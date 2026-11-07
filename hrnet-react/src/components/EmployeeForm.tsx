import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import DatePicker from './DatePicker'
import { SelectField, TextField } from './form/FormField'
import { DEPARTMENTS, STATES } from '../data/formOptions'
import type { EmployeeFormValues } from '../types/employee'
import {
  getBirthDateBounds,
  getStartDateBounds,
  normalizeEmployee,
  validateEmployee,
} from '../utils/validateEmployee'

type FieldName = keyof EmployeeFormValues

const initialValues: EmployeeFormValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  startDate: '',
  department: DEPARTMENTS[0],
  street: '',
  city: '',
  state: STATES[0].abbreviation,
  zipCode: '',
}

/** Order used to focus the first invalid field on submit. */
const FIELD_ORDER: FieldName[] = [
  'firstName', 'lastName', 'dateOfBirth', 'startDate', 'street', 'city', 'state', 'zipCode', 'department',
]

const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({ value: department, label: department }))
const STATE_OPTIONS = STATES.map((state) => ({ value: state.abbreviation, label: state.name }))

type EmployeeFormProps = {
  /** Called with the trimmed values when the form is valid. */
  onSubmit: (employee: EmployeeFormValues) => void
}

export default function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  const [values, setValues] = useState<EmployeeFormValues>(initialValues)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const errors = useMemo(() => validateEmployee(values), [values])
  const birthDateBounds = useMemo(() => getBirthDateBounds(), [])
  const startDateBounds = useMemo(() => getStartDateBounds(values.dateOfBirth), [values.dateOfBirth])

  /** An error is displayed once the field was left, or after a submit attempt. */
  const visibleError = (field: FieldName) => (hasSubmitted || touched[field] ? errors[field] : undefined)

  const markTouched = (field: FieldName) => setTouched((current) => ({ ...current, [field]: true }))

  const setValue = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(event.target.name as FieldName, event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const firstInvalidField = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalidField) {
      setHasSubmitted(true)
      document.getElementById(firstInvalidField)?.focus()
      return
    }

    onSubmit(normalizeEmployee(values))
    setValues(initialValues)
    setTouched({})
    setHasSubmitted(false)
  }

  /** Props shared by every text field. */
  const textFieldProps = (field: FieldName) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: () => markTouched(field),
    error: visibleError(field),
  })

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-7">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Create employee</h2>
        <p className="mt-2 text-sm text-slate-400">Fill in the details below to add a new employee to the directory.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField {...textFieldProps('firstName')} label="First Name" placeholder="John" autoComplete="given-name" maxLength={50} />
          <TextField {...textFieldProps('lastName')} label="Last Name" placeholder="Doe" autoComplete="family-name" maxLength={50} />

          <DatePicker
            id="dateOfBirth"
            label="Date of Birth"
            value={values.dateOfBirth}
            onChange={(value) => setValue('dateOfBirth', value)}
            onClose={() => markTouched('dateOfBirth')}
            min={birthDateBounds.min}
            max={birthDateBounds.max}
            error={visibleError('dateOfBirth')}
          />
          <DatePicker
            id="startDate"
            label="Start Date"
            value={values.startDate}
            onChange={(value) => setValue('startDate', value)}
            onClose={() => markTouched('startDate')}
            min={startDateBounds.min}
            max={startDateBounds.max}
            error={visibleError('startDate')}
          />
        </div>

        <fieldset className="rounded-2xl border border-slate-800 p-4 sm:p-5">
          <legend className="px-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Address</legend>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField {...textFieldProps('street')} label="Street" placeholder="123 Main Street" autoComplete="street-address" maxLength={100} />
            </div>
            <TextField {...textFieldProps('city')} label="City" placeholder="Los Angeles" autoComplete="address-level2" maxLength={50} />
            <SelectField
              id="state"
              name="state"
              label="State"
              value={values.state}
              onChange={handleChange}
              options={STATE_OPTIONS}
              error={visibleError('state')}
            />
            <TextField {...textFieldProps('zipCode')} label="Zip Code" placeholder="90001" inputMode="numeric" autoComplete="postal-code" maxLength={5} />
          </div>
        </fieldset>

        <SelectField
          id="department"
          name="department"
          label="Department"
          value={values.department}
          onChange={handleChange}
          options={DEPARTMENT_OPTIONS}
          error={visibleError('department')}
        />

        <div className="flex justify-end pt-2">
          <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60">
            Save employee
          </button>
        </div>
      </form>
    </section>
  )
}

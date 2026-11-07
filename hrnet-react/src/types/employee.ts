/** An employee record as stored in the application state. */
export type Employee = {
  id: string
  firstName: string
  lastName: string
  /** ISO date (YYYY-MM-DD) */
  startDate: string
  department: string
  /** ISO date (YYYY-MM-DD) */
  dateOfBirth: string
  street: string
  city: string
  /** Two-letter state abbreviation, e.g. "CA" */
  state: string
  zipCode: string
}

/** The values entered in the creation form (an employee without its id). */
export type EmployeeFormValues = Omit<Employee, 'id'>

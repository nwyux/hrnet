import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedEmployees } from '../data/seedEmployees'
import type { Employee, EmployeeFormValues } from '../types/employee'

type EmployeeState = {
  employees: Employee[]
  /** Adds a new employee at the top of the list and returns it. */
  addEmployee: (values: EmployeeFormValues) => Employee
}

const createId = () => `employee-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

/**
 * Global employee store.
 * The `persist` middleware keeps the list across page reloads.
 */
export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: seedEmployees,
      addEmployee: (values) => {
        const employee: Employee = { ...values, id: createId() }
        set((state) => ({ employees: [employee, ...state.employees] }))
        return employee
      },
    }),
    {
      name: 'hrnet-employee-store',
      partialize: (state) => ({ employees: state.employees }),
    },
  ),
)

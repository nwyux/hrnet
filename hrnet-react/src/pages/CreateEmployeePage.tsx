import { useState } from 'react'
import EmployeeForm from '../components/EmployeeForm'
import Modal from 'hrnet-modal-react-dark'
import { useEmployeeStore } from '../store/employeeStore'
import type { EmployeeFormValues } from '../types/employee'

export default function CreateEmployeePage() {
  const employeeCount = useEmployeeStore((state) => state.employees.length)
  const addEmployee = useEmployeeStore((state) => state.addEmployee)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: EmployeeFormValues) => {
    addEmployee(values)
    setIsModalOpen(true)
  }

  return (
    <>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">WealthHealth</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create Employee</h1>
        </div>

        <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-sm font-medium text-sky-200">
          {employeeCount} employees
        </div>
      </header>

      <EmployeeForm onSubmit={handleSubmit} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Employee created successfully"
        description="The employee has been added to the company directory."
        actions={
          <button
            type="button"
            className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        }
      />
    </>
  )
}

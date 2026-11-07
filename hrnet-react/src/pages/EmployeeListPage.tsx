import EmployeeTable from '../components/EmployeeTable'
import { useEmployeeStore } from '../store/employeeStore'

export default function EmployeeListPage() {
  const employees = useEmployeeStore((state) => state.employees)

  return (
    <>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">WealthHealth</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Current Employees</h1>
        </div>

        <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-200">
          {employees.length} employees
        </div>
      </header>

      <EmployeeTable employees={employees} />
    </>
  )
}

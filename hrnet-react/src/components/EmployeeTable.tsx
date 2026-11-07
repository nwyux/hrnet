import type { Employee } from '../types/employee'

type EmployeeTableProps = {
  employees: Employee[]
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h2 className="text-xl font-semibold text-white">Current employees</h2>
        <p className="mt-2 text-sm text-slate-400">No employee has been added yet.</p>
      </section>
    )
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/40 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-white">Current employees</h2>
          <p className="mt-1 text-sm text-slate-400">Directory of all employees in the company.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="min-w-full border-collapse text-left text-sm text-slate-200">
          <thead className="bg-slate-800/80 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">First Name</th>
              <th className="px-4 py-3 font-medium">Last Name</th>
              <th className="px-4 py-3 font-medium">Start Date</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Date of Birth</th>
              <th className="px-4 py-3 font-medium">Street</th>
              <th className="px-4 py-3 font-medium">City</th>
              <th className="px-4 py-3 font-medium">State</th>
              <th className="px-4 py-3 font-medium">Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t border-slate-800 bg-slate-900/60 text-slate-100 hover:bg-slate-800/60">
                <td className="px-4 py-3 whitespace-nowrap">{employee.firstName}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.lastName}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.startDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.department}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.dateOfBirth}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.street}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.city}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.state}</td>
                <td className="px-4 py-3 whitespace-nowrap">{employee.zipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

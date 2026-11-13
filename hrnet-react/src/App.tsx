import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import CreateEmployeePage from './pages/CreateEmployeePage'
import EmployeeListPage from './pages/EmployeeListPage'
import Modal, { type ModalTheme } from 'hrnet-modal-react-dark'

function App() {
  const [isModalTestOpen, setIsModalTestOpen] = useState(false)
  const [modalTheme, setModalTheme] = useState<ModalTheme>('light')

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-500/40 bg-sky-500/10 text-sm font-black tracking-tight text-sky-300">
                HR
              </div>
              <span className="text-lg font-black tracking-[0.14em] text-white sm:text-xl">HRNET</span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="modal-theme" className="sr-only">
                Modal theme
              </label>
              <select
                id="modal-theme"
                value={modalTheme}
                onChange={(event) => setModalTheme(event.target.value as ModalTheme)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-2 py-2 text-xs font-semibold text-slate-200"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="brand">Brand</option>
              </select>
              <button
                type="button"
                onClick={() => setIsModalTestOpen(true)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-sky-500 hover:text-sky-300"
              >
                Test modal
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <nav
            aria-label="Main navigation"
            className="mb-6 inline-flex w-fit items-center gap-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-1.5 shadow-2xl shadow-slate-950/50 backdrop-blur"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition sm:px-4 ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              Create Employee
            </NavLink>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition sm:px-4 ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              Current Employees
            </NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<CreateEmployeePage />} />
            <Route path="/employees" element={<EmployeeListPage />} />
          </Routes>
        </div>

        <Modal
          isOpen={isModalTestOpen}
          onClose={() => setIsModalTestOpen(false)}
          title="Modal test"
          description={`This modal uses the "${modalTheme}" theme. Change it with the selector next to the button.`}
          theme={modalTheme}
          actions={
            <button
              type="button"
              onClick={() => setIsModalTestOpen(false)}
              className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
            >
              Close
            </button>
          }
        />
      </div>
    </BrowserRouter>
  )
}

export default App

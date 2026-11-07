import { useEffect, type MouseEvent, type ReactNode } from 'react'

export type ModalProps = {
  /**
   * Controls visibility. When `false` the modal renders nothing.
   * The parent owns this state (controlled component).
   */
  isOpen: boolean
  /**
   * Called when the user asks to close the modal: close button (×),
   * click on the dark overlay, or Escape key. Usually sets `isOpen` to `false`.
   */
  onClose: () => void
  /** Main heading of the dialog. Also used as the accessible name of the dialog. */
  title: string
  /** Optional text displayed under the title. */
  description?: string | null
  /** Optional footer content, typically one or more buttons. */
  actions?: ReactNode
}

/**
 * Confirmation modal (replacement for the jQuery `jquery.modal.js` plugin).
 *
 * - Renders nothing while `isOpen` is false.
 * - Closes on Escape, on overlay click and with the close button.
 * - Locks page scroll while open and restores it on close.
 */
export default function Modal({ isOpen, onClose, title, description, actions }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4" onClick={onClose} role="presentation">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-slate-950/70"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-xl text-emerald-300">
            ✓
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg text-slate-200 transition hover:bg-slate-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="text-center">
          <h2 id="modal-title" className="text-2xl font-semibold text-white">{title}</h2>
          {description ? <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p> : null}
        </div>

        {actions ? <div className="mt-5 flex justify-end">{actions}</div> : null}
      </div>
    </div>
  )
}

import { useEffect, useId, type MouseEvent, type ReactNode } from 'react'

/**
 * Custom CSS classes for each part of the modal.
 * When a key is set, its class **replaces** the theme's style for that part,
 * so the modal can follow any design system (Tailwind classes or your own CSS).
 */
export type ModalClassNames = {
  /** Dark background covering the page. */
  overlay?: string
  /** The dialog box itself. */
  dialog?: string
  /** Container of the icon. */
  icon?: string
  /** Close (×) button. */
  closeButton?: string
  /** Title (h2). */
  title?: string
  /** Description paragraph. */
  description?: string
  /** Container of the actions (footer). */
  actions?: string
}

/** Name of a predefined theme. */
export type ModalTheme = 'dark' | 'light' | 'brand'

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
  /** Optional icon shown at the top left. Defaults to a check mark; pass `null` to hide it. */
  icon?: ReactNode
  /** Predefined theme: `'dark'` (default), `'light'` or `'brand'` (WealthHealth green). */
  theme?: ModalTheme
  /** Optional custom classes, one per part of the modal. They replace the theme's classes for those parts. */
  classNames?: ModalClassNames
}

const OVERLAY = 'fixed inset-0 z-50 flex items-center justify-center p-4'
const ICON = 'flex h-11 w-11 items-center justify-center text-xl'
const CLOSE_BUTTON = 'inline-flex h-9 w-9 items-center justify-center text-lg transition'

/** Classes of the three predefined themes. */
export const MODAL_THEMES: Record<ModalTheme, Required<ModalClassNames>> = {
  dark: {
    overlay: `${OVERLAY} bg-slate-950/75`,
    dialog: 'w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-slate-950/70',
    icon: `${ICON} rounded-xl bg-emerald-500/15 text-emerald-300`,
    closeButton: `${CLOSE_BUTTON} rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700`,
    title: 'text-2xl font-semibold text-white',
    description: 'mt-2 text-sm leading-6 text-slate-300',
    actions: 'mt-5 flex justify-end',
  },
  light: {
    overlay: `${OVERLAY} bg-slate-900/40`,
    dialog: 'w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl',
    icon: `${ICON} rounded-full bg-sky-100 text-sky-600`,
    closeButton: `${CLOSE_BUTTON} rounded-full text-slate-500 hover:bg-slate-100`,
    title: 'text-2xl font-semibold text-slate-900',
    description: 'mt-2 text-sm leading-6 text-slate-600',
    actions: 'mt-5 flex justify-end',
  },
  brand: {
    overlay: `${OVERLAY} bg-lime-950/60`,
    dialog: 'w-full max-w-md rounded-md border-t-4 border-lime-700 bg-lime-50 p-6 shadow-2xl',
    icon: `${ICON} rounded-md bg-lime-700 text-white`,
    closeButton: `${CLOSE_BUTTON} rounded-md text-lime-800 hover:bg-lime-100`,
    title: 'text-2xl font-bold text-lime-900',
    description: 'mt-2 text-sm leading-6 text-lime-800',
    actions: 'mt-5 flex justify-end',
  },
}

/**
 * Confirmation modal (replacement for the jQuery `jquery.modal.js` plugin).
 *
 * - Renders nothing while `isOpen` is false.
 * - Closes on Escape, on overlay click and with the close button.
 * - Locks page scroll while open and restores it on close.
 * - Three predefined themes (`theme` prop), and every part can be restyled with `classNames`.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  actions,
  icon = '✓',
  theme = 'dark',
  classNames = {},
}: ModalProps) {
  const titleId = useId()
  const classes = { ...(MODAL_THEMES[theme] ?? MODAL_THEMES.dark), ...classNames }

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
    <div className={classes.overlay} onClick={onClose} role="presentation">
      <div
        className={classes.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          {icon != null ? <div className={classes.icon}>{icon}</div> : <span />}

          <button type="button" className={classes.closeButton} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="text-center">
          <h2 id={titleId} className={classes.title}>{title}</h2>
          {description ? <p className={classes.description}>{description}</p> : null}
        </div>

        {actions ? <div className={classes.actions}>{actions}</div> : null}
      </div>
    </div>
  )
}

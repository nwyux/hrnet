# hrnet-modal-react-dark

Accessible React confirmation modal, built for **HRnet** (WealthHealth) to replace the jQuery plugin [`jquery.modal`](https://github.com/kylefox/jquery-modal).

- No jQuery, no runtime dependency: only `react` and `react-dom` as peer dependencies
- Function component with hooks, written in TypeScript (types included)
- Closes with the **×** button, a click on the overlay, or the **Escape** key
- Locks page scroll while open
- `role="dialog"` and `aria-modal="true"`; the title is the accessible name
- **3 predefined themes** (`dark`, `light`, `brand`) switched with the `theme` prop
- **Fully customizable**: every part can be restyled with the `classNames` prop
- Styles shipped as one small CSS file (works with or without Tailwind)

## Prerequisites

- [Node.js](https://nodejs.org/) **20.19 or later** (22 LTS recommended) and npm
- A React project using **React 18 or later**
- A bundler that handles CSS imports (Vite, Next.js, webpack…)
- Recommended editor: [Visual Studio Code](https://code.visualstudio.com/)

## Installation

```bash
npm install hrnet-modal-react-dark
```

## Usage

Import the component **and its stylesheet** once (for example in `main.tsx`):

```tsx
import { useState } from 'react'
import Modal from 'hrnet-modal-react-dark'
import 'hrnet-modal-react-dark/style.css'

export default function CreateEmployee() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Save</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Employee created!"
        description="The employee has been added to the directory."
        actions={<button onClick={() => setIsOpen(false)}>Close</button>}
      />
    </>
  )
}
```

The modal is **controlled**: the parent keeps the `isOpen` state and `onClose` updates it.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | yes | Shows the modal when `true`. When `false` nothing is rendered. |
| `onClose` | `() => void` | yes | Called when the user closes the modal (× button, overlay click or Escape). Usually sets `isOpen` to `false`. |
| `title` | `string` | yes | Heading of the modal, also used as the dialog's accessible name. |
| `description` | `string \| null` | no | Text displayed under the title. |
| `actions` | `ReactNode` | no | Footer content, typically one or more buttons. |
| `icon` | `ReactNode` | no | Icon shown at the top left. Defaults to `✓`; pass `null` to hide it. |
| `theme` | `'dark' \| 'light' \| 'brand'` | no | Predefined theme (see below). Defaults to `'dark'`. |
| `classNames` | `ModalClassNames` | no | Custom CSS classes for each part of the modal (see below). |

## Themes

Three predefined themes are included. Switch with a single prop:

```tsx
<Modal theme="dark" ... />   // default: dark slate, green check
<Modal theme="light" ... />  // white dialog, blue accents
<Modal theme="brand" ... />  // WealthHealth green
```

The theme classes are exported as `MODAL_THEMES` if you want to reuse them.

## Custom styles

On top of a theme, each part of the modal can be restyled to match your design system with the `classNames` prop.
When a key is set, its class **replaces** the theme's style for that part (the other parts keep the theme).

| Key | Part |
| --- | --- |
| `overlay` | Background covering the page |
| `dialog` | The dialog box |
| `icon` | Icon container |
| `closeButton` | Close (×) button |
| `title` | Title |
| `description` | Description |
| `actions` | Footer containing the actions |

Works with Tailwind classes or your own CSS classes:

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Employee created!"
  icon="★"
  classNames={{
    overlay: 'my-overlay',
    dialog: 'my-dialog',
    title: 'my-title',
  }}
/>
```

```css
.my-overlay { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: rgb(0 0 0 / 0.5); }
.my-dialog { background: white; border-radius: 8px; padding: 24px; width: 400px; }
.my-title { color: #5a6f08; font-size: 1.5rem; }
```

The overlay class must keep the modal on top of the page (`position: fixed` and full size).

## Development

Source code: [github.com/nwyux/hrnet-modal](https://github.com/nwyux/hrnet-modal)

```bash
git clone https://github.com/nwyux/hrnet-modal.git
cd hrnet-modal
npm install
npm run build
```

The source lives in `src/`. The build (Vite library mode + TypeScript declarations) outputs to `dist/`.

`dist/index.js` is an ES module, `dist/style.css` holds the styles, `dist/*.d.ts` the types.

## License

MIT

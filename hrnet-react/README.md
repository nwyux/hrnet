# HRNet - Modernized Version

This project is a complete migration of the legacy HRNet application from jQuery to React.

## Objectives

- Convert the entire HRNet application to React.
- Replace the legacy jQuery plugins with modern React components.
- Convert one plugin into a reusable custom React component package.
- Improve maintainability and architecture.
- Deliver a cleaner, more modern employee management interface.
- Compare the legacy and modern versions through performance auditing.

## Tech Stack

- React 19
- Vite
- TypeScript
- React Router
- Tailwind CSS
- Zustand for state management (`persist` middleware keeps the employees across reloads)

## Architecture

The structure is organized to keep the project readable and scalable:

- `src/App.tsx`: application shell and routing
- `src/pages/`: page-level views such as create employee and employee list
- `src/components/`: reusable UI components such as the form, table, and date picker
- `src/components/form/`: shared form field components (label, input, error message)
- `src/store/`: Zustand employee store
- `src/types/`: shared TypeScript types
- `src/utils/`: pure helpers (date formatting, form validation)
- `src/data/`: seed data, states and departments lists
- `src/index.css`: global styling and Tailwind configuration
- `../hrnet-modal/`: the modal published as an npm package (see its own README)

## Form validation

Every field is validated before saving (`src/utils/validateEmployee.ts`):

- first name, last name and city: 2 to 50 letters (spaces, hyphens and apostrophes allowed)
- date of birth: the employee must be between 18 and 100 years old
- start date: after the employee's 18th birthday and at most one year ahead
- street: 3 to 100 characters
- zip code: exactly 5 digits
- state and department: must be one of the listed values

Errors are shown under each field once it has been left, or after a submit attempt, and the first invalid field gets the focus.

## Custom Component Conversion

The selected plugin for conversion was the modal component.

It was rebuilt as a custom React component to replace the previous jQuery-based behavior with a cleaner and more maintainable implementation. It lives in `../hrnet-modal/`, is published on npm as [`hrnet-modal-react-dark`](https://www.npmjs.com/package/hrnet-modal-react-dark), and the app consumes it as a package (`npm run dev` and `npm run build` build it first).

The modal provides:
- dialog display
- click outside to close
- Escape key support
- optional action buttons
- body scroll lock when opened
- a modern dark UI aligned with the application design

## Performance Comparison

Lighthouse audits (mobile, Slow 4G) compare the legacy jQuery version with the React production build, on the Create Employee page:

| Category | jQuery | React |
| --- | :---: | :---: |
| Performance | 85 | **100** |
| Accessibility | 89 | **91** |
| Best Practices | 92 | **96** |
| SEO | 90 | **91** |

Largest Contentful Paint drops from 2.6 s to 1.5 s and Speed Index from 9.8 s to 1.5 s, mainly because the five render-blocking jQuery scripts loaded from CDNs are replaced by a single minified bundle.

- [Lighthouse Comparison Matrix](../lighthouse_comparison.md): summary of findings and analysis
- [jQuery Legacy Report (PDF)](../lighthouse-jquery.pdf): audit of the legacy application
- [React Modern Report (PDF)](../lighthouse-react.pdf): audit of the modernized application

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Run the app

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

## Project Structure

```bash
src/
├── App.tsx
├── components/
├── data/
├── pages/
├── index.css
├── main.tsx
```

## Notes

This project demonstrates a front-end migration from a legacy jQuery stack to a modern React architecture, with the goal of improving scalability, maintainability, UX quality, and performance.

# HRnet – jQuery to React migration

OpenClassrooms project 14: WealthHealth's internal HR application, converted from jQuery to React.

## Repository layout

| Folder / file | Content |
| --- | --- |
| [`hrnet-react/`](hrnet-react/) | The HRnet application (React 19, Vite, TypeScript, Zustand, Tailwind CSS) |
| [`hrnet-modal/`](hrnet-modal/) | The modal component converted from the jQuery `jquery.modal` plugin, published on npm as [`hrnet-modal-react-dark`](https://www.npmjs.com/package/hrnet-modal-react-dark) |
| `lighthouse-*.pdf` | Lighthouse audits of the legacy jQuery app and of the React production build (to be added) |

## Quick start

```bash
cd hrnet-modal
npm install
cd ../hrnet-react
npm install
npm run dev
```

`npm run dev` and `npm run build` in `hrnet-react` build the modal package first.

See each folder's README for details.

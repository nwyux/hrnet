# HRnet – jQuery to React migration

OpenClassrooms project 14: WealthHealth's internal HR application, converted from jQuery to React.

## Repository layout

| Folder / file | Content |
| --- | --- |
| [`hrnet-react/`](hrnet-react/) | The HRnet application (React 19, Vite, TypeScript, Zustand, Tailwind CSS) |
| [`hrnet-modal/`](hrnet-modal/) | The modal component converted from the jQuery `jquery.modal` plugin, published on npm as [`hrnet-modal-react-dark`](https://www.npmjs.com/package/hrnet-modal-react-dark) |
| [`lighthouse_comparison.md`](lighthouse_comparison.md) | Performance comparison between the legacy jQuery app and the React production build (in French) |
| [`lighthouse-jquery.pdf`](lighthouse-jquery.pdf) / [`lighthouse-react.pdf`](lighthouse-react.pdf) | Full Lighthouse reports (mobile) |

**Lighthouse (mobile):** Performance 85 → **100**, Accessibility 89 → **91**, Best Practices 92 → **96**, SEO 90 → **91**.

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

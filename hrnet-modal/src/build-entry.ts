// Vite build entry: pulls the stylesheet into the build (emitted as dist/style.css)
// while keeping index.ts free of CSS imports for the generated type declarations.
import './styles.css'

export * from './index'
export { default } from './index'

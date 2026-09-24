import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './v.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Built pages arrive pre-rendered (see scripts/prerender.mjs), so React
// attaches to the existing HTML. Two cases render from scratch instead:
// the dev server (empty root) and 404.html, which Apache serves for every
// unknown URL, so its markup cannot be assumed to match what this URL renders.
if (root.firstElementChild && !root.hasAttribute('data-fallback')) {
  ReactDOM.hydrateRoot(root, app)
} else {
  root.replaceChildren()
  ReactDOM.createRoot(root).render(app)
}

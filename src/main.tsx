import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { installRouter, redirectAlias, redirectLegacyHash } from './routes'

if (!redirectLegacyHash() && !redirectAlias()) {
  installRouter()

  const el = document.getElementById('root')!
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  if (el.hasChildNodes()) ReactDOM.hydrateRoot(el, app)
  else ReactDOM.createRoot(el).render(app)

  // Fade out the black/cream AMC boot splash once React has mounted.
  const boot = document.getElementById('amc-boot')
  if (boot) {
    const remove = () => boot.remove()
    requestAnimationFrame(() => {
      boot.classList.add('is-done')
      window.setTimeout(remove, 320)
    })
  }
}

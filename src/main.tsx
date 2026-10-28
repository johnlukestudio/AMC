import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Fade out the black/cream AMC boot splash once React has mounted.
const boot = document.getElementById('amc-boot')
if (boot) {
  const remove = () => boot.remove()
  requestAnimationFrame(() => {
    boot.classList.add('is-done')
    window.setTimeout(remove, 320)
  })
}

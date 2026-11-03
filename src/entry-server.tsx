import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import App from "./App"
import { setPrerenderPath } from "./routes"

export function render(pathname: string) {
  setPrerenderPath(pathname)
  try {
    return renderToString(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } finally {
    setPrerenderPath(null)
  }
}

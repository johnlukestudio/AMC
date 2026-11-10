/** Path routing for the beta site. Hash URLs (#/about) never reach the server. */

import { projectPathnames, PROJECTS } from "./projects"

export const SITE_ORIGIN = "https://beta.amcmillwork.com"

export const NAVIGATE_EVENT = "amc-navigate"

/** Old paths that should 301 to a single canonical URL. */
export const ALIASES: Record<string, string> = {
  "/services/commercial-casework": "/americase",
  "/services/casework": "/americase",
  "/services/millwork": "/services/architectural-millwork",
  "/installers": "/divisions/amc-installers",
  "/divisions/american-installers": "/divisions/amc-installers",
  "/portfolio": "/portfolio/millwork",
  "/portfolio/project": "/portfolio/project/ave-blue-bell",
}

const SERVICE_SLUGS = new Set(["acoustical", "surfaces"])
const DIVISION_SLUGS = new Set([
  "amc-installers",
  "amc-acoustical",
  "american-surfaces",
])
const PORTFOLIO_SLUGS = new Set(["millwork", "casework", "acoustics", "all"])
const PROJECT_SLUGS = new Set(PROJECTS.map((project) => project.slug))

const newsSlugs: string[] = []

/** Called from the news module so article URLs stay in sync with posts. */
export function registerNewsSlugs(slugs: string[]) {
  newsSlugs.splice(0, newsSlugs.length, ...slugs)
}

export function newsPaths(): string[] {
  return newsSlugs.map((slug) => `/news/${slug}`)
}

export const STATIC_PATHS = [
  "/",
  "/about",
  "/careers",
  "/contact",
  "/insights/casework-vs-millwork",
  "/americase",
  "/services",
  "/services/architectural-millwork",
  "/services/acoustical",
  "/services/surfaces",
  "/news",
  "/portfolio/millwork",
  "/portfolio/casework",
  "/portfolio/acoustics",
  "/portfolio/all",
  ...projectPathnames(),
  "/divisions/amc-installers",
  "/divisions/amc-acoustical",
  "/divisions/american-surfaces",
] as const

export function listIndexablePaths(): string[] {
  return [...STATIC_PATHS, ...newsPaths()]
}

export type RouteId = "home" | "about" | "careers" | "contact" | "insight" | "americase" | "architectural-millwork" | "services" | "service" | "news" | "article" | "division" | "portfolio" | "project" | "not-found"

export type ResolvedRoute = {
  id: RouteId
  /** Canonical path (aliases already resolved). */
  pathname: string
  slug: string
}

export function normalizePath(input: string): string {
  const path = input.split("?")[0].split("#")[0] || "/"
  if (path === "/") return "/"
  const withSlash = path.startsWith("/") ? path : `/${path}`
  return withSlash.replace(/\/+$/, "") || "/"
}

export function aliasTarget(pathname: string): string | null {
  return ALIASES[normalizePath(pathname)] ?? null
}

/** Nginx serves each route as a directory index, so the 200 URL has a trailing slash. */
export function publicPath(pathname: string): string {
  const path = normalizePath(pathname)
  if (path === "/") return "/"
  return `${path}/`
}

export function absoluteUrl(pathname: string): string {
  const path = publicPath(pathname)
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}

function segment(pathname: string, prefix: string): string | null {
  if (!pathname.startsWith(prefix)) return null
  const rest = pathname.slice(prefix.length)
  if (!rest || rest.includes("/")) return null
  return rest
}

export function resolveRoute(input: string): ResolvedRoute {
  const normalized = normalizePath(input)
  const pathname = normalizePath(ALIASES[normalized] ?? normalized)

  if (pathname === "/") return { id: "home", pathname, slug: "" }
  if (pathname === "/about") return { id: "about", pathname, slug: "" }
  if (pathname === "/careers") return { id: "careers", pathname, slug: "" }
  if (pathname === "/contact") return { id: "contact", pathname, slug: "" }
  if (pathname === "/americase") return { id: "americase", pathname, slug: "" }
  if (pathname === "/services") return { id: "services", pathname, slug: "" }
  if (pathname === "/services/architectural-millwork")
    return {
      id: "architectural-millwork",
      pathname,
      slug: "architectural-millwork",
    }
  if (pathname === "/news") return { id: "news", pathname, slug: "" }
  if (pathname === "/insights/casework-vs-millwork")
    return { id: "insight", pathname, slug: "casework-vs-millwork" }

  const service = segment(pathname, "/services/")
  if (service && SERVICE_SLUGS.has(service))
    return { id: "service", pathname, slug: service }

  const article = segment(pathname, "/news/")
  if (article && newsSlugs.includes(article))
    return { id: "article", pathname, slug: article }

  const division = segment(pathname, "/divisions/")
  if (division && DIVISION_SLUGS.has(division))
    return { id: "division", pathname, slug: division }

  const project = segment(pathname, "/portfolio/project/")
  if (project && PROJECT_SLUGS.has(project))
    return { id: "project", pathname, slug: project }

  const portfolio = segment(pathname, "/portfolio/")
  if (portfolio && PORTFOLIO_SLUGS.has(portfolio))
    return { id: "portfolio", pathname, slug: portfolio }

  return { id: "not-found", pathname: normalized, slug: "" }
}

let prerenderPath: string | null = null

export function setPrerenderPath(pathname: string | null) {
  prerenderPath = pathname
}

export function getPathname(): string {
  if (prerenderPath != null) return prerenderPath
  if (typeof window === "undefined") return "/"
  return window.location.pathname
}

/** Bookmarks like /#/about never hit the server. Send them to the path URL. */
export function redirectLegacyHash(): boolean {
  if (typeof window === "undefined") return false
  const hash = window.location.hash
  if (!hash.startsWith("#/")) return false
  let rest = hash.slice(1)
  let anchor = ""
  const cut = rest.indexOf("#")
  if (cut >= 0) {
    anchor = rest.slice(cut)
    rest = rest.slice(0, cut)
  }
  const queryAt = rest.indexOf("?")
  const search = queryAt >= 0 ? rest.slice(queryAt) : ""
  let path = normalizePath(queryAt >= 0 ? rest.slice(0, queryAt) : rest)
  path = ALIASES[path] ?? path
  const dest = publicPath(path) + search + anchor
  const current =
    window.location.pathname + window.location.search + window.location.hash
  if (dest === current) return false
  window.location.replace(dest)
  return true
}

export function redirectAlias(): boolean {
  if (typeof window === "undefined") return false
  const alias = aliasTarget(window.location.pathname)
  if (!alias) return false
  window.location.replace(publicPath(alias) + window.location.search + window.location.hash)
  return true
}

export function navigate(to: string, replace = false) {
  const url = new URL(to, window.location.origin)
  if (url.origin !== window.location.origin) {
    window.location.assign(to)
    return
  }
  let path = normalizePath(url.pathname)
  const alias = ALIASES[path]
  if (alias) {
    path = alias
    replace = true
  }
  const next = publicPath(path) + url.search + url.hash
  const current =
    publicPath(window.location.pathname) + window.location.search + window.location.hash
  if (next === current) return
  window.history[replace ? "replaceState" : "pushState"](null, "", next)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

/** Intercept same-origin links so navigation stays in the app (boot splash runs once). */
export function installRouter() {
  if ("scrollRestoration" in window.history)
    window.history.scrollRestoration = "manual"
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!(event.target instanceof Element)) return
    const anchor = event.target.closest("a")
    if (!anchor) return
    if (anchor.target && anchor.target !== "_self") return
    if (anchor.hasAttribute("download")) return
    const href = anchor.getAttribute("href")
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    )
      return
    let url: URL
    try {
      url = new URL(href, window.location.href)
    } catch {
      return
    }
    if (url.origin !== window.location.origin) return
    if (
      normalizePath(url.pathname) === normalizePath(window.location.pathname) &&
      url.search === window.location.search
    )
      return
    event.preventDefault()
    navigate(url.pathname + url.search + url.hash)
  })
}

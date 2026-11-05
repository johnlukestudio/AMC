import { NEWS } from "./NewsPage"
import { projectBySlug } from "./projects"
import { absoluteUrl, resolveRoute, type RouteId } from "./routes"

const SITE_NAME = "American Millwork & Cabinetry"
const DEFAULT_DESCRIPTION =
  "American Millwork & Cabinetry builds custom architectural millwork, cabinetry and surfaces in Emmaus, PA. In-house fabrication for commercial projects since 2003."
const SITE_URL = "https://www.amcmillwork.com"

type SeoEntry = { title: string; description: string }

const SERVICE_TITLES: Record<string, string> = {
  millwork: "Millwork",
  casework: "Casework",
  acoustical: "Acoustical",
  surfaces: "Surfaces",
}

const PORTFOLIO_TITLES: Record<string, string> = {
  millwork: "Millwork Portfolio",
  casework: "Casework Portfolio",
  acoustics: "Acoustics Portfolio",
  all: "Portfolio",
}

const ROUTE_SEO: Record<string, SeoEntry> = {
  home: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    title: `About | ${SITE_NAME}`,
    description:
      "Learn about American Millwork & Cabinetry: custom architectural millwork and cabinetry from our Emmaus, PA shop since 2003.",
  },
  "casework-vs-millwork": {
    title: `Casework vs Millwork | ${SITE_NAME}`,
    description:
      "What is the difference between casework and millwork? A plain guide for architects and GCs, from AMC in Emmaus, PA.",
  },
  americase: {
    title: `Commercial Casework / AmeriCase | ${SITE_NAME}`,
    description:
      "AmeriCase commercial casework in laminate, veneer and solid wood. Bid-day pricing from our Emmaus, PA plant.",
  },
  "architectural-millwork": {
    title: `Architectural Millwork | ${SITE_NAME}`,
    description:
      "Architectural millwork companies in Pennsylvania and the Mid-Atlantic. Custom woodwork from AMC in Emmaus, PA.",
  },
  services: {
    title: `Services | ${SITE_NAME}`,
    description:
      "Architectural millwork, casework, acoustical products and surfaces engineered, fabricated and installed by AMC in Emmaus, PA.",
  },
  news: {
    title: `News | ${SITE_NAME}`,
    description:
      "Awards, project updates and company news from American Millwork & Cabinetry in Emmaus, PA.",
  },
  article: {
    title: `News | ${SITE_NAME}`,
    description:
      "Awards, project updates and company news from American Millwork & Cabinetry in Emmaus, PA.",
  },
  portfolio: {
    title: `Portfolio | ${SITE_NAME}`,
    description:
      "Selected architectural millwork, casework and acoustical projects by American Millwork & Cabinetry.",
  },
  millwork: {
    title: `Portfolio | ${SITE_NAME}`,
    description:
      "Selected architectural millwork, casework and acoustical projects by American Millwork & Cabinetry.",
  },
  project: {
    title: `Project | ${SITE_NAME}`,
    description:
      "Project gallery from American Millwork & Cabinetry: custom millwork fabricated in Emmaus, PA.",
  },
  careers: {
    title: `Careers | ${SITE_NAME}`,
    description:
      "Join American Millwork & Cabinetry in Emmaus, PA. Open roles for craftspeople and shop professionals.",
  },
  division: {
    title: "Divisions",
    description: "American Installers, the installation division of American Millwork & Cabinetry in Emmaus, PA.",
  },
  contact: {
    title: `Contact | ${SITE_NAME}`,
    description:
      "Contact American Millwork & Cabinetry at 840 Broad St, Emmaus, PA. Request a bid or visit the shop.",
  },
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function ensureOrganizationJsonLd() {
  const id = "amc-organization-jsonld"
  if (document.getElementById(id)) return
  const script = document.createElement("script")
  script.id = id
  script.type = "application/ld+json"
  script.textContent = JSON.stringify(ORGANIZATION_JSON_LD)
  document.head.appendChild(script)
}

export type SeoMeta = SeoEntry & { canonical: string | null }

function resolveSeo(id: RouteId, slug: string): SeoEntry {
  if (id === "not-found") {
    return {
      title: `Page not found | ${SITE_NAME}`,
      description: "That page is not on the American Millwork & Cabinetry site.",
    }
  }

  if (id === "division") {
    const names: Record<string, string> = { "american-installers": "American Installers", "amc-acoustical": "AMC Acoustical", "american-surfaces": "American Surfaces" }
    const name = names[slug] ?? "Divisions"
    return { title: `${name} | ${SITE_NAME}`, description: `${name}, a division of ${SITE_NAME} in Emmaus, PA.` }
  }

  if (id === "service") {
    const label = SERVICE_TITLES[slug] ?? "Services"
    return {
      title: `${label} | ${SITE_NAME}`,
      description: `Custom ${label.toLowerCase()} from American Millwork & Cabinetry. Engineered, fabricated and installed in Emmaus, PA.`,
    }
  }

  if (id === "insight") return ROUTE_SEO["casework-vs-millwork"]
  if (id === "americase") return ROUTE_SEO.americase
  if (id === "architectural-millwork") return ROUTE_SEO["architectural-millwork"]

  if (id === "article") {
    const post = NEWS.find((item) => item.slug === slug)
    if (!post) return ROUTE_SEO.news
    return { title: `${post.title} | ${SITE_NAME}`, description: post.excerpt }
  }

  if (id === "portfolio") {
    const label = PORTFOLIO_TITLES[slug] ?? "Portfolio"
    return {
      title: `${label} | ${SITE_NAME}`,
      description: ROUTE_SEO.millwork.description,
    }
  }

  if (id === "project") {
    const project = projectBySlug(slug)
    if (!project) return ROUTE_SEO.project
    return {
      title: `${project.name} | ${SITE_NAME}`,
      description: `${project.name}. Custom millwork by American Millwork & Cabinetry, fabricated in Emmaus, PA.`,
    }
  }

  return ROUTE_SEO[id] ?? ROUTE_SEO.home
}

export function seoForPath(pathname: string): SeoMeta {
  const route = resolveRoute(pathname)
  const entry = resolveSeo(route.id, route.slug)
  return {
    ...entry,
    canonical: route.id === "not-found" ? null : absoluteUrl(route.pathname),
  }
}

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "840 Broad St",
    addressLocality: "Emmaus",
    addressRegion: "PA",
    postalCode: "18049",
    addressCountry: "US",
  },
  sameAs: [],
}

const VIDEO_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "American Millwork: Who We Are",
  description:
    "A short film from the AMC shop in Emmaus, PA. See custom millwork built to field dimensions, vertical milling and QC at every step, then hear from employees about career growth and family values.",
  thumbnailUrl: "https://beta.amcmillwork.com/media/amc-film-poster.jpg",
  embedUrl: "https://www.youtube.com/embed/74eBYIORrts",
  contentUrl: "https://www.youtube.com/watch?v=74eBYIORrts",
  duration: "PT2M8S",
}

const VIDEO_ROUTES = new Set<RouteId>(["about", "careers"])

export function jsonLdForPath(pathname: string): { id: string; data: object }[] {
  const route = resolveRoute(pathname)
  const blocks: { id: string; data: object }[] = [{ id: "amc-organization-jsonld", data: ORGANIZATION_JSON_LD }]
  if (VIDEO_ROUTES.has(route.id)) blocks.push({ id: "amc-video-jsonld", data: VIDEO_JSON_LD })
  return blocks
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement("link")
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function removeLink(rel: string) {
  document.head.querySelector(`link[rel="${rel}"]`)?.remove()
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove()
}

/** Update document title and meta tags for the current path. Keeps noindex. */
export function applySeo(pathname: string) {
  const { title, description, canonical } = seoForPath(pathname)
  const route = resolveRoute(pathname)

  document.title = title
  document.documentElement.lang = "en"

  upsertMeta("name", "description", description)
  upsertMeta("name", "robots", "noindex, nofollow")

  upsertMeta("property", "og:title", title)
  upsertMeta("property", "og:description", description)
  upsertMeta("property", "og:type", "website")
  upsertMeta("property", "og:site_name", SITE_NAME)
  if (canonical) upsertMeta("property", "og:url", canonical)
  else removeMeta("property", "og:url")

  upsertMeta("name", "twitter:title", title)
  upsertMeta("name", "twitter:description", description)

  if (canonical) upsertLink("canonical", canonical)
  else removeLink("canonical")

  ensureOrganizationJsonLd()
  syncVideoJsonLd(route.id)
}

/** VideoObject structured data for the employee film on About and Careers. */
function syncVideoJsonLd(route: RouteId) {
  const id = "amc-video-jsonld"
  const existing = document.getElementById(id)
  if (!VIDEO_ROUTES.has(route)) {
    existing?.remove()
    return
  }
  if (existing) return
  const script = document.createElement("script")
  script.id = id
  script.type = "application/ld+json"
  script.textContent = JSON.stringify(VIDEO_JSON_LD)
  document.head.appendChild(script)
}

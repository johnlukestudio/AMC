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
  script.textContent = JSON.stringify({
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
  })
  document.head.appendChild(script)
}

function resolveSeo(route: string): SeoEntry {
  const hash = window.location.hash

  if (route === "service") {
    const slug = hash.replace(/^#\/services\//, "").split(/[?#]/)[0]
    if (slug === "commercial-casework") return ROUTE_SEO.americase
    if (slug === "architectural-millwork") return ROUTE_SEO["architectural-millwork"]
    const label = SERVICE_TITLES[slug] ?? "Services"
    return {
      title: `${label} | ${SITE_NAME}`,
      description: `Custom ${label.toLowerCase()} from American Millwork & Cabinetry. Engineered, fabricated and installed in Emmaus, PA.`,
    }
  }

  if (route === "insight") {
    const slug = hash.replace(/^#\/insights\/?/, "").split(/[?#]/)[0]
    return ROUTE_SEO[slug] ?? ROUTE_SEO["casework-vs-millwork"]
  }

  if (route === "americase") {
    return ROUTE_SEO.americase
  }

  if (route === "architectural-millwork") {
    return ROUTE_SEO["architectural-millwork"]
  }

  if (route === "millwork") {
    const slug = hash.replace(/^#\/portfolio\/?/, "").split(/[?#]/)[0] || "millwork"
    const label = PORTFOLIO_TITLES[slug] ?? "Portfolio"
    return {
      title: `${label} | ${SITE_NAME}`,
      description: ROUTE_SEO.millwork.description,
    }
  }

  return ROUTE_SEO[route] ?? ROUTE_SEO.home
}

/** Update document title and meta tags for the current hash route. Keeps noindex. */
export function applySeo(route: string) {
  const { title, description } = resolveSeo(route)

  document.title = title
  document.documentElement.lang = "en"

  upsertMeta("name", "description", description)
  upsertMeta("name", "robots", "noindex, nofollow")

  upsertMeta("property", "og:title", title)
  upsertMeta("property", "og:description", description)
  upsertMeta("property", "og:type", "website")
  upsertMeta("property", "og:site_name", SITE_NAME)

  upsertMeta("name", "twitter:title", title)
  upsertMeta("name", "twitter:description", description)

  ensureOrganizationJsonLd()
}

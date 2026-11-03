import { createServer } from "vite"
import fs from "node:fs"
import path from "node:path"

const dist = path.resolve("dist")
const templatePath = path.join(dist, "index.html")
const template = fs.readFileSync(templatePath, "utf8")

const vite = await createServer({
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: "custom",
  logLevel: "error",
})

function escapeText(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeAttr(value) {
  return escapeText(value).replace(/"/g, "&quot;")
}

function decode(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

function stripMeta(html, attr, key) {
  const re = new RegExp(
    `\\s*<meta\\b[^>]*\\b${attr}=["']${key}["'][^>]*>`,
    "gi",
  )
  return html.replace(re, "")
}

function applyHead(html, seo, jsonLd) {
  let next = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeText(seo.title)}</title>`,
  )
  next = stripMeta(next, "name", "description")
  next = stripMeta(next, "property", "og:title")
  next = stripMeta(next, "property", "og:description")
  next = stripMeta(next, "property", "og:url")
  next = stripMeta(next, "property", "og:type")
  next = stripMeta(next, "property", "og:site_name")
  next = stripMeta(next, "name", "twitter:title")
  next = stripMeta(next, "name", "twitter:description")
  next = next.replace(/\s*<link\b[^>]*\brel=["']canonical["'][^>]*>/gi, "")

  const tags = [
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="American Millwork &amp; Cabinetry" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
  ]
  if (seo.canonical) {
    tags.push(`<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`)
    tags.push(
      `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    )
  }
  for (const block of jsonLd) {
    tags.push(
      `<script id="${block.id}" type="application/ld+json">${JSON.stringify(block.data)}</script>`,
    )
  }
  const block = `    ${tags.join("\n    ")}\n`
  if (!next.includes("</head>")) throw new Error("Template is missing </head>")
  return next.replace("</head>", `${block}</head>`)
}

function writeHtml(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx")
  const { listIndexablePaths, absoluteUrl } =
    await vite.ssrLoadModule("/src/routes.ts")
  const { seoForPath, jsonLdForPath } = await vite.ssrLoadModule("/src/seo.ts")

  const paths = listIndexablePaths()
  if (!paths.includes("/") || paths.length < 20) {
    throw new Error(
      `Unexpected route list (${paths.length}): ${paths.join(", ")}`,
    )
  }

  for (const pathname of paths) {
    const seo = seoForPath(pathname)
    if (!seo.canonical) throw new Error(`Missing canonical for ${pathname}`)
    const body = render(pathname)
    if (body.length < 400)
      throw new Error(
        `Prerender for ${pathname} looks empty (${body.length} bytes)`,
      )
    let html = template.replace(
      /<div id="root">\s*<\/div>/,
      `<div id="root">${body}</div>`,
    )
    if (!html.includes(body.slice(0, 40)))
      throw new Error(`Failed to inject markup for ${pathname}`)
    html = applyHead(html, seo, jsonLdForPath(pathname))
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
    if (decode(title ?? "") !== seo.title) {
      throw new Error(
        `Title mismatch for ${pathname}: ${title} !== ${seo.title}`,
      )
    }
    if (!html.includes(`rel="canonical" href="${seo.canonical}"`)) {
      throw new Error(`Canonical missing for ${pathname}`)
    }
    if (!html.includes('name="robots" content="noindex, nofollow"')) {
      throw new Error(`robots noindex missing for ${pathname}`)
    }
    const file =
      pathname === "/"
        ? path.join(dist, "index.html")
        : path.join(dist, "prerender", `${pathname.slice(1)}.html`)
    writeHtml(file, html)
  }

  const notFoundSeo = seoForPath("/404")
  const notFoundBody = render("/404")
  let notFoundHtml = template.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${notFoundBody}</div>`,
  )
  notFoundHtml = applyHead(notFoundHtml, notFoundSeo, jsonLdForPath("/404"))
  if (!notFoundHtml.includes("Page not found"))
    throw new Error("404 page is missing its heading")
  writeHtml(path.join(dist, "404.html"), notFoundHtml)

  const urls = paths
    .map((pathname) => `  <url><loc>${absoluteUrl(pathname)}</loc></url>`)
    .join("\n")
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap)
  console.log(`Prerendered ${paths.length} routes + 404, wrote sitemap.xml`)
} finally {
  await vite.close()
}

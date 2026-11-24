/**
 * Go-live switch. Leave these values while the site is on beta.
 *
 * At launch, change this file in one step:
 * 1. Set indexable to true.
 * 2. Set origin to productionOrigin (https://amcmillwork.com, the apex, not www).
 * 3. On the host, before that deploy, apply deploy/nginx-launch.inactive.conf
 *    so robots.txt is not cached for a year, trailing-slash redirects stay on
 *    HTTPS, HSTS is sent, and the WordPress 301 map is live.
 * Do not flip this file on the beta host.
 */
export const SITE_LAUNCH = {
  indexable: false,
  origin: "https://beta.amcmillwork.com",
  productionOrigin: "https://amcmillwork.com",
} as const

export function robotsTxt(): string {
  if (SITE_LAUNCH.indexable) {
    return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_LAUNCH.origin}/sitemap.xml\n`
  }
  return "User-agent: *\nAllow: /email/\nDisallow: /\n\nUser-agent: GoogleImageProxy\nAllow: /email/\nDisallow: /\n"
}

export const ROBOTS_META = SITE_LAUNCH.indexable ? "index, follow" : "noindex, nofollow"

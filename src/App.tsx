import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { MillworkPortfolio } from "./MillworkPortfolio"
import { ProjectPage } from "./ProjectPage"
import { AboutPage, VideoFeature } from "./AboutPage"
import { CareersPage } from "./CareersPage"
import { ArticlePage, NewsPage } from "./NewsPage"
import { ServiceDetail, ServicesOverview, useRowReveal } from "./ServicesPage"
import { applySeo } from "./seo"

const asset = "/media"

/* Real American Millwork & Cabinetry project photography, curated per section */
const processImgs = [
  `${asset}/62abe.png`, // Consultation
  `${asset}/08f78.png`, // Engineering & Shop Drawings
  `${asset}/cf31d.png`, // Fabrication
  `${asset}/f4bae.png`, // Delivery & Installation
]
const serviceImgs = [
  `${asset}/02cb0.png`, // Architectural Millwork
  `${asset}/6dc05.png`, // Casework & Cabinetry
  `${asset}/2e51c.png`, // Solid Surface & Stone
  `${asset}/f291a.png`, // Plastic Laminate Fabrication
]
const projectImgs = [
  `${asset}/e5b5d.png`,
  `${asset}/8b3b0.png`,
  `${asset}/6f79e.png`,
  `${asset}/185d7.png`,
  `${asset}/40490.png`,
  `${asset}/b1ab7.png`,
  `${asset}/197f8.png`,
]
const testimonialBg = `${asset}/681ca.png`
const logo = `${asset}/73d6c.svg`

/* Hero category images (AMC divisions) */
const HERO_CATEGORIES = [
  { name: "Millwork", img: `${asset}/cat-millwork.png` },
  { name: "Casework", img: `${asset}/cat-casework.png` },
  { name: "Acoustics", img: `${asset}/cat-acoustics.png` },
  { name: "Surfaces", img: serviceImgs[2] },
]
const arrowPrev = `${asset}/50a22.svg`
const arrowNext = `${asset}/fa423.svg`
const emailArrow = `${asset}/fa403.svg`

const logoWhite = `${asset}/logo-white.svg`

export const SERVICES = [
  { title: "Millwork", slug: "millwork", img: serviceImgs[0] },
  { title: "Casework", slug: "casework", img: serviceImgs[1] },
  { title: "Acoustical", slug: "acoustical", img: `${asset}/cat-acoustics.png` },
  { title: "Surfaces", slug: "surfaces", img: serviceImgs[2] },
]

type NavLink = { label: string; href: string; children?: NavLink[] }
type NavItem = { label: string; href?: string; items?: NavLink[] }

const DIVISIONS: NavLink[] = [
  { label: "American Millwork", href: "#/services/millwork" },
  { label: "AmeriCase", href: "#/services/casework" },
  { label: "AMC Acoustical", href: "#/services/acoustical" },
  { label: "American Surfaces", href: "#/services/surfaces" },
]

const NAV: NavItem[] = [
  {
    label: "Company",
    items: [
      { label: "About us", href: "#/about" },
      { label: "Careers", href: "#/careers" },
      { label: "Our Divisions", href: "#/services", children: DIVISIONS },
    ],
  },
  { label: "Services", href: "#/services", items: SERVICES.map((x) => ({ label: x.title, href: `#/services/${x.slug}` })) },
  {
    label: "Portfolio",
    items: [
      { label: "Millwork", href: "#/portfolio/millwork" },
      { label: "Casework", href: "#/portfolio/casework" },
      { label: "Acoustics", href: "#/portfolio/acoustics" },
      { label: "All projects", href: "#/portfolio/all" },
    ],
  },
  { label: "News", href: "#/news" },
]

export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="text-body2-s leading-none capitalize text-current">
      {children}
    </span>
  )
}

export function OutlineButton({
  children,
  dark = false,
}: {
  children: string
  dark?: boolean
}) {
  return (
    <button
      className={`group inline-flex items-center justify-center rounded-full border px-6 py-[10px] text-caption-s uppercase tracking-wide transition-colors duration-300 ${
        dark
          ? "border-white text-white hover:bg-white hover:text-black"
          : "border-black text-black hover:bg-black hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}

/* ---------- Header ---------- */
function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="6" viewBox="0 0 8 5" fill="none" className={className} aria-hidden>
      <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/* Fixed-width tabular index so every label in a list starts on the same line. */
function Idx({ n, className = "" }: { n: number; className?: string }) {
  return <span className={`w-6 shrink-0 tabular-nums text-caption-s opacity-50 ${className}`}>{String(n).padStart(2, "0")}</span>
}

/* Tablet / mobile drawer: slides in from the left, groups expand as accordions. */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [sub, setSub] = useState<string | null>(null)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (!open) {
      setExpanded(null)
      setSub(null)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])
  const rowCls = "flex items-center gap-4 bg-neutral-100 px-4 py-4 text-body2-m transition-colors hover:bg-black hover:text-white"
  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 max-md:pt-[64px] md:px-10">
        <a href="#/" aria-label="American Millwork & Cabinetry">
          <img src={logo} alt="American Millwork & Cabinetry" className="h-[26px] w-auto md:h-[31px]" />
        </a>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-10 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-6 md:px-10">
        <ul>
          {NAV.map((item, n) => {
            const isOpen = expanded === item.label
            return (
              <li
                key={item.label}
                className={`border-b border-black/10 transition duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${120 + n * 50}ms` : "0ms" }}
              >
                {item.items ? (
                  <>
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <Idx n={n + 1} className="opacity-100 text-black/40" />
                        <span className="text-h4-m md:text-h3-s">{item.label}</span>
                      </span>
                      <span
                        className={`flex size-8 items-center justify-center rounded-full border border-black/15 transition-transform duration-300 ${isOpen ? "rotate-180 bg-black text-white" : ""}`}
                      >
                        <Chevron />
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <ul className="overflow-hidden">
                        {item.href && (
                          <li>
                            <a href={item.href} className={`${rowCls} justify-between`}>
                              All {item.label.toLowerCase()} <span aria-hidden>↗</span>
                            </a>
                          </li>
                        )}
                        {item.items.map((link, i) => (
                          <li key={link.label} className="mt-2 last:mb-5">
                            {link.children ? (
                              <>
                                <button
                                  onClick={() => setSub(sub === link.label ? null : link.label)}
                                  aria-expanded={sub === link.label}
                                  className={`${rowCls} w-full text-left`}
                                >
                                  <Idx n={i + 1} />
                                  <span className="flex-1">{link.label}</span>
                                  <Chevron className={`transition-transform duration-300 ${sub === link.label ? "rotate-180" : ""}`} />
                                </button>
                                <div
                                  className={`grid transition-[grid-template-rows] duration-500 ${sub === link.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                                >
                                  <ul className="overflow-hidden border-l border-black/15 pl-4">
                                    {link.children.map((c, j) => (
                                      <li key={c.label} className="mt-2">
                                        <a href={c.href} className={rowCls}>
                                          <Idx n={j + 1} />
                                          <span className="flex-1">{c.label}</span>
                                          <span aria-hidden>↗</span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            ) : (
                              <a href={link.href} className={rowCls}>
                                <Idx n={i + 1} />
                                <span className="flex-1">{link.label}</span>
                                <span aria-hidden>↗</span>
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a href={item.href} className="flex items-baseline gap-4 py-5">
                    <Idx n={n + 1} className="opacity-100 text-black/40" />
                    <span className="text-h4-m md:text-h3-s">{item.label}</span>
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="border-t border-black/10 px-6 py-5 md:px-10">
        <a
          href="#/contact"
          className="flex h-12 w-full items-center justify-center rounded-full bg-black text-caption-m uppercase tracking-wide text-white transition-colors hover:bg-black/80"
        >
          Contact
        </a>
      </div>
    </div>
  )
}

function Header({ overDark = false }: { overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Closes dropdowns after navigating until the pointer leaves the menu.
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    const onHash = () => {
      ;(document.activeElement as HTMLElement | null)?.blur()
      setClosed(true)
      setMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("hashchange", onHash)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener("keydown", onKey)
    }
  }, [])
  const light = overDark && !scrolled && !hover
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const linkCls = "flex items-center gap-3 px-3 py-2.5 text-caption-m text-black/70 transition-colors hover:bg-black hover:text-white"
  return (
    <>
      <header
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-light={light || undefined}
        className={`fixed top-0 left-0 right-0 z-50 ${light ? "" : "max-md:bg-white"} max-md:pt-11 transition-colors duration-300 hover:bg-white ${
          scrolled ? "bg-white/85 backdrop-blur-md border-b border-black/5" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1750px] items-center justify-between px-6 py-4 md:px-10 lg:py-5">
          <a href="#/" className="flex items-center" aria-label="American Millwork & Cabinetry">
            <img
              src={light ? logoWhite : logo}
              alt="American Millwork & Cabinetry"
              className="h-[26px] w-auto md:h-[31px]"
            />
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) =>
              item.items ? (
                <div key={item.label} className="group relative" onMouseLeave={() => setClosed(false)}>
                  <a
                    href={item.href}
                    className="flex cursor-pointer items-center gap-1.5 py-2 text-caption-m text-black/70 transition-colors group-hover:text-black group-focus-within:text-black"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <Chevron className="transition-transform duration-300 group-hover:rotate-180" />
                  </a>
                  <div
                    className={`invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition duration-200 ${closed ? "" : "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"} group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100`}
                  >
                    <ul className="min-w-[220px] border border-black/10 bg-white p-2 shadow-[0_12px_32px_-12px_rgba(30,30,30,0.18)]">
                      {item.items.map((link, i) => (
                        <li key={link.label} className="group/sub relative">
                          <a href={link.href} className={linkCls}>
                            <Idx n={i + 1} />
                            <span className="flex-1">{link.label}</span>
                            {link.children && <Chevron className="-rotate-90" />}
                          </a>
                          {link.children && (
                            <div
                              className={`invisible absolute left-full top-0 pl-2 opacity-0 transition duration-200 ${closed ? "" : "group-hover/sub:visible group-hover/sub:opacity-100"} group-focus-within/sub:visible group-focus-within/sub:opacity-100`}
                            >
                              <ul className="min-w-[220px] border border-black/10 bg-white p-2 shadow-[0_12px_32px_-12px_rgba(30,30,30,0.18)]">
                                {link.children.map((c, j) => (
                                  <li key={c.label}>
                                    <a href={c.href} className={linkCls}>
                                      <Idx n={j + 1} />
                                      <span className="flex-1">{c.label}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-caption-m text-black/70 transition-colors hover:text-black"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#/contact" tabIndex={-1} className="hidden sm:block">
              <OutlineButton dark={light}>Contact</OutlineButton>
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={`flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
                light ? "border-white/60 text-white hover:bg-white hover:text-black" : "border-black/20 text-black hover:bg-black hover:text-white"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M0 3h14M0 7h14M0 11h14" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
  const [active, setActive] = useState(0)
  // Touch devices have no hover: cycle categories automatically.
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % HERO_CATEGORIES.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <>
    <section className="bg-white px-6 pt-[150px] pb-16 md:hidden">
      <h1 className="text-center font-normal uppercase leading-[0.9] tracking-[-0.03em] text-[15vw]">
        America's
        <br />
        Millwork
      </h1>
      <div className="mt-6 flex justify-between text-caption-s uppercase tracking-[0.04em]">
        <span>Custom Millwork</span>
        <span>since 2003</span>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {HERO_CATEGORIES.map((c, i) => (
          <figure key={c.name}>
            <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
              <img src={c.img} alt={c.name} className="size-full object-cover" />
            </div>
            <figcaption className="mt-2 flex justify-between text-caption-m">
              <span>{c.name}</span>
              <span className="text-black/50">0{i + 1}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
    <section className="relative hidden bg-white md:block">
      <div className="sticky top-0 flex h-screen min-h-[640px] items-end overflow-hidden">
        {/* Crosshair + interactive category layer */}
        <div
          ref={wrapRef}
          className="absolute inset-0"
          onMouseMove={(e) => {
            const r = wrapRef.current?.getBoundingClientRect()
            if (!r) return
            setPos({
              x: (e.clientX - r.left) / r.width,
              y: (e.clientY - r.top) / r.height,
            })
          }}
        >
          {/* Crosshair guide lines */}
          <div
            className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-black/30"
            style={{ top: `${pos.y * 100}%` }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 border-l border-dashed border-black/30"
            style={{ left: `${pos.x * 100}%` }}
          />
          {/* Crosshair viewport — image swaps with active category */}
          <div
            className="pointer-events-none absolute hidden size-[220px] -translate-x-1/2 -translate-y-1/2 overflow-hidden [@media(hover:hover)_and_(min-width:768px)]:block"
            style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
          >
            <span className="absolute left-0 top-0 z-10 size-[10px] border-l border-t border-black/50" />
            <span className="absolute right-0 top-0 z-10 size-[10px] border-r border-t border-black/50" />
            <span className="absolute bottom-0 left-0 z-10 size-[10px] border-b border-l border-black/50" />
            <span className="absolute bottom-0 right-0 z-10 size-[10px] border-b border-r border-black/50" />
            {HERO_CATEGORIES.map((c, i) => (
              <img
                key={c.name}
                src={c.img}
                alt={c.name}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Category name overlaid on the image, top */}
            <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/50 to-transparent pt-3 pb-6 text-center">
              <span className="text-caption-m uppercase tracking-[0.18em] text-white">
                {HERO_CATEGORIES[active].name}
              </span>
            </div>
          </div>

          {/* Touch / mobile: centered category card */}
          <div className="pointer-events-none absolute left-1/2 top-[44%] aspect-[4/5] w-[min(56vw,300px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden [@media(hover:hover)_and_(min-width:768px)]:hidden">
            {HERO_CATEGORIES.map((c, i) => (
              <img
                key={c.name}
                src={c.img}
                alt={c.name}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/50 to-transparent pt-3 pb-6 text-center">
              <span className="text-caption-m uppercase tracking-[0.18em] text-white">{HERO_CATEGORIES[active].name}</span>
            </div>
          </div>

          {/* Three category divider zones */}
          <div className="absolute inset-0 flex">
            {HERO_CATEGORIES.map((c, i) => (
              <div
                key={c.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative flex flex-1 flex-col items-center px-6 pt-28 pb-32 transition-colors duration-300 md:px-8 ${
                  i > 0 ? "border-l border-dashed border-black/25" : ""
                }`}
              >
                <span
                  className={`text-caption-m uppercase tracking-[0.16em] transition-colors duration-300 ${
                    i === active ? "text-black" : "text-black/40"
                  }`}
                >
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Corner labels */}
          <div className="pointer-events-none absolute left-[max(1.5rem,calc(50%-875px+1.5rem))] top-[22%] md:top-1/2 -translate-y-1/2 text-caption-s uppercase tracking-[0.04em] text-black md:left-[max(2.5rem,calc(50%-875px+2.5rem))]">
            Custom Millwork
          </div>
          <div className="pointer-events-none absolute right-[max(1.5rem,calc(50%-875px+1.5rem))] top-[22%] md:top-1/2 -translate-y-1/2 text-caption-s uppercase tracking-[0.04em] text-black md:right-[max(2.5rem,calc(50%-875px+2.5rem))]">
            since 2003
          </div>
        </div>

        {/* Big headline — spans full width, edge to edge */}
        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1750px] px-6 pb-8 md:px-10 md:pb-12">
          <h1 className="w-full text-center font-normal uppercase leading-[0.9] tracking-[-0.03em] text-[15vw] md:whitespace-nowrap md:text-[min(8.7vw,152px)]">
            America's <br className="md:hidden" />
            Millwork
          </h1>
        </div>
      </div>
    </section>
    </>
  )
}

/* Locked-off plant exterior; simple loop (flags only). Poster when reduced motion. */
function AboutPlantBg() {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      const prefersReduce = mq.matches
      setReduce(prefersReduce)
      const v = ref.current
      if (!v) return
      if (prefersReduce) {
        v.pause()
      } else {
        void v.play().catch(() => {})
      }
    }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return (
    <>
      {reduce ? (
        <img
          src={`${asset}/home/plant.jpg`}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
          aria-hidden
        />
      ) : (
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover opacity-40"
          autoPlay
          muted
          playsInline
          loop
          poster={`${asset}/home/plant.jpg`}
          aria-label="American Millwork & Cabinetry plant exterior in Emmaus"
        >
          <source src={`${asset}/home/plant.mp4`} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/50" />
    </>
  )
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { n: "23+", label: "Years in business" },
    { n: "1,200+", label: "Projects delivered" },
    { n: "3", label: "States served" },
    { n: "100%", label: "Custom fabrication" },
  ]
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <AboutPlantBg />
      <div className="relative mx-auto grid max-w-[1750px] gap-16 px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
        <div>
          <Eyebrow>About us</Eyebrow>
          <h2 className="mt-14 text-h3-s md:text-h3-m xl:text-h3-l leading-[1.1] ">
            Two decades of custom millwork, made in-house.
          </h2>
          <p className="mt-6 max-w-md text-body1-s leading-[1.6] text-white/70">
            American Millwork &amp; Cabinetry and our subsidiaries provide
            high-quality custom architectural millwork for institutions,
            offices, luxury apartment buildings, resorts, healthcare facilities
            and retail spaces.
          </p>
          <div className="mt-10">
            <OutlineButton dark>Explore more</OutlineButton>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-baseline gap-6 border-b border-white/30 py-6"
            >
              <span className="w-28 text-h3-s md:text-h3-m xl:text-h3-l leading-none tracking-tight">
                {s.n}
              </span>
              <span className="text-body1-s text-white/80">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Services ---------- */
function Services() {
  const ref = useRowReveal(SERVICES.length)
  return (
    <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
      <div className="flex items-center justify-between">
        <Eyebrow>services</Eyebrow>
        <a href="#/services" tabIndex={-1}>
          <OutlineButton>All services</OutlineButton>
        </a>
      </div>
      <div className="mt-12">
        {SERVICES.map(({ title, slug, img }, i) => (
          <a
            key={title}
            href={`#/services/${slug}`}
            ref={ref(i)}
            className="group grid grid-cols-1 items-center gap-6 border-b border-black/10 py-2 md:grid-cols-2"
          >
            <div
              className="flex items-center gap-6"
              style={{ opacity: "var(--fade, 1)", transform: "translateY(var(--shift, 0px))" }}
            >
              <span className="text-body2-s text-black/50">[{String(i + 1).padStart(2, "0")}]</span>
              <h3 className="text-h4-m xl:text-h4-l leading-tight">{title}</h3>
            </div>
            <div
              className="h-[220px] w-full overflow-hidden md:h-[300px]"
              style={{ clipPath: "inset(0 var(--clip, 0%) 0 0)" }}
            >
              <img
                src={img}
                alt={title}
                className="size-full object-cover"
                style={{ transform: "scale(var(--scale, 1))", transformOrigin: "left center" }}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ---------- Locations ---------- */
const LOCATIONS = [
  {
    city: "Emmaus, PA",
    role: "Main office & manufacturing",
    note: "Lehigh Valley",
  },
  {
    city: "Annapolis, MD",
    role: "Additional office",
    note: "Chesapeake region",
  },
]
const REACH = [
  "New York",
  "New Jersey",
  "Philadelphia",
  "Harrisburg",
  "Baltimore",
  "Washington, D.C.",
]

const FACTORY = [
  {
    src: "/media/factory/11af8e22_image.png",
    alt: "AMC craftsman measuring a panel",
  },
  { src: "/media/factory/bc70d6ea_image.png", alt: "AMC shop floor" },
  {
    src: "/media/factory/6cf042d6_image.png",
    alt: "Holz-Her CNC machining center",
  },
  {
    src: "/media/factory/2777aef6_image.png",
    alt: "AMC team assembling casework",
  },
]

function LocationsPlantMedia() {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      const prefersReduce = mq.matches
      setReduce(prefersReduce)
      const v = ref.current
      if (!v) return
      if (prefersReduce) {
        v.pause()
      } else {
        void v.play().catch(() => {})
      }
    }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return reduce ? (
    <img
      src={`${asset}/home/plant.jpg`}
      alt="AMC headquarters and manufacturing facility in Emmaus, PA"
      className="absolute inset-0 size-full object-cover"
    />
  ) : (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      autoPlay
      muted
      playsInline
      loop
      poster={`${asset}/home/plant.jpg`}
      aria-label="AMC headquarters and manufacturing facility in Emmaus, PA"
    >
      <source src={`${asset}/home/plant.mp4`} type="video/mp4" />
    </video>
  )
}

function Locations() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1750px] px-6 py-16 md:px-10 md:py-20">
        <Eyebrow>our locations</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-10 md:h-[min(62vh,620px)] md:grid-cols-12">
          <div className="flex min-h-0 flex-col gap-3 md:col-span-7">
            <div className="relative min-h-[220px] flex-1 overflow-hidden">
              <LocationsPlantMedia />
              <span className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 text-caption-s uppercase tracking-wide backdrop-blur-sm">
                Emmaus, PA · HQ &amp; shop
              </span>
            </div>
            <div className="grid shrink-0 grid-cols-4 gap-3">
              {FACTORY.map((p) => (
                <div key={p.src} className="overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="aspect-[4/3] w-full object-cover opacity-80 transition duration-500 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center md:col-span-5">
            <h2 className="text-h3-s xl:text-h3-m capitalize leading-[1.1] ">
              Built in the Lehigh Valley. Installed across the Northeast.
            </h2>
            <p className="mt-4 max-w-md text-body2-s leading-[1.6] text-white/60">
              Our main office and manufacturing facility is located in Emmaus,
              Pennsylvania, in the Lehigh Valley, a reasonable drive from the
              major markets of the Northeast corridor.
            </p>
            <div className="mt-6 border-t border-white/20">
              {LOCATIONS.map((l, i) => (
                <div
                  key={l.city}
                  className="grid grid-cols-[auto_1fr] gap-6 border-b border-white/20 py-4"
                >
                  <span className="text-body2-s text-white/50">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <div>
                    <div className="text-h4-m leading-tight">{l.city}</div>
                    <div className="mt-1 text-body2-s text-white/60">
                      {l.role} · {l.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="text-caption-s uppercase tracking-wide text-white/50">
                Within reach of
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {REACH.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-white/30 px-4 py-[6px] text-caption-s"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Memberships & Certifications ---------- */
const MEMBERSHIPS = [
  {
    logo: `${asset}/certs/6810e343_awi-150x126.gif`,
    name: "Architectural Woodwork\nInstitute",
  },
  {
    logo: `${asset}/certs/3e059684_cawi-150x126.gif`,
    name: "AWI Quality\nCertification Program",
  },
  {
    logo: `${asset}/certs/9b0fed08_abc.gif`,
    name: "Associated Builders\n& Contractors",
  },
  {
    logo: `${asset}/certs/3e731f29_gwa.gif`,
    name: "Green Advantage\nLEED Accredited",
  },
  {
    logo: `${asset}/certs/63c102ec_FSClogo.png`,
    name: "Forest Stewardship Council\nC109137",
  },
  {
    logo: `${asset}/certs/85a2866d_Cisca-Logo-300x300.jpg`,
    name: "Ceilings & Interior Systems\nConstruction Assoc.",
  },
]

function Memberships() {
  return (
    <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>members of</Eyebrow>
        </div>
        <div className="space-y-4 text-body2-s leading-[1.6] text-black/60 md:col-span-8 md:max-w-xl">
          <p>
            We are LEED Accredited, so our in-house experts can guide your
            project to successful completion with{" "}
            <a href="#" className="text-black underline underline-offset-4">
              Green Advantage
            </a>
            .
          </p>
          <p>
            Please{" "}
            <a href="#" className="text-black underline underline-offset-4">
              ask us
            </a>{" "}
            about the availability of FSC® Certified products.
          </p>
        </div>
      </div>
      <ul className="mt-12 grid grid-cols-2 border-l border-t border-black/10 md:grid-cols-3 lg:grid-cols-6">
        {MEMBERSHIPS.map((m, i) => (
          <li
            key={m.name}
            className="group flex aspect-square flex-col justify-between border-b border-r border-black/10 p-5"
          >
            <span className="text-center text-caption-s text-black/40">
              [{String(i + 1).padStart(2, "0")}]
            </span>
            <img
              src={m.logo}
              alt={m.name}
              className="mx-auto h-16 w-auto max-w-[70%] object-contain mix-blend-multiply grayscale opacity-70 transition duration-300 group-hover:opacity-100"
            />
            <span className="flex h-[34px] items-center justify-center whitespace-pre-line text-center text-caption-s leading-snug text-black/50">
              {m.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    quote:
      "Material choices, proportions, thresholds. Every detail felt considered. The craftsmanship raised the entire project.",
    name: "Client Name",
    role: "Role · Company",
  },
  {
    quote:
      "AMC delivered complex casework on schedule and to an exceptional standard. A true fabrication partner.",
    name: "Client Name",
    role: "Role · Company",
  },
  {
    quote:
      "From shop drawings to install, the team was precise, responsive, and a pleasure to build with.",
    name: "Client Name",
    role: "Role · Company",
  },
]

function Testimonials() {
  const [idx, setIdx] = useState(1)
  const t = TESTIMONIALS[idx]
  return (
    <section className="relative overflow-hidden">
      <img
        src={testimonialBg}
        alt="Finished architectural millwork interior by American Millwork & Cabinetry"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto flex max-w-[1750px] items-center justify-center px-6 py-28 md:py-40">
        <div className="w-full max-w-[700px] bg-white p-10">
          <span className="font-serif text-h2-s xl:text-h2-m leading-none">“</span>
          <p className="mt-4 text-body1-s leading-[1.6] text-black">{t.quote}</p>
          <div className="mt-6 h-px bg-black/15" />
          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="text-body2-s">{t.name}</div>
              <div className="mt-1 text-caption-s tracking-wide text-black/40">
                {t.role}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="mr-2 flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-[6px] rounded-full transition-all ${
                      i === idx ? "w-5 bg-black" : "w-3 bg-black/25"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setIdx(
                    (p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                  )
                }
                className="flex size-9 items-center justify-center rounded-full border border-black/20 transition-colors hover:bg-black/5"
                aria-label="Previous testimonial"
              >
                <img src={arrowPrev} alt="" className="size-4" />
              </button>
              <button
                onClick={() => setIdx((p) => (p + 1) % TESTIMONIALS.length)}
                className="flex size-9 items-center justify-center rounded-full border border-black/20 transition-colors hover:bg-black/5"
                aria-label="Next testimonial"
              >
                <img src={arrowNext} alt="" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
const FOOTER_COLUMNS: { title: string; href?: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "#/about" },
      { label: "Careers", href: "#/careers" },
      { label: "News", href: "#/news" },
      { label: "Contact", href: "#/contact" },
    ],
  },
  { title: "Our Divisions", links: DIVISIONS },
  ...NAV.filter((n) => n.items && n.label !== "Company").map((n) => ({ title: n.label, href: n.href, links: n.items! })),
  {
    title: "Social",
    links: ["Instagram", "LinkedIn", "Facebook"].map((l) => ({ label: l, href: "#" })),
  },
]

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-400 text-white">
      <div className="relative mx-auto max-w-[1750px] px-6 py-20 md:px-10 md:py-28">
        {/* Same 5-column grid + gap as the sitemap below, so columns line up */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start lg:grid-cols-5 lg:gap-x-6">
          <div className="lg:col-span-2">
            <img
              src={logoWhite}
              alt="American Millwork & Cabinetry"
              className="h-[38px] w-auto"
            />
            <p className="mt-6 max-w-[400px] text-pretty text-body2-s leading-[1.6] text-white/70">
              American Millwork &amp; Cabinetry, custom architectural millwork
              and casework for institutional, commercial, and residential
              spaces.
            </p>
            <div className="mt-8">
              <a href="#/contact">
                <OutlineButton dark>Contact us</OutlineButton>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-h4-m font-bold xl:text-h4-l">Get in touch</h4>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 text-body2-s sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              <div>
                <div className="text-white/70">Email</div>
                <a href="#" className="mt-1 inline-flex items-center gap-2">
                  info@americanmillwork.com
                  <img src={emailArrow} alt="" className="size-[18px] invert" />
                </a>
              </div>
              <div>
                <div className="text-white/70">Phone</div>
                <div className="mt-1">+1 (973) 560-6043</div>
              </div>
              <div>
                <div className="text-white/70">Office</div>
                <div className="mt-1">Philadelphia, PA · New York · New Jersey</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sitemap: every dropdown destination is reachable directly from the footer */}
        <nav aria-label="Footer" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/25 pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              {col.href ? (
                <a href={col.href} className="group inline-flex items-center gap-2 text-body2-s font-medium">
                  {col.title}
                  <span className="text-caption-s transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ) : (
                <span className="text-body2-s font-medium">{col.title}</span>
              )}
              <ul className="mt-5 space-y-2.5 text-body2-s">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/70 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-20 text-body2-s text-white/70">
          © 2026 American Millwork &amp; Cabinetry. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

/* ---------- Contact page ---------- */
const contactImg = `${asset}/9765d.png`

function ContactPage() {
  const [sent, setSent] = useState(false)
  const field =
    "w-full rounded-lg border border-black/20 bg-white px-4 py-3 text-body2-s text-black outline-none transition placeholder:text-black/30 hover:border-black/40 focus:border-dark-950 focus:ring-4 focus:ring-green-100"
  return (
    <>
      <section className="mx-auto grid max-w-[1750px] grid-cols-1 gap-16 px-6 pt-32 md:grid-cols-2 md:px-10 md:pt-[140px]">
        <div className="flex flex-col justify-center pb-4">
          <Eyebrow>contact</Eyebrow>
          <h1 className="mt-6 text-h3-s md:text-h3-m xl:text-h3-l capitalize leading-[1.4] text-dark-950 ">
            How to find us
          </h1>
          <div className="mt-10 rounded-2xl border border-black/10 bg-green-50 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] md:p-10">
          {sent ? (
            <p role="status" className="rounded-lg border border-black/10 bg-white p-6 text-body2-s leading-[1.6] text-black/70">
              Thanks, your message is on its way. Our team will get back to you shortly.
            </p>
          ) : (
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-caption-s font-medium uppercase tracking-[0.08em] text-dark-950">Name<span className="ml-1 text-black/40" aria-hidden="true">*</span></label>
              <input id="contact-name" required name="name" autoComplete="name" placeholder="Jane Smith" className={field} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-caption-s font-medium uppercase tracking-[0.08em] text-dark-950">Email<span className="ml-1 text-black/40" aria-hidden="true">*</span></label>
              <input id="contact-email" required type="email" name="email" autoComplete="email" placeholder="you@example.com" className={field} />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-caption-s font-medium uppercase tracking-[0.08em] text-dark-950">Message<span className="ml-1 text-black/40" aria-hidden="true">*</span></label>
              <textarea id="contact-message" required name="message" placeholder="Tell us about your project" rows={5} className={`${field} resize-y`} />
            </div>
              <button type="submit" className="mt-2 h-[52px] w-full rounded-full bg-dark-950 text-body2-s font-medium capitalize text-white transition-colors duration-300 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200">
                Send message
              </button>
            </form>
          )}
          </div>
        </div>
        <div className="-mr-6 overflow-hidden md:-mr-10 md:ml-[20%]">
          <img
            src={contactImg}
            alt="AMC millwork project exterior"
            className="aspect-[4/5] size-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-6 text-body2-s md:grid-cols-12">
          <div className="capitalize text-dark-950 md:col-span-4">
            American Millwork &amp; Cabinetry Inc
          </div>
          <div className="space-y-4 leading-[1.6] text-dark-950/60 md:col-span-8">
            <p>
              Phone.{" "}
              <a
                href="tel:+16109650040"
                className="text-dark-950 underline underline-offset-2"
              >
                (610) 965-0040
              </a>
            </p>
            <p>
              Directions.{" "}
              <a
                href="https://maps.google.com/?q=840+Broad+St+Emmaus+PA+18049"
                target="_blank"
                rel="noreferrer"
                className="text-dark-950 underline underline-offset-2"
              >
                840 Broad St Emmaus, PA 18049
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 h-[283px] overflow-hidden rounded-[9px] md:h-[360px]">
          <iframe
            title="American Millwork & Cabinetry, 840 Broad St, Emmaus, PA"
            src="https://www.google.com/maps?q=840+Broad+St,+Emmaus,+PA+18049&z=15&output=embed"
            className="size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}

function useRoute() {
  const get = () =>
    window.location.hash.startsWith("#/services/")
      ? "service"
      : window.location.hash.startsWith("#/services")
      ? "services"
      : window.location.hash.startsWith("#/news/")
      ? "article"
      : window.location.hash.startsWith("#/news")
      ? "news"
      : window.location.hash.startsWith("#/contact")
      ? "contact"
      : window.location.hash.startsWith("#/careers")
        ? "careers"
        : window.location.hash.startsWith("#/about")
        ? "about"
      : window.location.hash.startsWith("#/portfolio/project")
        ? "project"
        : window.location.hash.startsWith("#/portfolio")
        ? "millwork"
        : "home"
  const [route, setRoute] = useState(get)
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    const onHash = () => {
      setRoute(get())
      setHash(window.location.hash)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  // Reset after the new page has rendered; "instant" bypasses the global smooth
  // scroll, which otherwise gets interrupted mid-animation by the layout change.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    const id = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }))
    return () => cancelAnimationFrame(id)
  }, [hash])
  return { route, hash }
}

export default function App() {
  const { route, hash } = useRoute()
  useEffect(() => {
    applySeo(route)
  }, [route, hash])
  return (
    <div className="bg-white text-black">
      <Header overDark={route === "project"} />
      <main>
        {route === "services" ? (
          <ServicesOverview />
        ) : route === "service" ? (
          <ServiceDetail key={window.location.hash} />
        ) : route === "news" ? (
          <NewsPage />
        ) : route === "article" ? (
          <ArticlePage />
        ) : route === "contact" ? (
          <ContactPage />
        ) : route === "careers" ? (
          <CareersPage />
        ) : route === "about" ? (
          <AboutPage />
        ) : route === "project" ? (
          <ProjectPage />
        ) : route === "millwork" ? (
          <MillworkPortfolio key={window.location.hash} />
        ) : (
          <>
            <Hero />
            <About />
            <VideoFeature
              eyebrow="Brand reveal"
              title="Made in Emmaus. Watch the shop come to life."
              img={`${asset}/9765d.png`}
            />
            <Services />
            <Locations />
            <Testimonials />
            <Memberships />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

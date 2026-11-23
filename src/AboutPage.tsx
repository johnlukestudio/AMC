import { LoopVideo } from "./LoopVideo"
import React, { useEffect, useRef, useState, type ReactNode } from "react"
import { Eyebrow, OutlineButton } from "./App"
import { YouTubeFacade, playFilmAt } from "./YouTubeFacade"
import { PortfolioImage } from "./PortfolioImage"
import type { PortfolioPhotoId } from "./portfolio-photos"
import { PORTFOLIO_MARQUEE_SIZES } from "./photos"

/* Full-bleed horizontal scroller: items peek past the page margins, while the
   custom progress bar stays aligned to the 1750px content grid.
   Auto-drifts while in view; pauses on hover, focus, or drag.
   Light treatments: scroll-snap + active scale, giant years. */
type Milestone = {
  year: string
  kind: "Growth" | "Company" | "Quality" | "Award" | "Technology" | "Recognition" | "Industry" | "Investment"
  title: string
  body: string
  img: string
  /** Responsive base path, without the -{width}.jpg suffix. */
  srcBase?: string
  widths?: number[]
  alt?: string
  sqft?: number
  href?: string
  /** Overrides object-center when a portrait source should keep its top in frame. */
  objectPosition?: string
}

const TL_SIZES = "(min-width: 768px) 240px, 210px"

function TimelinePhoto({ item }: { item: Milestone }) {
  const alt = item.alt ?? `${item.year} ${item.title}`
  const cls = "size-full object-cover object-center grayscale transition duration-500 hover:grayscale-0"
  if (item.srcBase && item.widths?.length) {
    const jpg = item.widths.map((w) => `${item.srcBase}-${w}.jpg ${w}w`).join(", ")
    const webp = item.widths.map((w) => `${item.srcBase}-${w}.webp ${w}w`).join(", ")
    const largest = item.widths[item.widths.length - 1]
    return (
      <picture className="block size-full">
        <source type="image/webp" srcSet={webp} sizes={TL_SIZES} />
        <img
          src={`${item.srcBase}-${largest}.jpg`}
          srcSet={jpg}
          sizes={TL_SIZES}
          width={largest}
          height={Math.round((largest * 2) / 3)}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cls}
          style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
        />
      </picture>
    )
  }
  return (
    <img
      src={item.img}
      alt={alt}
      draggable={false}
      className={cls}
      style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
    />
  )
}

const KIND_CHIP: Record<Milestone["kind"], string> = {
  Growth: "bg-green-100 text-green-800",
  Company: "bg-dark-100 text-dark-800",
  Quality: "bg-green-50 text-green-700",
  Award: "bg-gold-100 text-gold-800",
  Technology: "bg-dark-100 text-dark-800",
  Recognition: "bg-gold-100 text-gold-800",
  Industry: "bg-green-100 text-green-800",
  Investment: "bg-gold-200 text-dark-950",
}

function CardBody({ item: t, onClick }: { item: Milestone; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const inner = (
    <>
      <div className="-ml-4 -mr-5 aspect-[3/2] w-[calc(100%+2.25rem)] overflow-hidden">
        <TimelinePhoto item={t} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${KIND_CHIP[t.kind]}`}
        >
          {t.kind}
        </span>
        {t.sqft != null && (
          <span className="text-caption-s uppercase tracking-[0.12em] text-black/50">
            {t.sqft.toLocaleString("en-US")} sq ft
          </span>
        )}
      </div>
      <h3 className="mt-3 text-h4-s">{t.title}</h3>
      <p className="mt-2 max-w-[200px] text-body2-s text-black/60">{t.body}</p>
    </>
  )
  if (!t.href) return inner
  const external = t.href.startsWith("http")
  return (
    <a
      href={t.href}
      onClick={onClick}
      className="block text-inherit no-underline"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </a>
  )
}

function TimelineScroller({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ size: 1, offset: 0 })
  const [dragging, setDragging] = useState(false)
  const [active, setActive] = useState(0)
  const [snapOn, setSnapOn] = useState(true)
  const draggingRef = useRef(false)
  const dragMoved = useRef(false)
  const paused = useRef(false)
  const hovered = useRef(false)
  const dir = useRef(1)
  const inView = useRef(false)
  const reduceMotion = useRef(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setPrefersReduced(reduceMotion.current)

    const cardEls = () => Array.from(el.querySelectorAll<HTMLElement>("[data-tl-card]"))

    const nearest = () => {
      const cards = cardEls()
      if (!cards.length) return 0
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      cards.forEach((c, i) => {
        const center = c.offsetLeft + c.offsetWidth / 2
        const d = Math.abs(center - mid)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      return best
    }

    const update = () => {
      const size = el.clientWidth / el.scrollWidth
      const max = el.scrollWidth - el.clientWidth
      setBar({ size, offset: max > 0 ? (el.scrollLeft / max) * (1 - size) : 0 })
      setActive(nearest())
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
      },
      { threshold: 0.25 },
    )
    io.observe(el)

    // Any wheel / trackpad / touch intent pauses drift; resume only after a quiet period.
    let idle = 0
    const userIntent = () => {
      paused.current = true
      window.clearTimeout(idle)
      idle = window.setTimeout(() => {
        if (!hovered.current && !draggingRef.current) paused.current = false
      }, 4000)
    }
    el.addEventListener("wheel", userIntent, { passive: true })
    el.addEventListener("touchstart", userIntent, { passive: true })
    el.addEventListener("keydown", userIntent)

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      const max = el.scrollWidth - el.clientWidth
      const drifting =
        !reduceMotion.current &&
        inView.current &&
        !paused.current &&
        !draggingRef.current &&
        max > 0
      if (drifting) {
        // Soften snap while auto-drifting so continuous scroll does not fight mandatory snap.
        if (el.style.scrollSnapType !== "none") el.style.scrollSnapType = "none"
        el.scrollLeft += (dir.current * 28 * dt) / 1000
        if (el.scrollLeft >= max - 0.5) dir.current = -1
        else if (el.scrollLeft <= 0.5) dir.current = 1
      } else if (!draggingRef.current && el.style.scrollSnapType === "none") {
        el.style.scrollSnapType = ""
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(idle)
      el.removeEventListener("wheel", userIntent)
      el.removeEventListener("touchstart", userIntent)
      el.removeEventListener("keydown", userIntent)
      io.disconnect()
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const enableSnap = () => {
    const el = ref.current
    if (el) el.style.scrollSnapType = ""
    setSnapOn(true)
  }
  const disableSnap = () => {
    const el = ref.current
    if (el) el.style.scrollSnapType = "none"
    setSnapOn(false)
  }
  const pause = () => {
    hovered.current = true
    paused.current = true
  }
  const resume = () => {
    hovered.current = false
    if (!draggingRef.current) paused.current = false
  }

  const startContentDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const x0 = e.clientX
    const s0 = el.scrollLeft
    draggingRef.current = true
    dragMoved.current = false
    setDragging(true)
    paused.current = true
    disableSnap()
    const move = (ev: PointerEvent) => {
      if (Math.abs(ev.clientX - x0) > 6) dragMoved.current = true
      el.scrollLeft = s0 - (ev.clientX - x0)
    }
    const up = () => {
      draggingRef.current = false
      setDragging(false)
      enableSnap()
      if (!hovered.current) paused.current = false
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  const startBarDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    const t = track.current
    if (!el || !t) return
    e.preventDefault()
    const seek = (clientX: number) => {
      const r = t.getBoundingClientRect()
      const thumb = r.width * bar.size
      const ratio = Math.min(1, Math.max(0, (clientX - r.left - thumb / 2) / (r.width - thumb)))
      el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth)
    }
    seek(e.clientX)
    draggingRef.current = true
    setDragging(true)
    paused.current = true
    disableSnap()
    const move = (ev: PointerEvent) => seek(ev.clientX)
    const up = () => {
      draggingRef.current = false
      setDragging(false)
      enableSnap()
      if (!hovered.current) paused.current = false
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  return (
    <div className="mt-14 [--g:max(1.5rem,calc((100vw-1750px)/2+1.5rem))] md:[--g:max(2.5rem,calc((100vw-1750px)/2+2.5rem))]">
      <div
        ref={ref}
        onPointerDown={startContentDrag}
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        className={`overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          snapOn ? "snap-x snap-proximity" : ""
        } ${bar.size < 0.999 ? (dragging ? "cursor-grabbing select-none" : "cursor-grab") : ""}`}
      >
        <ol className="flex w-max min-w-full px-[max(var(--g),calc(50vw-105px))] py-6 md:px-[max(var(--g),calc(50vw-120px))]">
          {items.map((t, i) => {
            const above = i % 2 === 1
            const isActive = i === active
            const scaleCls = prefersReduced
              ? ""
              : isActive
                ? "md:scale-[1.03] origin-center"
                : "md:scale-100"
            return (
              <li
                key={t.year + t.title}
                data-tl-card
                className={`flex w-[210px] shrink-0 snap-center flex-col transition-[opacity,transform] duration-300 ease-out md:grid md:w-[240px] md:grid-rows-[1fr_auto_1fr] ${scaleCls} ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              >
                <div className="relative flex h-12 items-center md:row-start-2 md:h-16">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
                  <span
                    className={`relative size-3 rounded-full ring-[6px] ring-white transition-colors ${
                      isActive ? "bg-dark-950" : "bg-black/40"
                    }`}
                  />
                  <span
                    className={`relative ml-3 bg-white pr-3 font-medium leading-none tracking-[-0.04em] ${
                      isActive
                        ? "text-[32px] md:text-[38px]"
                        : "text-[26px] md:text-[30px] text-black/55"
                    }`}
                  >
                    {t.year}
                  </span>
                </div>
                <article
                  className={`border-l border-dashed border-black/25 pr-5 pl-4 ${
                    above ? "pt-4 md:row-start-1 md:self-end md:pt-0 md:pb-4" : "pt-4 md:row-start-3 md:self-start"
                  }`}
                >
                  <CardBody
                    item={t}
                    onClick={(e) => {
                      if (!dragMoved.current) return
                      e.preventDefault()
                      dragMoved.current = false
                    }}
                  />
                </article>
              </li>
            )
          })}
        </ol>
      </div>
      <div className="mx-auto mt-6 max-w-[1750px] px-6 md:px-10">
        {bar.size < 0.999 && (
          <div
            ref={track}
            onPointerDown={startBarDrag}
            className="relative cursor-pointer touch-none py-2"
            role="scrollbar"
            aria-orientation="horizontal"
            aria-valuenow={Math.round((bar.offset / Math.max(0.001, 1 - bar.size)) * 100)}
          >
            <div className="relative h-[7px] rounded-[30px] bg-green-100">
              <div
                className="absolute top-0 h-full rounded-[30px] bg-dark-950 transition-[left,width] duration-150 ease-out"
                style={{ width: `${bar.size * 100}%`, left: `${bar.offset * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const asset = "/media"

const CAROUSEL: PortfolioPhotoId[] = [
  "ave-blue-bell",
  "cheston-school",
  "ave-lounge",
  "mattison-lounge",
  "kalahari-entrance",
  "ave-lobby",
  "milford-residences",
  "waugh-chapel",
  "ave-clubroom",
  "washington-hall",
]

function CountUpStat({ value, delay = 0 }: { value: string; delay?: number }) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/)
  const prefix = m ? m[1] : ""
  const target = m ? parseInt(m[2], 10) : 0
  const suffix = m ? m[3] : ""
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState<number | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!m || !el) return
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    if (typeof IntersectionObserver === "undefined") return
    setN(0)
    let raf = 0
    let timer = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        timer = window.setTimeout(() => {
          const dur = 1300
          const start = performance.now()
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur)
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
            if (p < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
        }, delay)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [value, delay])
  if (!m) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref} aria-label={value}>
      {prefix}
      {n === null ? target : n}
      {suffix}
    </span>
  )
}

const STATS = [
  { n: "23+", title: "Years experience", body: "Founded in 2002" },
  { n: "~83", title: "People across the shop", body: "About 50 on the floor, ~22 in the office, 9 to 11 on install, six in estimating, five in project management" },
  { n: "80k", title: "Sq. ft. facility", body: "Our Lehigh Valley, PA plant houses every operation" },
  { n: "AWI", title: "QCP certified", body: "Products meet or exceed Quality Certification Program standards" },
]

const PILLARS = [
  {
    title: "Your expectations are our goals",
    body: "A team of skilled technicians, trained craftsmen and business professionals who know how to get the job done and deliver it on time, flexing to changes in process or\u00A0schedule.",
  },
  {
    title: "Continual improvement",
    body: "Lean is not a slogan here. The main idea we buy into is continual improvement: better processes, cross\u2011training, and people who can move where the work needs\u00A0them.",
  },
  {
    title: "QC at every handoff",
    body: "We do not wait until the truck is loaded. The next station is the customer. An edge\u2011bander can push bad parts back. Quality is checked at every step of the\u00A0way.",
  },
  {
    title: "Our pride is our work",
    body: "We keep an open\u2011shop policy. Visit the Lehigh Valley shop and see old\u2011world craftsmanship running on the latest technology, tools and dedicated\u00A0people.",
  },
]

// Growth beats from George Reitz (owner interview), interleaved with dated
// awards and certifications from the live America's Finest Standard page.
const TIMELINE: Milestone[] = [
  { year: "2001", kind: "Company", title: "The business plan", body: "Fall 2001: George writes the plan for American Millwork & Cabinetry, named in honor of the fallen of 9/11.", img: `${asset}/about/timeline/business-plan-1400.jpg`, srcBase: `${asset}/about/timeline/business-plan`, widths: [480, 960, 1400], alt: "American flag. The 2001 business plan named the company in honor of the fallen of September 11. Photo by Luke Michael on Unsplash." },
  { year: "2003", kind: "Growth", sqft: 8000, title: "First shop", body: "Opens in an 8,000 sq ft shop. First product ships April 2003 - $735,000 in year one.", img: `${asset}/factory/11af8e22_image.png` },
  { year: "2004", kind: "Growth", sqft: 15000, title: "Taking more of the building", body: "Adds another 5,000 sq ft of the leased space - about 14-15,000 sq ft in all.", img: `${asset}/factory/2777aef6_image.png` },
  { year: "2006", kind: "Company", title: "The fire", body: "January 31, 2006: a three-alarm fire takes the plant completely. Fourteen people. Contracts still owed.", img: `${asset}/about/timeline/fire-1041.jpg`, srcBase: `${asset}/about/timeline/fire`, widths: [480, 960, 1041], alt: "The shop after the January 31, 2006 three-alarm fire. Scan from George Reitz." },
  { year: "2006", kind: "Company", title: "Nights at Precise Graphics", body: "Parts made at night in a neighboring shop in the Lehigh Valley. Assembly in 4,000 sq ft next door. Finishing at the future plant while it was renovated.", img: `${asset}/about/timeline/precise-night-1400.jpg`, srcBase: `${asset}/about/timeline/precise-night`, widths: [480, 960, 1400], alt: "A woodworker cutting parts in a dimly lit shop, for the nights AMC borrowed a neighboring shop after the fire. Not a photograph of Precise Graphics. Photo by Anna Shvets on Pexels." },
  { year: "2006", kind: "Growth", sqft: 14000, title: "Lehigh Valley", body: "October 2006: production starts in the former fish-farm building - about 14,000 sq ft. Rooted here as the book of work came back.", img: `${asset}/about/timeline/lehigh-valley-723.jpg`, srcBase: `${asset}/about/timeline/lehigh-valley`, widths: [480, 723], alt: "Former fish-farm raceway tanks inside the building where production started in October 2006. Scan from George Reitz." },
  { year: "2009", kind: "Growth", sqft: 30000, title: "Doubled the floor", body: "Grew to 30,000 sq ft.", img: `${asset}/factory/bc70d6ea_image.png` },
  { year: "2011", kind: "Growth", sqft: 50000, title: "Americas production", body: "2010-2011: another 20,000 sq ft for the Americas production division.", img: `${asset}/factory/6cf042d6_image.png` },
  { year: "2014", kind: "Growth", sqft: 55000, title: "Americas warehouse", body: "A few years later, another 5,000 sq ft warehouse to support Americas.", img: `${asset}/08f78.png` },
  { year: "2015", kind: "Technology", title: "A Schelling saw for AmeriCase", body: "February 2015: AMC installs a Schelling panel saw and retrieval system for the AmeriCase line, the first of its kind in a U.S. architectural millwork plant.", img: `${asset}/about/timeline/schelling-saw-700.jpg`, srcBase: `${asset}/about/timeline/schelling-saw`, widths: [480, 700], href: "https://amcmillwork.com/new-panel-retrieval-system-puts-amc-cutting-edge/", alt: "Schelling panel saw and retrieval system installed for the AmeriCase line, from AMC's February 2015 news post." },
  { year: "2016", kind: "Recognition", title: "Bay Head in Design Solutions", body: "Bay Head Yacht Club's restoration after Superstorm Sandy is featured in AWI Design Solutions.", img: `${asset}/about/timeline/bay-head-ds-680.jpg`, srcBase: `${asset}/about/timeline/bay-head-ds`, widths: [480, 680], href: "https://amcmillwork.com/bay-head-yacht-club-featured-on-design-solutions/", alt: "Bay Head Yacht Club interior woodwork, from AMC's Design Solutions news post." },
  { year: "2016", kind: "Industry", title: "NJ AWI tours the plant", body: "November 2016: the New Jersey AWI chapter tours the AMC plant in the Lehigh Valley.", img: `${asset}/about/timeline/njawi-tour-2016-984.jpg`, srcBase: `${asset}/about/timeline/njawi-tour-2016`, widths: [480, 960, 984], href: "https://amcmillwork.com/awi-architectural-woodworking-institute-takes-a-plant-tour/", alt: "A machinist at the AMC plant during the New Jersey AWI chapter tour, from the November 2016 news post." },
  { year: "2018", kind: "Industry", title: "NJ and PA chapters meet here", body: "February 2018: AMC hosts a joint meeting of the New Jersey and Pennsylvania AWI chapters.", img: `${asset}/factory/2777aef6_image.png`, alt: "AMC craftspeople assembling millwork on the Emmaus shop floor." },
  { year: "2019", kind: "Quality", title: "AWI QCP self-labeling", body: "April 2019: AMC reaches AWI Quality Certification Program self-labeling status.", img: `${asset}/factory/11af8e22_image.png`, href: "https://amcmillwork.com/american-millwork-cabinetrys-awi-status-changed-to-self-labeling/", alt: "An AMC craftsman measuring a panel in the Emmaus shop." },
  { year: "2019", kind: "Award", title: "ABC STEP Diamond", body: "Late 2019 into early 2020: Association of Builders and Contractors STEP Award at Diamond Level, for the greatest safety improvement.", img: `${asset}/about/awards/step-diamond.jpg` },
  { year: "2020", kind: "Award", title: "Zero Lost Time", body: "Over 100,000 man hours with zero lost time in one fiscal year. Recognized with Federated Insurance and AWI partners.", img: `${asset}/about/awards/zero-lost-time.jpg` },
  { year: "2020", kind: "Award", title: "Safety Improvement", body: "Safety Improvement Recognition for year-over-year gains and the programs that stuck.", img: `${asset}/about/awards/safety-improvement.jpg` },
  { year: "2020", kind: "Award", title: "Fire certification", body: "Fire certification on record for the plant and our America's Finest standard.", img: `${asset}/about/awards/fire-cert.png` },
  { year: "2021", kind: "Award", title: "AWI Award of Excellence", body: "February 2021: AWI Award of Excellence for AVE Blue Bell luxury apartments, featured in Design Solutions Magazine.", img: `${asset}/about/timeline/awi-excellence-1400.jpg`, srcBase: `${asset}/about/timeline/awi-excellence`, widths: [480, 960, 1400], alt: "AWI Award of Excellence, 2021. The seal centers the Architectural Woodwork Institute logo from awinet.org." },
  { year: "2021", kind: "Quality", title: "NJ Public Works", body: "State of New Jersey Public Works Contractor Registration #663358. Registration date March 12, 2021. George Reitz, President.", img: `${asset}/about/awards/nj-public-works.jpg` },
  { year: "2021", kind: "Award", title: "Zero Lost Time again", body: "Another Zero Lost Time recognition on the America's Finest standard wall, kept beside the STEP and safety awards.", img: `${asset}/about/awards/step-2020.jpg` },
  { year: "2022", kind: "Growth", sqft: 80000, title: "80,000 sq ft today", body: "Another 5,000 sq ft for solid surface and Corian. About 83 people across the shop.", img: `${asset}/about/timeline/flag-exterior-1400.jpg`, srcBase: `${asset}/about/timeline/flag-exterior`, widths: [480, 960, 1400], alt: "American flag in front of the American Millwork and Cabinetry plant in Emmaus." },
  { year: "2022", kind: "Quality", title: "AWI & QCP renewals", body: "AWI membership and QCP certificates renewed. AMC, AMC Installers, and AmeriCase are QCP-certified. Long-term AWI members in good standing.", img: `${asset}/about/awards/awi-2022.jpg` },
  { year: "2023", kind: "Growth", title: "AMC Acoustical launches", body: "AMC launches AMC Acoustical, for acoustic panels, ceilings and sound control.", img: `${asset}/acoustical/wood-veneer-1024.jpg`, href: "/divisions/amc-acoustical/", alt: "Wood veneer acoustic panels from AMC Acoustical." },
  { year: "2023", kind: "Growth", title: "20,000 sq ft addition", body: "Nearing completion in June 2023: a new building for AMC Acoustical (panels and ceiling tiles) and solid surface and Corian work for healthcare, plus more cabinetry floor space. Expecting 35 to 40 new hires.", img: `${asset}/about/timeline/aerial-plant-1400.jpg`, srcBase: `${asset}/about/timeline/aerial-plant`, widths: [480, 960, 1400], alt: "High aerial view of the American Millwork and Cabinetry buildings in Emmaus, showing the size of the plant." },
  { year: "2023", kind: "Industry", title: "AWI and CSI meet at AMC", body: "November 17, 2023: AMC hosts a joint meeting of NJ AWI and CSI Greater Lehigh Valley, with AWI CEO Doug Hague, a plant tour and vendor tables.", img: `${asset}/factory/2777aef6_image.png`, alt: "AMC craftspeople assembling millwork on the Emmaus shop floor." },
  { year: "2024", kind: "Industry", title: "NJ AWI tours our plant", body: "January 2024: the New Jersey AWI chapter holds its first meeting of 2024 with a plant tour at AMC, with sessions on veneer and plywood specs (Lance Rhoads, Rhoads & O'Hara) and project management tools (Hilti).", img: `${asset}/factory/bc70d6ea_image.png`, href: "https://www.njawi.org/post/njawi-is-back-american-millwork-cabinetry-plant-tour", alt: "The AMC shop floor in Emmaus, where the New Jersey AWI chapter toured the plant in January 2024." },
  { year: "2024", kind: "Recognition", title: "On the cover of AWI Design Solutions", body: "Spring 2024: AMC's Ember @ Berwyn project is on the cover of AWI's Design Solutions magazine.", img: `${asset}/about/timeline/ds-cover-2024-460.jpg`, srcBase: `${asset}/about/timeline/ds-cover-2024`, widths: [460], href: "https://www.nxtbook.com/nxtbooks/awi/designsolutions_2024spring/index.php?startid=11#/p/Intro", objectPosition: "center 22%", alt: "Cover of AWI Design Solutions, Spring 2024, featuring AMC's Ember @ Berwyn project." },
  { year: "2026", kind: "Investment", title: "Ben Franklin invests in AMC", body: "January 2026: Ben Franklin Technology Partners invests in AMC. Two awards in 2026 total $178,475.", img: `${asset}/factory/e307e871_image.png`, href: "https://nep.benfranklin.org/ben-franklin-technology-partners-approves-1-9-million-to-support-11-regional-companies/", alt: "The American Millwork and Cabinetry plant in Emmaus." },
  { year: "2026", kind: "Industry", title: "The chapter meets on craft and AI", body: "May 8, 2026: AMC hosts the New Jersey AWI chapter meeting, \"Craftsmanship Built This Industry. AI Will Shape Its Future,\" with a plant tour. 63 people are registered.", img: `${asset}/factory/6cf042d6_image.png`, href: "https://www.njawi.org/post/craftsmanship-built-this-industry-ai-will-shape-its-future", alt: "Holz-Her CNC machining center on the AMC shop floor." },
  { year: "2026", kind: "Company", title: "The industry learns at AMC", body: "AWI brings its two-day project management seminar, \"Tame the Chaos,\" to our Emmaus plant. About 70 woodwork professionals spend Oct. 1 and 2 learning on our shop floor.", img: `${asset}/about/timeline/awi-seminar-836.jpg`, srcBase: `${asset}/about/timeline/awi-seminar`, widths: [480, 836], href: "/news/awi-project-management-seminar/", alt: "Wide view of the AWI Project Management seminar in session inside the AMC shop, October 2026." },
]

const TEAM = [
  { name: "George Reitz", role: "President & CEO", img: `${asset}/about/chris.jpg` },
  { name: "Linda Reitz", role: "Office Manager", img: `${asset}/about/linda.jpg` },
  { name: "Chris Robbins", role: "General Manager", img: `${asset}/about/george.jpg` },
  { name: "Meredith", role: "VP of Operations", img: `${asset}/about/meredith.jpg` },
]

// From America's Finest Standard + related news (no invented certs).
const CERTS = [
  { year: "01", title: "Quality Certification Program (QCP)", body: "AMC, AMC Installers, and AmeriCase certified by AWI" },
  { year: "02", title: "Architectural Woodwork Institute", body: "Long-term members in good standing" },
  { year: "03", title: "ABC STEP Award, Diamond Level", body: "Greatest safety improvement, late 2019 / early 2020" },
  { year: "04", title: "Zero Lost Time Accident Achievement", body: "100,000+ man hours, zero lost time" },
  { year: "05", title: "NJ Public Works Contractor", body: "Registration #663358, March 12, 2021" },
  { year: "06", title: "AAA bonded company", body: "Product & service warranties" },
  { year: "07", title: "Green Advantage / LEED", body: "In-house guidance on credits for your project" },
]

export function VideoFeature({
  eyebrow,
  title,
  img,
  className = "py-24 md:py-32",
  targetId,
  cta = "Watch Who We Are",
}: {
  targetId?: string
  cta?: string
  eyebrow: string
  title: string
  img: string
  className?: string
}) {
  return (
    <section className={`mx-auto max-w-[1750px] px-6 md:px-10 ${className}`}>
      <div className="mb-14 grid gap-10 md:grid-cols-2">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="w-full max-w-[560px] text-h3-s leading-[1.1] md:ml-auto md:text-right md:text-h3-m xl:text-h3-l">{title}</h2>
      </div>
      <button
        type="button"
        aria-label={targetId ? cta : `Play video: ${title}`}
        onClick={targetId ? () => playFilmAt(targetId) : undefined}
        className="group relative block aspect-[16/9] w-full overflow-hidden bg-black md:aspect-[21/9]"
      >
        <img
          src={img}
          alt={title}
          className="absolute inset-0 size-full object-cover opacity-75 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-60"
        />
        <span className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black md:size-32">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" className="ml-1">
            <path d="M22 13 0 26V0z" />
          </svg>
        </span>
        <span className="absolute bottom-6 left-6 text-caption-s uppercase tracking-[0.16em] text-white md:bottom-8 md:left-8">
          {targetId ? cta : "Video coming soon"}
        </span>
        <span className="absolute bottom-6 right-6 text-caption-s uppercase tracking-[0.16em] text-white/70 md:bottom-8 md:right-8">
          {targetId ? "2:09" : "02:30"}
        </span>
      </button>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="mx-auto flex max-w-[1750px] flex-col-reverse justify-between gap-10 px-6 pt-32 pb-14 md:flex-row md:items-end md:px-10 md:pt-[160px]">
        <p className="max-w-[760px] text-h4-m xl:text-h4-l leading-[1.6] tracking-[-0.02em] ">
          Shipping since 2003, the AMC group of companies manufactures and installs high-quality millwork and cabinetry:
          custom profiles, solid wood and veneer cabinets, surfaces and every aspect of architectural millwork, all
          from one shop in the Lehigh Valley, PA.
        </p>
        <h1 className="text-h2-s xl:text-h2-m leading-[1.1] tracking-[-0.02em] ">About AMC</h1>
      </section>
      <LoopVideo name="loop06" label="Aerial view of the American Millwork & Cabinetry plant in the Lehigh Valley, PA" className="h-[60vh] max-h-[640px] min-h-[320px] w-full" />

      {/* Story + slow carousel + stats */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1750px] gap-10 px-6 md:grid-cols-2 md:px-10">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-10 max-w-[520px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.1] ">
              Old-world craft, new-world technology.
            </h2>
          </div>
          <p className="self-end text-h4-s leading-[1.6] text-black/70">
            Our facility, built in 2006 in the Lehigh Valley just five miles south of Allentown, houses all of our
            operations under one roof. We work in unison with architects and design professionals to balance design,
            function and affordability. Our mission is simple: serve our clients with consistent quality, on-time
            deliveries and competitive prices in a one-source solution.
          </p>
        </div>

        <div className="mt-20 overflow-hidden md:mt-24">
          <div className="flex w-max animate-[marquee_80s_linear_infinite] gap-5 hover:[animation-play-state:paused]">
            {[...CAROUSEL, ...CAROUSEL].map((id, i) => (
              <PortfolioImage
                key={`${id}-${i}`}
                id={id}
                alt={i >= CAROUSEL.length ? "" : "Custom millwork project by American Millwork & Cabinetry"}
                hidden={i >= CAROUSEL.length}
                sizes={PORTFOLIO_MARQUEE_SIZES}
                pictureClassName="block shrink-0"
                className="aspect-[4/5] w-[260px] object-cover md:w-[330px]"
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-[1750px] grid-cols-2 gap-x-6 gap-y-12 px-6 md:mt-24 md:grid-cols-4 md:px-10">
          {STATS.map((s, i) => (
            <div key={s.title} className="min-w-0 border-t border-black/20 pt-6">
              <span className="block text-h2-s md:text-h2-m xl:text-h2-l leading-none tracking-tight "><CountUpStat value={s.n} delay={i * 150} /></span>
              <p className="mt-6 text-h4-s">{s.title}</p>
              <p className="mt-2 text-pretty text-body2-s leading-[1.5] text-black/60">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand story video */}
      <VideoFeature eyebrow="Brand story" title="Two decades in the making. The AMC story." img={`${asset}/factory/e307e871_image.png`} className="pb-24 md:pb-32" targetId="who-we-are" />

      {/* Brand pillars (black) */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-10 md:grid-cols-2">
            <Eyebrow>What we stand for</Eyebrow>
            <blockquote className="text-h3-s md:text-h3-m xl:text-h3-l leading-[1.3] tracking-[-0.02em] ">
              “Service our clients with consistent quality, on-time deliveries and competitive prices in a one-source
              solution.”
            </blockquote>
          </div>
          <div className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="border-l border-white/25 pl-5">
                <span className="text-caption-s text-white/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-h4-m xl:text-h4-l leading-[1.25]">{p.title}</h3>
                <p className="mt-4 text-pretty text-body2-s leading-[1.6] text-white/65">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32">
        <div className="mx-auto flex max-w-[1750px] flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
          <Eyebrow>Our growth</Eyebrow>
          <h2 className="max-w-[560px] text-h3-s leading-[1.1] md:text-right md:text-h3-m xl:text-h3-l">
            From 8,000 to 80,000 sq ft.
          </h2>
        </div>
        <TimelineScroller items={TIMELINE} />
      </section>

      {/* Leadership team */}
      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Eyebrow>Leadership team</Eyebrow>
          <h2 className="max-w-[520px] text-h3-s leading-[1.1] md:text-right md:text-h3-m xl:text-h3-l">The people behind the shop.</h2>
        </div>
        <p className="mt-8 max-w-[720px] text-body1-s leading-[1.6] text-black/70">
          AMC is a family business. Linda, George&apos;s sister, has run the office for more than twenty years.
          Brother David worked here nearly eighteen years before retiring. A stepson and a grandson have
          worked on the floor too. Beyond blood relatives, the shop runs on the same family feel: people
          who stay, teach, and grow into new roles.
        </p>
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <figure key={m.name}>
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                <img src={m.img} alt={m.name} className="size-full object-cover transition duration-500" />
              </div>
              <figcaption className="mt-3 flex justify-between gap-3 text-caption-m">
                <span>{m.name}</span>
                <span className="text-right text-black/60">{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Employee film */}
      <section id="who-we-are" className="scroll-mt-24 mx-auto max-w-[1750px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="mb-14 grid gap-10 md:grid-cols-2 md:items-end">
          <Eyebrow>Our people</Eyebrow>
          <div className="md:justify-self-end md:text-right">
            <h2 className="max-w-[560px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.1]">Who We Are.</h2>
            <p className="mt-4 text-body1-s leading-[1.6] text-black/70">Hear from the people who build it.</p>
          </div>
        </div>
        <YouTubeFacade sectionId="who-we-are" />
      </section>

      {/* Careers / recruit */}
      <section className="mx-auto max-w-[1750px] px-6 md:px-10">
        <div className="grid gap-10 border-y border-black/15 py-16 md:grid-cols-2 md:items-center md:py-20">
          <h2 className="text-h3-s md:text-h3-m xl:text-h3-l leading-[1.1] ">Build with us. We're hiring craftspeople in the Lehigh Valley, PA.</h2>
          <div className="flex flex-col items-start gap-8 md:items-end">
            <p className="max-w-md text-body1-s leading-[1.6] text-black/70 md:text-right">
              Cabinetmakers, CNC operators, finishers, installers and estimators. Come for a site visit, talk to
              the people who do the work, and see if this shop feels like home.
            </p>
            <a href="/careers/">
              <OutlineButton>View careers</OutlineButton>
            </a>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[35%_1fr]">
          <Eyebrow>Certifications &amp; Recognition</Eyebrow>
          <ul>
            {CERTS.map((c, i) => (
              <li key={i} className="grid grid-cols-[48px_1fr] gap-4 border-b border-black/20 py-3 text-caption-m md:grid-cols-[48px_1fr_30%]">
                <span className="text-black/50">{c.year}</span>
                <span>{c.title}</span>
                <span className="col-start-2 text-black/60 md:col-start-auto">{c.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

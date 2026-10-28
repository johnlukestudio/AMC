import React, { useEffect, useRef, useState, type ReactNode } from "react"
import { Eyebrow, OutlineButton } from "./App"

/* Full-bleed horizontal scroller: items peek past the page margins, while the
   custom progress bar stays aligned to the 1750px content grid.
   Auto-drifts while in view; pauses on hover, focus, or drag. */
function TimelineScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ size: 1, offset: 0 })
  const [dragging, setDragging] = useState(false)
  const draggingRef = useRef(false)
  const paused = useRef(false)
  const inView = useRef(false)
  const reduceMotion = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const update = () => {
      const size = el.clientWidth / el.scrollWidth
      const max = el.scrollWidth - el.clientWidth
      setBar({ size, offset: max > 0 ? (el.scrollLeft / max) * (1 - size) : 0 })
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

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      const max = el.scrollWidth - el.clientWidth
      if (
        !reduceMotion.current &&
        inView.current &&
        !paused.current &&
        !draggingRef.current &&
        max > 0
      ) {
        // ~28px/sec: slow enough to read, fast enough to feel alive
        el.scrollLeft += (28 * dt) / 1000
        if (el.scrollLeft >= max - 0.5) {
          el.scrollLeft = 0
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const pause = () => {
    paused.current = true
  }
  const resume = () => {
    if (!dragging) paused.current = false
  }

  // Mouse drag on the content (touch already scrolls natively).
  const startContentDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const x0 = e.clientX
    const s0 = el.scrollLeft
    draggingRef.current = true
    setDragging(true)
    paused.current = true
    const move = (ev: PointerEvent) => {
      el.scrollLeft = s0 - (ev.clientX - x0)
    }
    const up = () => {
      draggingRef.current = false
      setDragging(false)
      paused.current = false
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  // Drag or click the custom bar; position maps to scroll progress.
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
    const move = (ev: PointerEvent) => seek(ev.clientX)
    const up = () => {
      draggingRef.current = false
      setDragging(false)
      paused.current = false
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
          bar.size < 0.999 ? (dragging ? "cursor-grabbing select-none" : "cursor-grab") : ""
        }`}
      >
        <ol className="flex w-max min-w-full px-[var(--g)]">{children}</ol>
      </div>
      {bar.size < 0.999 && (
        <div className="mx-auto mt-6 max-w-[1750px] px-6 md:px-10">
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
        </div>
      )}
    </div>
  )
}

const asset = "/media"

const CAROUSEL = [
  "9765d", "30adf", "e52e8", "6896d", "940fb", "825ea", "6b3df", "b6a68", "10b28", "96354",
].map((n) => `${asset}/${n}.png`)

const STATS = [
  { n: "23+", title: "Years experience", body: "Building custom millwork in-house since 2003" },
  { n: "~83", title: "People across the shop", body: "About 50 on the floor, ~22 in the office, 9 to 11 on install, six in estimating, five in project management" },
  { n: "80k", title: "Sq. ft. facility", body: "Our Emmaus, PA plant houses every operation" },
  { n: "AWI", title: "QCP certified", body: "Products meet or exceed Quality Certification Program standards" },
]

const PILLARS = [
  {
    title: "Your expectations are our goals",
    body: "A team of skilled technicians, trained craftsmen and business professionals who know how to get the job done and deliver it on time, flexing to changes in process or schedule.",
  },
  {
    title: "Continual improvement",
    body: "Lean is not a slogan here. The main idea we buy into is continual improvement: better processes, cross-training, and people who can move where the work needs them.",
  },
  {
    title: "QC at every handoff",
    body: "We do not wait until the truck is loaded. The next station is the customer. An edge-bander can push bad parts back. Quality is checked at every step of the way.",
  },
  {
    title: "Our pride is our work",
    body: "We keep an open-shop policy. Visit Emmaus and see old-world craftsmanship running on the latest technology, tools and dedicated people.",
  },
]

// Square-footage and company beats from George Reitz (owner interview). Awards/certs
// that were not in that interview stay out of this strip.
type Milestone = { year: string; kind: "Growth" | "Company"; title: string; body: string; img: string; sqft?: number }
const TIMELINE: Milestone[] = [
  { year: "2001", kind: "Company", title: "The business plan", body: "Fall 2001: George writes the plan for American Millwork & Cabinetry, named in honor of the fallen of 9/11.", img: `${asset}/62abe.png` },
  { year: "2003", kind: "Growth", sqft: 8000, title: "First shop", body: "Opens in an 8,000 sq ft shop. First product ships April 2003 - $735,000 in year one.", img: `${asset}/factory/11af8e22_image.png` },
  { year: "2004", kind: "Growth", sqft: 15000, title: "Taking more of the building", body: "Adds another 5,000 sq ft of the leased space - about 14-15,000 sq ft in all.", img: `${asset}/08f78.png` },
  { year: "2006", kind: "Company", title: "The fire", body: "January 31, 2006: a three-alarm fire takes the plant completely. Fourteen people. Contracts still owed.", img: `${asset}/cf31d.png` },
  { year: "2006", kind: "Company", title: "Nights at Precise Graphics", body: "Parts made at night in a neighboring Emmaus shop. Assembly in 4,000 sq ft next door. Finishing at the future plant while it was renovated.", img: `${asset}/02cb0.png` },
  { year: "2006", kind: "Growth", sqft: 14000, title: "Emmaus", body: "October 2006: production starts in the former fish-farm building - about 14,000 sq ft of the buildings that still stood.", img: `${asset}/factory/bc70d6ea_image.png` },
  { year: "2007", kind: "Growth", sqft: 15000, title: "Rooted in Emmaus", body: "Settled at roughly 15,000 sq ft as the company rebuilt its book of work.", img: `${asset}/6dc05.png` },
  { year: "2009", kind: "Growth", sqft: 30000, title: "Doubled the floor", body: "Grew to 30,000 sq ft.", img: `${asset}/f291a.png` },
  { year: "2011", kind: "Growth", sqft: 50000, title: "Americas production", body: "2010-2011: another 20,000 sq ft for the Americas production division.", img: `${asset}/factory/6cf042d6_image.png` },
  { year: "2014", kind: "Growth", sqft: 55000, title: "Americas warehouse", body: "A few years later, another 5,000 sq ft warehouse to support Americas.", img: `${asset}/f4bae.png` },
  { year: "2022", kind: "Growth", sqft: 80000, title: "80,000 sq ft today", body: "Another 5,000 sq ft for solid surface and Corian. About 83 people across the shop.", img: `${asset}/factory/e307e871_image.png` },
]

const TEAM = [
  { name: "George Reitz", role: "President & CEO", img: `${asset}/about/george.jpg` },
  { name: "Linda Reitz", role: "Office Manager", img: `${asset}/about/linda.jpg` },
  { name: "Chris Robbins", role: "General Manager", img: `${asset}/about/chris.jpg` },
  { name: "Meredith", role: "VP of Operations", img: `${asset}/about/meredith.jpg` },
]

// Drawn from existing site memberships / news assets (no invented certs).
const CERTS = [
  { year: "01", title: "Quality Certification Program (QCP)", body: "Architectural Woodwork Institute" },
  { year: "02", title: "Active member", body: "Architectural Woodwork Institute (AWI)" },
  { year: "03", title: "AAA bonded company", body: "Product & service warranties" },
  { year: "04", title: "Associated Builders & Contractors", body: "Member" },
  { year: "05", title: "Green Advantage", body: "LEED Accredited professionals in-house" },
]

export function VideoFeature({
  eyebrow,
  title,
  img,
  className = "py-24 md:py-32",
}: {
  eyebrow: string
  title: string
  img: string
  className?: string
}) {
  return (
    <section className={`mx-auto max-w-[1750px] px-6 md:px-10 ${className}`}>
      <div className="mb-14 grid gap-10 md:grid-cols-2">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="max-w-[560px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.1] ">{title}</h2>
      </div>
      <button
        type="button"
        aria-label={`Play video: ${title}`}
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
          Video coming soon
        </span>
        <span className="absolute bottom-6 right-6 text-caption-s uppercase tracking-[0.16em] text-white/70 md:bottom-8 md:right-8">
          02:30
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
          from one shop in Emmaus, PA.
        </p>
        <h1 className="text-h2-s xl:text-h2-m leading-[1.1] tracking-[-0.02em] ">About AMC</h1>
      </section>
      <img
        src={`${asset}/about/team.png`}
        alt="The American Millwork & Cabinetry team on the shop floor in Emmaus"
        className="h-[60vh] max-h-[640px] min-h-[320px] w-full object-cover"
      />

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
            {[...CAROUSEL, ...CAROUSEL].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={i >= CAROUSEL.length ? "" : "Custom millwork project by American Millwork & Cabinetry"}
                aria-hidden={i >= CAROUSEL.length}
                className="aspect-[4/5] w-[260px] shrink-0 object-cover md:w-[330px]"
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-[1750px] grid-cols-2 gap-x-6 gap-y-12 px-6 md:mt-24 md:grid-cols-4 md:px-10">
          {STATS.map((s) => (
            <div key={s.title} className="border-t border-black/20 pt-6">
              <span className="block text-h2-s md:text-h2-m xl:text-h2-l leading-none tracking-tight ">{s.n}</span>
              <p className="mt-6 text-h4-s">{s.title}</p>
              <p className="mt-2 max-w-[260px] text-body2-s leading-[1.5] text-black/60">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand story video */}
      <VideoFeature eyebrow="Brand story" title="Two decades in the making. The AMC story." img={`${asset}/factory/e307e871_image.png`} className="pb-24 md:pb-32" />

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
                <p className="mt-4 text-body2-s leading-[1.6] text-white/65">{p.body}</p>
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
        <TimelineScroller>
          {TIMELINE.map((t, i) => {
            const above = i % 2 === 1
            return (
              <li
                key={t.year + t.title}
                className="flex w-[260px] shrink-0 flex-col md:grid md:w-[300px] md:grid-rows-[1fr_auto_1fr]"
              >
                {/* Axis: one segment per item forms a continuous center line */}
                <div className="relative flex h-14 items-center md:row-start-2">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
                  <span className="relative size-3 rounded-full bg-black ring-[6px] ring-white" />
                  <span className="relative ml-4 bg-white pr-3 text-h4-m leading-none tracking-[-0.01em]">{t.year}</span>
                </div>
                <article
                  className={`border-l border-dashed border-black/25 pr-8 pl-5 ${
                    above ? "pt-6 md:row-start-1 md:self-end md:pt-0 md:pb-6" : "pt-6 md:row-start-3 md:self-start"
                  }`}
                >
                  <div className="aspect-[4/3] w-full max-w-[220px] overflow-hidden bg-neutral-100">
                    <img
                      src={t.img}
                      alt={`${t.year} ${t.title}`}
                      draggable={false}
                      className="size-full object-cover grayscale transition duration-500 hover:grayscale-0"
                    />
                  </div>
                  {t.sqft ? (
                    <p className="mt-5 text-h3-s md:text-h3-m leading-none tracking-tight ">
                      {t.sqft.toLocaleString("en-US")}
                      <span className="ml-1 text-caption-s uppercase tracking-[0.12em] text-black/50">sq ft</span>
                    </p>
                  ) : (
                    <span className="mt-5 block text-caption-s uppercase tracking-[0.12em] text-black/50">{t.kind}</span>
                  )}
                  <h3 className={`text-h4-s ${t.sqft ? "mt-3" : "mt-2"}`}>{t.title}</h3>
                  <p className="mt-2 max-w-[240px] text-body2-s text-black/60">{t.body}</p>
                </article>
              </li>
            )
          })}
        </TimelineScroller>
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
                <img src={m.img} alt={m.name} className="size-full object-cover grayscale transition duration-500 hover:grayscale-0" />
              </div>
              <figcaption className="mt-3 flex justify-between gap-3 text-caption-m">
                <span>{m.name}</span>
                <span className="text-right text-black/60">{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Team video */}
      <VideoFeature eyebrow="Team" title="Meet the craftspeople who build every AMC project." img={`${asset}/factory/2777aef6_image.png`} className="pb-24 md:pb-32" />

      {/* Careers / recruit */}
      <section className="mx-auto max-w-[1750px] px-6 md:px-10">
        <div className="grid gap-10 border-y border-black/15 py-16 md:grid-cols-2 md:items-center md:py-20">
          <h2 className="text-h3-s md:text-h3-m xl:text-h3-l leading-[1.1] ">Build with us. We're hiring craftspeople in Emmaus.</h2>
          <div className="flex flex-col items-start gap-8 md:items-end">
            <p className="max-w-md text-body1-s leading-[1.6] text-black/70 md:text-right">
              Cabinetmakers, CNC operators, finishers, installers and estimators. Come for a site visit, talk to
              the people who do the work, and see if this shop feels like home.
            </p>
            <a href="#/careers">
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

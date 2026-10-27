import React, { useEffect, useRef, useState, type ReactNode } from "react"
import { Eyebrow, OutlineButton } from "./App"

/* Full-bleed horizontal scroller: items peek past the page margins, while the
   custom progress bar stays aligned to the 1750px content grid. */
function TimelineScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ size: 1, offset: 0 })
  const [dragging, setDragging] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const size = el.clientWidth / el.scrollWidth
      const max = el.scrollWidth - el.clientWidth
      setBar({ size, offset: max > 0 ? (el.scrollLeft / max) * (1 - size) : 0 })
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  // Mouse drag on the content (touch already scrolls natively).
  const startContentDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const x0 = e.clientX
    const s0 = el.scrollLeft
    setDragging(true)
    const move = (ev: PointerEvent) => {
      el.scrollLeft = s0 - (ev.clientX - x0)
    }
    const up = () => {
      setDragging(false)
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
    setDragging(true)
    const move = (ev: PointerEvent) => seek(ev.clientX)
    const up = () => {
      setDragging(false)
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
                className="absolute top-0 h-full rounded-[30px] bg-dark-950"
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
  { n: "24+", title: "Years experience", body: "Building custom millwork in-house since 2002" },
  { n: "1,200+", title: "Projects completed", body: "Delivered on schedule across the Northeast" },
  { n: "75k", title: "Sq. ft. facility", body: "Our Emmaus, PA plant houses every operation" },
  { n: "AWI", title: "QCP certified", body: "Products meet or exceed Quality Certification Program standards" },
]

const PILLARS = [
  {
    title: "Your expectations are our goals",
    body: "A team of skilled technicians, trained craftsmen and business professionals who know how to get the job done and deliver it on time, flexing to changes in process or schedule.",
  },
  {
    title: "Excellent location",
    body: "Our Emmaus plant sits minutes from the interstate, giving us direct access to Pennsylvania, New Jersey, New York, Delaware and Maryland.",
  },
  {
    title: "Scale of facility",
    body: "A full complement of state-of-the-art woodworking equipment. CNC software integrates bar scanners and labelers to coordinate every part through the shop.",
  },
  {
    title: "Our pride is our work",
    body: "We keep an open-shop policy. Visit Emmaus and see old-world craftsmanship running on the latest technology, tools and dedicated people.",
  },
]

// Placeholder milestones: square-footage history is real, awards/certifications
// marked "placeholder" are illustrative until the client confirms the list.
type Milestone = { year: string; kind: "Growth" | "Award" | "Certification" | "Company"; title: string; body: string; img: string; sqft?: number }
const TIMELINE: Milestone[] = [
  { year: "2001", kind: "Growth", sqft: 3000, title: "The first shop", body: "AMC opens a 3,000 sq ft shop with a small crew and a big ambition.", img: `${asset}/factory/11af8e22_image.png` },
  { year: "2002", kind: "Company", title: "American Millwork & Cabinetry Inc.", body: "The company incorporates and lands its first commercial millwork contracts.", img: `${asset}/62abe.png` },
  { year: "2004", kind: "Growth", sqft: 10000, title: "First expansion", body: "A move to 10,000 sq ft to keep pace with growing commercial work.", img: `${asset}/08f78.png` },
  { year: "2006", kind: "Growth", sqft: 20000, title: "Doubling the floor", body: "20,000 sq ft brings more production in-house.", img: `${asset}/cf31d.png` },
  { year: "2008", kind: "Certification", title: "AWI membership", body: "AMC joins the Architectural Woodwork Institute. Lorem ipsum dolor sit amet.", img: `${asset}/02cb0.png` },
  { year: "2010", kind: "Certification", title: "FSC® Chain of Custody", body: "Certified to supply FSC® products for sustainable projects. Lorem ipsum.", img: `${asset}/6dc05.png` },
  { year: "2012", kind: "Company", title: "AmeriCase™ launches", body: "A dedicated casework division for industrial, medical and education markets.", img: `${asset}/f291a.png` },
  { year: "2014", kind: "Growth", sqft: 50000, title: "A major move", body: "50,000 sq ft adds capacity for large-scale casework programs.", img: `${asset}/factory/bc70d6ea_image.png` },
  { year: "2016", kind: "Company", title: "Schelling panel saw", body: "The first architectural casework manufacturer to install a Schelling saw and retrieval system.", img: `${asset}/factory/6cf042d6_image.png` },
  { year: "2018", kind: "Growth", sqft: 60000, title: "Finishing & CNC", body: "60,000 sq ft with expanded finishing and CNC operations.", img: `${asset}/f4bae.png` },
  { year: "2019", kind: "Certification", title: "AWI Self-Labeling", body: "Our AWI Quality Certification status is upgraded to Self-Labeling.", img: `${asset}/e5b5d.png` },
  { year: "2020", kind: "Award", title: "ABC STEP Safety Award", body: "Diamond Level recognition, plus two more safety awards that year.", img: `${asset}/factory/2777aef6_image.png` },
  { year: "2021", kind: "Award", title: "AWI Award of Excellence", body: "Recognized for the interior millwork at AVE Blue Bell.", img: `${asset}/9765d.png` },
  { year: "2022", kind: "Company", title: "AMC Acoustical", body: "Acoustical ceiling and wall systems join the family. Lorem ipsum dolor.", img: `${asset}/cat-acoustics.png` },
  { year: "2023", kind: "Award", title: "Design excellence", body: "Placeholder award. Lorem ipsum dolor sit amet, consectetur adipiscing.", img: `${asset}/8b3b0.png` },
  { year: "2024", kind: "Growth", sqft: 80000, title: "80,000 sq ft today", body: "One-source manufacturing for millwork, casework, acoustical and surfaces.", img: `${asset}/factory/e307e871_image.png` },
]

const TEAM = [
  { name: "George Reitz", role: "President & CEO", img: `${asset}/about/george.png` },
  { name: "Linda Reitz", role: "Office Manager", img: `${asset}/about/linda.png` },
  { name: "Chris Aungst", role: "Lead Estimator", img: `${asset}/about/chris.png` },
]

// Placeholder rows — final list pending client documentation
const CERTS = [
  { year: "01", title: "Quality Certification Program (QCP)", body: "Architectural Woodwork Institute" },
  { year: "02", title: "Active member", body: "Architectural Woodwork Institute (AWI)" },
  { year: "03", title: "AAA bonded company", body: "Product & service warranties" },
  { year: "04", title: "Certification name", body: "Issuing organization" },
  { year: "05", title: "Certification name", body: "Issuing organization" },
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
          alt=""
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
          Founded in 2002, the AMC group of companies manufactures and installs high-quality millwork and cabinetry:
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
                alt=""
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
            From 3,000 to 80,000 sq ft.
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
                      alt=""
                      draggable={false}
                      className="size-full object-cover grayscale transition duration-500 hover:grayscale-0"
                    />
                  </div>
                  <span className="mt-5 block text-caption-s uppercase tracking-[0.12em] text-black/50">
                    {t.kind}
                    {t.sqft ? ` · ${t.sqft.toLocaleString("en-US")} sq ft` : ""}
                  </span>
                  <h3 className="mt-2 text-h4-s">{t.title}</h3>
                  <p className="mt-2 max-w-[240px] text-body2-s text-black/60">{t.body}</p>
                </article>
              </li>
            )
          })}
        </TimelineScroller>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Eyebrow>Team</Eyebrow>
          <h2 className="max-w-[520px] text-h3-s leading-[1.1] md:text-right md:text-h3-m xl:text-h3-l">The people behind the shop.</h2>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((m, i) => (
            <figure key={m.name} className={i === 1 ? "md:mt-24" : i === 2 ? "md:mt-12" : ""}>
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                <img src={m.img} alt={m.name} className="size-full object-cover grayscale transition duration-500 hover:grayscale-0" />
              </div>
              <figcaption className="mt-3 flex justify-between text-caption-m">
                <span>{m.name}</span>
                <span className="text-black/60">{m.role}</span>
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
              Cabinetmakers, CNC operators, finishers, installers and estimators. Join a shop that invests in its
              people and its tools.
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

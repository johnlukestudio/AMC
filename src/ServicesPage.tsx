import { useEffect, useRef, useState } from "react"
import { Eyebrow, OutlineButton } from "./App"

const asset = "/assets"
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

type Item = { label?: string; title: string; img: string; body?: string }
type Step = { title: string; body: string }
export type Service = {
  slug: string
  title: string
  kicker: string
  intro: string
  hero: string
  overview: string
  overviewImg: string
  meta: { label: string; value: string }[]
  tags: string[]
  items: Item[]
  steps: Step[]
  stepsTitle?: string
  stepsAside?: string
  stepsImg: string
  deliverables: { title: string; body: string }[]
  deliverablesImg: string
}

const STEPS_DEFAULT: Step[] = [
  {
    title: "Estimating",
    body: "We detail the scope of work and work closely with you to finalize comprehensive, competitive pricing for bid day.",
  },
  {
    title: "Engineering & submittals",
    body: "Our process and submittal engineers produce shop drawings and samples for approval using the latest software.",
  },
  {
    title: "Fabrication",
    body: "Built in-house in Emmaus, PA with CNC machining, bar-code labeling and Lean Manufacturing practices.",
  },
  {
    title: "Installation",
    body: "AMC Installers LLC installs with highly skilled craftsmen: open, prevailing or union, as the project requires.",
  },
]

export const SERVICE_DATA: Service[] = [
  {
    slug: "millwork",
    title: "Millwork",
    kicker: "Architectural woodwork",
    intro: "Custom architectural millwork engineered, built and installed by one team, from lobby walls to reception desks.",
    hero: `${asset}/02cb0.png`,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus. Curabitur blandit tempus porttitor, nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.",
    overviewImg: `${asset}/cat-millwork.png`,
    meta: [
      { label: "Markets", value: "Commercial · Residential" },
      { label: "Grade", value: "AWI Premium · Custom" },
      { label: "Lead time", value: "Lorem ipsum" },
      { label: "Region", value: "PA · NY · NJ" },
    ],
    tags: ["Commercial · Hospitality", "Custom · Premium grade"],
    items: [
      { label: "Feature walls", title: "Wall Paneling", img: `${asset}/e5b5d.png` },
      { label: "First impressions", title: "Reception Desks", img: `${asset}/8b3b0.png` },
      { label: "Finish details", title: "Trim & Moldings", img: `${asset}/6f79e.png` },
      { label: "Shared spaces", title: "Custom Fixtures", img: `${asset}/185d7.png` },
    ],
    steps: STEPS_DEFAULT,
    stepsImg: `${asset}/factory/6cf042d6_image.png`,
    deliverables: [
      { title: "Shop drawings", body: LOREM_SHORT },
      { title: "Finish samples", body: LOREM_SHORT },
      { title: "Fabricated millwork", body: LOREM_SHORT },
      { title: "Installed & punched", body: LOREM_SHORT },
    ],
    deliverablesImg: `${asset}/9765d.png`,
  },
  {
    slug: "casework",
    title: "Casework",
    kicker: "AmeriCase™ division",
    intro: "Standard and semi-custom casework for virtually any application, in plastic laminate, veneer or solid wood.",
    hero: `${asset}/6dc05.png`,
    overview:
      "AmeriCase, a division of American Millwork & Cabinetry, works in unison with architects, design professionals and contractors to produce quality casegoods. Our plant has a full compliment of state-of-the-art woodworking machines, and was the first architectural casework manufacturer to install a Schelling panel saw and retrieval system.",
    overviewImg: `${asset}/cat-casework.png`,
    meta: [
      { label: "Markets", value: "Industrial · Medical · Education" },
      { label: "Materials", value: "Laminate · Veneer · Solid wood" },
      { label: "Lead time", value: "Lorem ipsum" },
      { label: "Region", value: "PA · NY · NJ" },
    ],
    tags: ["Industrial · Medical", "Standard · Semi-custom"],
    items: [
      { label: "Heavy duty", title: "Industrial", img: `${asset}/b1ab7.png` },
      { label: "Healthcare", title: "Medical", img: `${asset}/197f8.png` },
      { label: "Durable finish", title: "Plastic Laminate", img: `${asset}/f291a.png` },
      { label: "Made to fit", title: "Semi-Custom", img: `${asset}/40490.png` },
    ],
    steps: [
      {
        title: "Experienced estimators",
        body: "We assist you in submitting bids on plastic laminate, veneer, solid wood and semi-custom casework for any market.",
      },
      {
        title: "Qualified engineers",
        body: "From prototypes to submittals, we use Microvellum with the latest versions of AutoCAD to detail your casework.",
      },
      {
        title: "Cutting-edge fabrication",
        body: "Schelling sorting and cutting technology brings precision and efficiency, on time and on budget.",
      },
      {
        title: "Finishing & install",
        body: "Any color, finish or stain with UV-inhibiting topcoats, installed by the same team that built it.",
      },
    ],
    stepsImg: `${asset}/factory/2777aef6_image.png`,
    deliverables: [
      { title: "Bid-day pricing", body: "Comprehensive, competitive numbers for presentation on bid day." },
      { title: "Submittal package", body: "Shop drawings and samples prepared by our engineering team." },
      { title: "Custom finishes", body: "Color-matched stains and top coats formulated with UV inhibitors." },
      { title: "Complete install", body: "Installed with the same attention to detail as our fabrication." },
    ],
    deliverablesImg: `${asset}/factory/bc70d6ea_image.png`,
  },
  {
    slug: "acoustical",
    title: "Acoustical",
    kicker: "AMC Acoustical",
    intro: "Let's keep things quiet. High-performance sound absorption panels that capture and reduce reverberation in any space.",
    hero: `${asset}/cat-acoustics.png`,
    overview:
      "Let's face it: we can all use less noise and distraction in our lives. AMC Acoustical's High Performance Sound Absorption Panels capture and reduce sound reverberation, creating quieter, less distracting work and office spaces, common areas, restaurants, libraries, lecture halls, auditoriums, theaters, studios and concert halls, while meeting or exceeding all NRC or SAA requirements for your project.",
    overviewImg: `${asset}/2c527.png`,
    meta: [
      { label: "Spaces", value: "Office · Education · Hospitality" },
      { label: "Systems", value: "Ceiling · Wall · Baffles" },
      { label: "Performance", value: "Meets or exceeds NRC / SAA" },
      { label: "Region", value: "PA · NY · NJ" },
    ],
    tags: ["Ceiling · Wall systems", "NRC · SAA compliant"],
    items: [
      {
        title: "Wood Veneer & P-Lam",
        img: `${asset}/36166.png`,
        body: "High performance acoustic ceiling and wall panel systems using MDF or FRP cores, in a wide range of wood species and finishes.",
      },
      {
        title: "Fabric Ceiling & Wall",
        img: `${asset}/4440b.png`,
        body: "Fabric panels matched to any specified fabric, offering high performance sound absorption and a softer look.",
      },
      {
        title: "Linear Wood Ceiling & Wall Systems",
        img: `${asset}/4e931.png`,
        body: "Custom linear systems that add design and texture to ceilings and walls with superior sound absorption.",
      },
      {
        title: "Panelized Acoustical Panels",
        img: `${asset}/5b70d.png`,
        body: "Standard-size panels that fit your existing ceiling grid for easier installation and less down time.",
      },
      {
        title: "Coffered Acoustic Panels",
        img: `${asset}/67697.png`,
        body: "Texture and detail that reduce reverberation; retrofit existing coffers or design a custom ceiling.",
      },
      { title: "Reflective Ceiling Panels", img: `${asset}/6896d.png`, body: "Reflective panels that direct sound to your audience." },
      { title: "Ceiling Sound Baffles", img: `${asset}/6b3df.png`, body: "Ceiling baffles and blades that absorb reverberation." },
      { title: "Diffusers & Ceiling Clouds", img: `${asset}/74e34.png`, body: "Diffusers and clouds that manage background noise." },
      { title: "Custom Design Solutions", img: `${asset}/803d7.png`, body: "Bring us your design and we'll engineer, fabricate and install it." },
    ],
    steps: [
      { title: "Acoustical consulting", body: "Our experts provide personalized consultations to assess your space and recommend the best acoustical solutions." },
      { title: "Design & engineering", body: "We design acoustical solutions that blend seamlessly with your interior while optimizing auditory comfort." },
      { title: "Installation", body: "Our skilled team ensures precise and efficient installation of acoustical panels, ceilings and other elements." },
      { title: "Maintenance & repair", body: "Ongoing maintenance and repair services keep your acoustical systems in top condition." },
      { title: "Custom solutions", body: "From custom-designed acoustical panels to unique soundproofing projects, we cater to your specific requirements." },
    ],
    stepsTitle: "Our services",
    stepsAside: "From the first consultation to long-term care.",
    stepsImg: `${asset}/factory/11af8e22_image.png`,
    deliverables: [
      { title: "NRC / SAA compliance", body: "Products that meet or exceed the acoustic requirements of your project." },
      { title: "Wood & fabric finishes", body: "A wide range of wood species, fabrics and finishes to create your own unique space." },
      { title: "LEED guidance", body: "In-house LEED accredited experts guide your project to completion with a Green Advantage." },
      { title: "FSC® certified", body: "Ask us about the availability of FSC® certified products." },
    ],
    deliverablesImg: `${asset}/9765d.png`,
  },
  {
    slug: "surfaces",
    title: "Surfaces",
    kicker: "American Surfaces",
    intro: "For first impressions, and lasting impressions. Custom commercial solid surfaces for office, retail, academic and healthcare spaces.",
    hero: `${asset}/2e51c.png`,
    overview:
      "Solid surfaces such as Corian can be used in a variety of applications. Non-porous, durable, easy to maintain and able to be shaped to fit any design, they are a popular choice across residential and commercial settings, from countertops and seamless wall cladding to custom furniture, sinks and healthcare environments.",
    overviewImg: `${asset}/6896d.png`,
    meta: [
      { label: "Spaces", value: "Office · Retail · Academic" },
      { label: "Material", value: "Solid surface · Corian" },
      { label: "Lead time", value: "Lorem ipsum" },
      { label: "Region", value: "PA · NY · NJ" },
    ],
    tags: ["Solid surface · Corian", "Retail · Healthcare"],
    items: [
      {
        title: "Countertops",
        img: `${asset}/6b3df.png`,
        body: "A popular choice for kitchen and bath because it is non-porous, easy to clean and comes in a wide variety of colors and patterns.",
      },
      {
        title: "Wall Cladding",
        img: `${asset}/74e34.png`,
        body: "Seamless wall cladding for settings from commercial spaces to residences. Durable, easy to maintain and shaped to fit any design.",
      },
      {
        title: "Furniture",
        img: `${asset}/803d7.png`,
        body: "Custom tables, desks and shelves in a versatile material that can be shaped and formed into a variety of designs.",
      },
      {
        title: "Sinks & Bathtubs",
        img: `${asset}/825ea.png`,
        body: "Seamless sinks and bathtubs that are easy to clean and custom-designed to fit any space and style.",
      },
      {
        title: "Retail & Hospitality",
        img: `${asset}/875eb.png`,
        body: "Durable, attractive surfaces for countertops, bars and fixtures in hotels, restaurants and stores.",
      },
      {
        title: "Healthcare Facilities",
        img: `${asset}/197f8.png`,
        body: "A non-porous material that is easy to sanitize and maintain, for countertops, wall cladding and more.",
      },
    ],
    steps: [
      { title: "Clean up spills", body: "Solid surfaces are non-porous and resist stains, but cleaning spills promptly prevents damage or discoloration." },
      { title: "Use a gentle cleaner", body: "Avoid abrasive or acidic cleaners. Use mild dish soap and water or a cleaner designed for solid surfaces." },
      { title: "Cutting boards & trivets", body: "Protect the surface from sharp objects and hot pots and pans with cutting boards and trivets." },
      { title: "Avoid heavy impacts", body: "Solid surfaces can crack or chip under heavy objects, so take care when placing or moving heavy items." },
      { title: "Professional maintenance", body: "A periodic professional cleaning can repair damage, remove stains and restore the original finish." },
    ],
    stepsTitle: "Care & maintenance",
    stepsAside: "Proper care ensures the longevity and durability of your solid surfaces.",
    stepsImg: `${asset}/factory/bc70d6ea_image.png`,
    deliverables: [
      { title: "Non-porous", body: "Hygienic surfaces that resist stains and are easy to sanitize." },
      { title: "Seamless", body: "Joints disappear for continuous countertops, walls and sinks." },
      { title: "Repairable", body: "Damage and stains can be professionally restored." },
      { title: "Any shape", body: "Thermoformed and fabricated to fit any design." },
    ],
    deliverablesImg: `${asset}/875eb.png`,
  },
]

const CAPABILITIES = [
  {
    title: "Experienced estimators",
    body: "We assist you in submitting bids on complex architectural millwork, plastic laminate casework or store fixtures for any market.",
  },
  {
    title: "Engineering department",
    body: "Process and submittal engineers supported by the latest software, with labeling and bar-code scanning for quality and reliability.",
  },
  {
    title: "Lean manufacturing",
    body: "American Millwork and AmeriCase™ use Lean Manufacturing practices to meet our continuous improvement goals.",
  },
  {
    title: "AMC Installers LLC",
    body: "Our installation company installs millwork, casework and fixtures using open, prevailing or union craftsmen.",
  },
  {
    title: "LEED accredited",
    body: "In-house experts can guide your project to successful completion with a Green Advantage.",
  },
]

const FAQ = [
  { q: "Which regions do you serve?", a: "We work across Pennsylvania, New York and New Jersey, with additional reach into Maryland and D.C." },
  { q: "Do you handle installation?", a: "Yes. AMC Installers LLC installs everything we manufacture, with open, prevailing or union crews." },
  { q: "Can you work from our architect's drawings?", a: LOREM },
  { q: "What is a typical lead time?", a: LOREM },
  { q: "Do you offer custom finishes?", a: LOREM },
]

/* Staggered clip-reveal shared with the homepage services list. */
export function useRowReveal(count: number) {
  const rows = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const current: number[] = Array.from({ length: count }, () => (reduce ? 1 : 0))
    let raf = 0
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = () => {
      const vh = window.innerHeight
      let moving = false
      rows.current.forEach((row, i) => {
        if (!row) return
        const top = row.getBoundingClientRect().top
        const target = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.98 - top) / (vh * 0.58)))
        const next = current[i] + (target - current[i]) * 0.09
        current[i] = Math.abs(target - next) < 0.001 ? target : next
        if (current[i] !== target) moving = true
        const p = ease(current[i])
        row.style.setProperty("--clip", `${(1 - p) * 82}%`)
        row.style.setProperty("--scale", `${1.12 - p * 0.12}`)
        row.style.setProperty("--fade", `${0.15 + p * 0.85}`)
        row.style.setProperty("--shift", `${(1 - p) * 24}px`)
      })
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("scroll", kick, { passive: true })
    window.addEventListener("resize", kick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", kick)
      window.removeEventListener("resize", kick)
    }
  }, [count])
  return (i: number) => (el: HTMLElement | null) => {
    rows.current[i] = el
  }
}

const reveal = {
  text: { opacity: "var(--fade, 1)", transform: "translateY(var(--shift, 0px))" },
  clip: { clipPath: "inset(0 var(--clip, 0%) 0 0)" },
  img: { transform: "scale(var(--scale, 1))", transformOrigin: "left center" },
} as const

function SectionHead({ title, n, aside }: { title: string; n: string; aside?: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
        {title}
        <sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[{n}]</sup>
      </h2>
      {aside && <p className="max-w-[360px] text-body2-s leading-[1.6] text-black/60 md:text-right">{aside}</p>}
    </div>
  )
}

function ItemCard({ item, compact = false }: { item: Item; compact?: boolean }) {
  if (compact) item = { title: item.title, img: item.img }
  return (
    <figure className="group">
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={item.img}
          alt={item.title}
          className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <figcaption className="mt-3">
        {item.label && <span className="block text-caption-s text-black/50">{item.label}</span>}
        <span className="mt-1 block text-h4-s leading-tight">{item.title}</span>
        {item.body && <span className="mt-2 block max-w-[420px] text-body2-s text-black/60">{item.body}</span>}
      </figcaption>
    </figure>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-10 md:grid-cols-[35%_1fr]">
        <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
          FAQ<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[05]</sup>
        </h2>
        <ul className="border-t border-black/15">
          {FAQ.map((f, i) => (
            <li key={f.q} className="border-b border-black/15">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center gap-8 py-6 text-left"
                aria-expanded={open === i}
              >
                <span className="text-caption-s text-black/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-h4-m leading-snug ">{f.q}</span>
                <span className={`text-h4-m transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <p className="overflow-hidden pl-[52px] pr-10 text-body2-m leading-[1.6] text-black/60">
                  <span className="block pb-6">{f.a}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="mx-auto max-w-[1750px] px-6 pb-24 md:px-10 md:pb-32">
      <div className="border-t border-black/15 pt-16 md:pt-20">
        <h2 className="text-h1-s md:text-h1-m xl:text-h1-l uppercase leading-[0.95] tracking-[-0.04em] ">
          <span className="block">Let's build</span>
          <span className="block md:pl-[18%]">something</span>
          <span className="flex flex-wrap items-end justify-between gap-6">
            lasting.
            <a href="#/contact" tabIndex={-1} className="mb-3">
              <OutlineButton>Get a quote</OutlineButton>
            </a>
          </span>
        </h2>
      </div>
    </section>
  )
}

/* ---------- Overview: #/services ---------- */
export function ServicesOverview() {
  const ref = useRowReveal(SERVICE_DATA.length)
  return (
    <>
      <section className="mx-auto max-w-[1750px] px-6 pt-32 md:px-10 md:pt-[160px]">
        <Eyebrow>What we do</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="text-h1-s md:text-h1-m xl:text-h1-l leading-[0.95] tracking-[-0.04em] ">
            One source.
            <br />
            Every detail.
          </h1>
          <p className="max-w-[420px] text-body1-s leading-[1.6] text-black/70 md:text-right">
            Millwork, casework, acoustical and surfaces, estimated, engineered, built and installed by one team in
            Emmaus, PA since 2002.
          </p>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-[1.6fr_1fr]">
          <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:h-[560px]">
            <img src={`${asset}/factory/bc70d6ea_image.png`} alt="AMC shop floor" className="size-full object-cover" />
          </div>
          <div className="aspect-[4/3] overflow-hidden md:aspect-auto md:h-[560px]">
            <img src={`${asset}/factory/11af8e22_image.png`} alt="AMC craftsman" className="size-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <SectionHead
          title="Our services"
          n="01"
          aside="From estimating to final installation, every service is delivered in-house so quality never changes hands."
        />
        <div className="mt-16 space-y-24 md:space-y-32">
          {SERVICE_DATA.map((s, i) => (
            <article key={s.slug} ref={ref(i)}>
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" style={reveal.text}>
                <div>
                  <span className="text-caption-s text-black/50">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="mt-2 text-h2-s xl:text-h2-m leading-[1.05] tracking-[-0.02em] ">{s.title}</h3>
                  <p className="mt-4 max-w-[480px] text-body2-m leading-[1.6] text-black/60">{s.intro}</p>
                </div>
                <div className="flex flex-col gap-4 sm:max-w-[400px] lg:w-[340px]">
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-caption-s text-black/70">
                    {s.tags.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-black" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`#/services/${s.slug}`}
                    className="flex items-center justify-center gap-2 bg-black py-3 text-caption-s uppercase tracking-wide text-white transition-colors hover:bg-black/80"
                  >
                    View {s.title} <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
              <div className="mt-8 overflow-hidden" style={reveal.clip}>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4" style={reveal.img}>
                  {s.items.slice(0, 4).map((it) => (
                    <ItemCard key={it.title} item={it} compact />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
              Our process<sup className="ml-2 align-super text-caption-s tracking-normal text-white/50">[02]</sup>
            </h2>
            <p className="max-w-[360px] text-body2-s leading-[1.6] text-white/60 md:text-right">
              The capabilities behind every AMC project.
            </p>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {CAPABILITIES.map((c, i) => (
              <div key={c.title} className="border-l border-white/25 pl-5">
                <span className="text-caption-s text-white/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-h4-m leading-[1.25]">{c.title}</h3>
                <p className="mt-4 text-body2-s leading-[1.6] text-white/65">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <Cta />
    </>
  )
}

/* ---------- Detail: #/services/<slug> ---------- */
export function ServiceDetail() {
  const slug = window.location.hash.replace("#/services/", "")
  const s = SERVICE_DATA.find((x) => x.slug === slug) ?? SERVICE_DATA[0]
  const idx = SERVICE_DATA.indexOf(s)
  const next = SERVICE_DATA[(idx + 1) % SERVICE_DATA.length]
  const ref = useRowReveal(1)
  return (
    <>
      <section className="mx-auto max-w-[1750px] px-6 pt-32 md:px-10 md:pt-[160px]">
        <a href="#/services" className="text-caption-m text-black/60 transition-colors hover:text-black">
          ← {s.kicker}
        </a>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="text-h1-s md:text-h1-m xl:text-h1-l leading-[0.95] tracking-[-0.04em] ">{s.title}</h1>
          <p className="max-w-[420px] text-body1-s leading-[1.6] text-black/70 md:text-right">{s.intro}</p>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-black/15 pt-5 md:grid-cols-4">
          {s.meta.map((m) => (
            <div key={m.label}>
              <dt className="text-caption-s text-black/50">{m.label}</dt>
              <dd className="mt-1 text-body2-m">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 aspect-[16/10] overflow-hidden md:aspect-auto md:h-[620px]">
          <img src={s.hero} alt={s.title} className="size-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[35%_1fr]">
          <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
            Overview<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[01]</sup>
          </h2>
          <p className="max-w-[720px] text-h3-s xl:text-h3-m leading-[1.45] tracking-[-0.01em] ">{s.overview}</p>
        </div>
        <div ref={ref(0)} className="mt-16 aspect-[16/9] overflow-hidden md:aspect-auto md:h-[680px]" style={reveal.clip}>
          <img src={s.overviewImg} alt="" className="size-full object-cover" style={reveal.img} />
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 md:px-10">
        <SectionHead title="What we build" n="02" aside={`The core ${s.title.toLowerCase()} products we engineer and fabricate in-house.`} />
        <div
          className={`mt-14 grid gap-x-3 gap-y-10 ${
            s.items.length % 3 === 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {s.items.map((it) => (
            <ItemCard key={it.title} item={it} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <SectionHead title={s.stepsTitle ?? "How it works"} n="03" aside={s.stepsAside ?? "One team from bid day to final punch list."} />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_40%]">
          <ol className="border-t border-black/15">
            {s.steps.map((st, i) => (
              <li key={st.title} className="grid grid-cols-[80px_1fr] gap-6 border-b border-black/15 py-8 lg:grid-cols-[140px_200px_1fr]">
                <span className="text-caption-s text-black/50">Step {i + 1}</span>
                <span className="text-caption-s text-black/50 max-lg:hidden">{st.title}</span>
                <div>
                  <h3 className="text-h4-s lg:hidden">{st.title}</h3>
                  <p className="text-body1-s leading-[1.6] max-lg:mt-2 max-lg:text-black/70">{st.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="aspect-[4/5] overflow-hidden max-lg:max-h-[520px] max-lg:w-full lg:aspect-auto">
            <img src={s.stepsImg} alt="" className="size-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 md:px-10">
        <SectionHead title="What you get" n="04" aside={LOREM_SHORT} />
        <div className="mt-14 aspect-[16/9] overflow-hidden md:aspect-auto md:h-[560px]">
          <img src={s.deliverablesImg} alt="" className="size-full object-cover" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {s.deliverables.map((d, i) => (
            <div key={d.title}>
              <span className="text-caption-s text-black/50">[{String(i + 1).padStart(2, "0")}]</span>
              <h3 className="mt-3 text-h4-m leading-tight">{d.title}</h3>
              <p className="mt-2 text-body2-s leading-[1.6] text-black/60">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq />

      <section className="mx-auto max-w-[1750px] px-6 pb-24 md:px-10 md:pb-32">
        <a href={`#/services/${next.slug}`} className="group flex items-end justify-between gap-6 border-y border-black/15 py-12">
          <div>
            <span className="text-caption-s text-black/50">Next service</span>
            <span className="mt-2 block text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">{next.title}</span>
          </div>
          <span className="mb-4 text-h3-s xl:text-h3-m transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
        </a>
      </section>

      <Cta />
    </>
  )
}

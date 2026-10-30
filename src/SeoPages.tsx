import { LoopVideo } from "./LoopVideo"
import { useState } from "react"
import { Eyebrow, OutlineButton } from "./App"

const asset = "/media"

type FaqItem = { q: string; a: string }

function PageFaq({ items, n = "04" }: { items: FaqItem[]; n?: string }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-10 md:grid-cols-[35%_1fr]">
        <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
          FAQ<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[{n}]</sup>
        </h2>
        <ul className="border-t border-black/15">
          {items.map((f, i) => (
            <li key={f.q} className="border-b border-black/15">
              <button
                type="button"
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

function PageCta({ line1 = "Ready to talk", line2 = "about your", line3 = "project?" }: { line1?: string; line2?: string; line3?: string }) {
  return (
    <section className="mx-auto max-w-[1750px] px-6 pb-24 md:px-10 md:pb-32">
      <div className="border-t border-black/15 pt-16 md:pt-20">
        <h2 className="text-h1-s md:text-h1-m xl:text-h1-l uppercase leading-[0.95] tracking-[-0.04em] ">
          <span className="block">{line1}</span>
          <span className="block md:pl-[18%]">{line2}</span>
          <span className="flex flex-wrap items-end justify-between gap-6">
            {line3}
            <a href="#/contact" tabIndex={-1} className="mb-3">
              <OutlineButton>Contact us</OutlineButton>
            </a>
          </span>
        </h2>
      </div>
    </section>
  )
}

function RelatedLinks({ links }: { links: { href: string; label: string; note: string }[] }) {
  return (
    <section className="mx-auto max-w-[1750px] px-6 pb-8 md:px-10">
      <div className="border-t border-black/15 pt-12">
        <Eyebrow>keep reading</Eyebrow>
        <ul className="mt-8 grid gap-0 border-t border-black/15 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.href} className="border-b border-black/15 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <a href={l.href} className="group flex h-full flex-col justify-between gap-6 px-0 py-8 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <div>
                  <span className="text-caption-s text-black/50">{l.note}</span>
                  <span className="mt-2 block text-h4-m leading-snug ">{l.label}</span>
                </div>
                <span className="text-h4-s transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- #/insights/casework-vs-millwork ---------- */
const VS_FAQ: FaqItem[] = [
  {
    q: "Is casework the same as cabinets?",
    a: "Close. Casework usually means built-in cabinets and storage for commercial or institutional spaces. Residential kitchen cabinets are related, but commercial casework is built to different specs and duty cycles.",
  },
  {
    q: "When do I need millwork instead of casework?",
    a: "When the design calls for feature walls, reception desks, custom trim, or anything that is not a standard cabinet box. Millwork covers the custom architectural pieces that define a space.",
  },
  {
    q: "Can one shop supply both?",
    a: "Yes. At AMC, AmeriCase handles commercial casework while American Millwork builds the custom architectural package. One plant in Emmaus, PA. One install team.",
  },
  {
    q: "Which should go on the bid?",
    a: "Often both. Specs may split casework and millwork into separate sections. We bid plastic laminate, veneer, solid wood and semi-custom casework alongside custom millwork so the package stays coordinated.",
  },
]

export function CaseworkVsMillworkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1750px] px-6 pt-32 md:px-10 md:pt-[160px]">
        <Eyebrow>insights</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="max-w-[900px] text-h1-s md:text-h1-m xl:text-h1-l leading-[0.95] tracking-[-0.04em] ">
            Casework vs millwork
          </h1>
          <p className="max-w-[420px] text-body1-s leading-[1.6] text-black/70 md:text-right">
            A plain-language guide for architects, GCs and owners who need both on the same job.
          </p>
        </div>
        <div className="mt-14 aspect-[16/10] overflow-hidden md:aspect-auto md:h-[520px]">
          <LoopVideo name="loop08" label="Commercial casework and custom millwork fabricated by American Millwork & Cabinetry" className="size-full" />
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[35%_1fr]">
          <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
            The short answer<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[01]</sup>
          </h2>
          <div className="max-w-[720px] space-y-6 text-body1-s leading-[1.7] text-black/80">
            <p>
              <strong className="font-medium text-black">Casework</strong> is the cabinets and storage. Boxes, drawers, shelves, nurse stations, classroom units, break-room banks. Often plastic laminate or veneer. Built to repeat cleanly across many rooms.
            </p>
            <p>
              <strong className="font-medium text-black">Millwork</strong> is the custom architectural woodwork. Wall paneling, reception desks, trim, feature walls, fixtures that do not come from a catalog. Premium grade when the space needs it.
            </p>
            <p>
              Most commercial projects need both. The casework keeps the building working. The millwork sets the look.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 md:px-10">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="border border-black/15 p-8 md:p-10">
            <Eyebrow>casework</Eyebrow>
            <h3 className="mt-4 text-h3-s md:text-h3-m leading-[1.15] tracking-[-0.02em] ">Built to repeat</h3>
            <ul className="mt-6 space-y-3 text-body2-s leading-[1.6] text-black/70">
              <li>Plastic laminate, veneer or solid wood</li>
              <li>Standard and semi-custom runs</li>
              <li>Healthcare, education, industrial, office</li>
              <li>Bid-day pricing and Microvellum detailing</li>
              <li>At AMC: AmeriCase™ division</li>
            </ul>
            <a href="#/americase" className="mt-8 inline-flex text-body2-s underline underline-offset-4 transition-colors hover:text-black/60">
              Commercial casework / AmeriCase →
            </a>
          </div>
          <div className="border border-black/15 bg-dark-950 p-8 text-white md:p-10">
            <Eyebrow>millwork</Eyebrow>
            <h3 className="mt-4 text-h3-s md:text-h3-m leading-[1.15] tracking-[-0.02em] ">Built to the space</h3>
            <ul className="mt-6 space-y-3 text-body2-s leading-[1.6] text-white/70">
              <li>Custom panels, desks, trim and fixtures</li>
              <li>AWI Premium and Custom grades</li>
              <li>Lobbies, hospitality, institutional interiors</li>
              <li>Shop drawings, samples, field measure</li>
              <li>At AMC: American Millwork division</li>
            </ul>
            <a href="#/services/architectural-millwork" className="mt-8 inline-flex text-body2-s text-white underline underline-offset-4 transition-colors hover:text-white/70">
              Architectural millwork →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[35%_1fr]">
          <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
            Why the split matters<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[02]</sup>
          </h2>
          <div className="max-w-[720px] space-y-6 text-body1-s leading-[1.7] text-black/80">
            <p>
              Specs often put casework and millwork in different sections. Estimators need clear scope. Fabrication runs on different machines and schedules. Install still has to land as one package.
            </p>
            <p>
              We keep both under one roof in Emmaus, PA. About 80,000 sq ft. AWI members with QCP certification for AMC, AMC Installers and AmeriCase. That keeps the grain, the finish and the punch list aligned.
            </p>
            <p>
              See real work in the{" "}
              <a href="#/portfolio/casework" className="underline underline-offset-4">
                casework portfolio
              </a>{" "}
              and{" "}
              <a href="#/portfolio/millwork" className="underline underline-offset-4">
                millwork portfolio
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <PageFaq items={VS_FAQ} n="03" />
      <RelatedLinks
        links={[
          { href: "#/americase", label: "Commercial casework / AmeriCase", note: "Hub" },
          { href: "#/services/architectural-millwork", label: "Architectural millwork", note: "PA & Mid-Atlantic" },
          { href: "#/contact", label: "Request a bid", note: "Contact" },
        ]}
      />
      <PageCta />
    </>
  )
}

/* ---------- #/americase  (commercial casework hub) ---------- */
const CASE_FAQ: FaqItem[] = [
  {
    q: "What materials does AmeriCase offer?",
    a: "Plastic laminate, veneer and solid wood. Standard and semi-custom casework for industrial, medical, education and commercial spaces.",
  },
  {
    q: "Can you help on bid day?",
    a: "Yes. Our estimators assist with bids on plastic laminate, veneer, solid wood and semi-custom casework for any market we serve.",
  },
  {
    q: "How do you detail casework?",
    a: "From prototypes to submittals we use Microvellum with current AutoCAD. Shop drawings and samples go out before production.",
  },
  {
    q: "Who installs the casework?",
    a: "AMC Installers LLC. Open, prevailing or union craftsmen as the project requires. Same team that builds it.",
  },
]

export function CommercialCaseworkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1750px] px-6 pt-32 md:px-10 md:pt-[160px]">
        <a href="#/services" className="text-caption-m text-black/60 transition-colors hover:text-black">
          ← AmeriCase™ division
        </a>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="max-w-[900px] text-h1-s md:text-h1-m xl:text-h1-l leading-[0.95] tracking-[-0.04em] ">
            Commercial casework
          </h1>
          <p className="max-w-[420px] text-body1-s leading-[1.6] text-black/70 md:text-right">
            AmeriCase builds laminate, veneer and modular casework for bid-day buyers across healthcare, education and commercial work.
          </p>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-black/15 pt-5 md:grid-cols-4">
          {[
            { label: "Division", value: "AmeriCase™" },
            { label: "Materials", value: "Laminate · Veneer · Solid wood" },
            { label: "Markets", value: "Medical · Education · Industrial" },
            { label: "Plant", value: "Emmaus, PA · ~80k sq ft" },
          ].map((m) => (
            <div key={m.label}>
              <dt className="text-caption-s text-black/50">{m.label}</dt>
              <dd className="mt-1 text-body2-m">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 aspect-[16/10] overflow-hidden md:aspect-auto md:h-[560px]">
          <LoopVideo name="loop24" label="AmeriCase commercial casework in production at AMC Emmaus" className="size-full" />
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[35%_1fr]">
          <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
            Built for bid day<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[01]</sup>
          </h2>
          <div className="max-w-[720px] space-y-6 text-body1-s leading-[1.7] text-black/80">
            <p>
              AmeriCase is the commercial casework division of American Millwork &amp; Cabinetry. We work with architects, design teams and contractors to produce casegoods that hold up in real use.
            </p>
            <p>
              Our Emmaus plant was the first architectural casework manufacturer to install a Schelling panel saw and retrieval system. That precision shows up in laminate runs, veneer packages and semi-custom units alike.
            </p>
            <p>
              Need the difference between casework and millwork spelled out? Read the{" "}
              <a href="#/insights/casework-vs-millwork" className="underline underline-offset-4">
                casework vs millwork
              </a>{" "}
              guide.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 md:px-10">
        <Eyebrow>what we build</Eyebrow>
        <h2 className="mt-4 text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">Casework that ships on schedule</h2>
        <div className="mt-14 grid gap-x-3 gap-y-10 grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Plastic laminate", body: "Durable, cleanable finishes for high-traffic rooms.", img: `${asset}/f291a.png` },
            { title: "Veneer casework", body: "Wood face when the spec calls for a warmer look.", img: `${asset}/40490.png` },
            { title: "Medical & education", body: "Nurse stations, labs, classrooms and support rooms.", img: `${asset}/197f8.png` },
            { title: "Industrial & modular", body: "Heavy-duty storage and semi-custom layouts.", img: `${asset}/b1ab7.png` },
          ].map((it) => (
            <div key={it.title}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={it.img} alt={it.title} className="size-full object-cover" />
              </div>
              <h3 className="mt-4 text-h4-m leading-tight">{it.title}</h3>
              <p className="mt-2 text-body2-s leading-[1.6] text-black/60">{it.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[35%_1fr]">
          <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
            How a package moves<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[02]</sup>
          </h2>
          <ol className="border-t border-black/15">
            {[
              { t: "Estimating", b: "Competitive numbers for plastic laminate, veneer, solid wood and semi-custom casework." },
              { t: "Engineering", b: "Microvellum and AutoCAD from prototype through submittal package." },
              { t: "Fabrication", b: "Schelling sorting and cutting. UV-inhibiting topcoats. Bar-code labeled parts." },
              { t: "Install", b: "AMC Installers puts it in place and closes the punch list." },
            ].map((s, i) => (
              <li key={s.t} className="grid grid-cols-[80px_1fr] gap-6 border-b border-black/15 py-8 lg:grid-cols-[140px_200px_1fr]">
                <span className="text-caption-s text-black/50">Step {i + 1}</span>
                <span className="text-caption-s text-black/50 max-lg:hidden">{s.t}</span>
                <div>
                  <h3 className="text-h4-s lg:hidden">{s.t}</h3>
                  <p className="text-body1-s leading-[1.6] max-lg:mt-2 max-lg:text-black/70">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-10 max-w-[720px] text-body2-s leading-[1.6] text-black/60">
          AWI and QCP certified. Family business in the Lehigh Valley since 2003. Browse the{" "}
          <a href="#/portfolio/casework" className="underline underline-offset-4 text-black">
            casework portfolio
          </a>{" "}
          or the full{" "}
          <a href="#/americase" className="underline underline-offset-4 text-black">
            AmeriCase commercial casework hub
          </a>
          .
        </p>
      </section>

      <PageFaq items={CASE_FAQ} n="03" />
      <RelatedLinks
        links={[
          { href: "#/insights/casework-vs-millwork", label: "Casework vs millwork", note: "Explainer" },
          { href: "#/services/architectural-millwork", label: "Architectural millwork", note: "Custom woodwork" },
          { href: "#/about", label: "About AMC", note: "Emmaus plant" },
        ]}
      />
      <PageCta line1="Need casework" line2="numbers for" line3="bid day?" />
    </>
  )
}

/* ---------- #/services/architectural-millwork ---------- */
const MILL_FAQ: FaqItem[] = [
  {
    q: "Where is AMC based?",
    a: "Main office and manufacturing in Emmaus, PA (Lehigh Valley). Additional office in Annapolis, MD. We deliver across the Northeast corridor.",
  },
  {
    q: "Which markets do you cover?",
    a: "Pennsylvania, New York, New Jersey, Philadelphia, Harrisburg, Baltimore and Washington, D.C., with reach across the Mid-Atlantic.",
  },
  {
    q: "What grades do you build to?",
    a: "AWI Premium and Custom. AMC, AMC Installers and AmeriCase are QCP-certified. Long-term AWI members in good standing.",
  },
  {
    q: "Do you install?",
    a: "Yes. AMC Installers LLC handles millwork, casework and fixtures with open, prevailing or union craftsmen.",
  },
]

export function ArchitecturalMillworkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1750px] px-6 pt-32 md:px-10 md:pt-[160px]">
        <a href="#/services" className="text-caption-m text-black/60 transition-colors hover:text-black">
          ← Architectural woodwork
        </a>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="max-w-[980px] text-h1-s md:text-h1-m xl:text-h1-l leading-[0.95] tracking-[-0.04em] ">
            Architectural millwork
          </h1>
          <p className="max-w-[420px] text-body1-s leading-[1.6] text-black/70 md:text-right">
            Custom millwork engineered, built and installed from our Emmaus, PA plant for projects across Pennsylvania and the Mid-Atlantic.
          </p>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-black/15 pt-5 md:grid-cols-4">
          {[
            { label: "Plant", value: "Emmaus, PA · Lehigh Valley" },
            { label: "Office", value: "Annapolis, MD" },
            { label: "Facility", value: "~80,000 sq ft" },
            { label: "Quality", value: "AWI · QCP certified" },
          ].map((m) => (
            <div key={m.label}>
              <dt className="text-caption-s text-black/50">{m.label}</dt>
              <dd className="mt-1 text-body2-m">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 aspect-[16/10] overflow-hidden md:aspect-auto md:h-[560px]">
          <LoopVideo name="loop19" label="Architectural millwork fabricated at American Millwork & Cabinetry in Emmaus, PA" className="size-full" />
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[35%_1fr]">
          <h2 className="text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
            Built in Pennsylvania<sup className="ml-2 align-super text-caption-s tracking-normal text-black/50">[01]</sup>
          </h2>
          <div className="max-w-[720px] space-y-6 text-body1-s leading-[1.7] text-black/80">
            <p>
              American Millwork &amp; Cabinetry is a family business shipping custom architectural millwork since 2003. The shop sits in Emmaus, five miles south of Allentown in the Lehigh Valley.
            </p>
            <p>
              Cabinets, tops, trim and panels move through dedicated zones at the same time. Complex packages stay coordinated. We take the details other shops pass on.
            </p>
            <p>
              Not sure if your scope is millwork or casework? Start with{" "}
              <a href="#/insights/casework-vs-millwork" className="underline underline-offset-4">
                casework vs millwork
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-dark-950 text-white">
        <div className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
          <Eyebrow>service area</Eyebrow>
          <h2 className="mt-4 max-w-[800px] text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">
            Mid-Atlantic delivery from the Lehigh Valley
          </h2>
          <p className="mt-6 max-w-[560px] text-body1-s leading-[1.6] text-white/70">
            HQ and manufacturing in Emmaus, PA. Additional office in Annapolis, MD. Installed across the Northeast corridor.
          </p>
          <ul className="mt-14 grid grid-cols-2 gap-4 border-t border-white/20 pt-8 sm:grid-cols-3 lg:grid-cols-6">
            {["New York", "New Jersey", "Philadelphia", "Harrisburg", "Baltimore", "Washington, D.C."].map((c) => (
              <li key={c} className="text-h4-m leading-tight">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-body2-s text-white/60">
            See{" "}
            <a href="#/" className="underline underline-offset-4 text-white">
              Our Locations
            </a>{" "}
            on the home page, or{" "}
            <a href="#/about" className="underline underline-offset-4 text-white">
              About
            </a>{" "}
            for the plant story.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <Eyebrow>what we build</Eyebrow>
        <h2 className="mt-4 text-h2-s md:text-h2-m xl:text-h2-l leading-[1] tracking-[-0.03em] ">From lobby walls to reception desks</h2>
        <div className="mt-14 grid gap-x-3 gap-y-10 grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Wall paneling", img: `${asset}/e5b5d.png`, body: "Feature walls with continuous grain matching." },
            { title: "Reception desks", img: `${asset}/8b3b0.png`, body: "First-impression pieces built to the drawings." },
            { title: "Trim & moldings", img: `${asset}/6f79e.png`, body: "Finish details that close the room." },
            { title: "Custom fixtures", img: `${asset}/185d7.png`, body: "Shared-space millwork for hospitality and institutions." },
          ].map((it) => (
            <div key={it.title}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={it.img} alt={it.title} className="size-full object-cover" />
              </div>
              <h3 className="mt-4 text-h4-m leading-tight">{it.title}</h3>
              <p className="mt-2 text-body2-s leading-[1.6] text-black/60">{it.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-[720px] text-body2-s leading-[1.6] text-black/60">
          Explore the{" "}
          <a href="#/portfolio/millwork" className="underline underline-offset-4 text-black">
            millwork portfolio
          </a>{" "}
          or the{" "}
          <a href="#/services/architectural-millwork" className="underline underline-offset-4 text-black">
            Architectural millwork hub
          </a>
          . For commercial cabinets and storage, see{" "}
          <a href="#/americase" className="underline underline-offset-4 text-black">
            AmeriCase commercial casework
          </a>
          .
        </p>
      </section>

      <PageFaq items={MILL_FAQ} n="03" />
      <RelatedLinks
        links={[
          { href: "#/insights/casework-vs-millwork", label: "Casework vs millwork", note: "Explainer" },
          { href: "#/americase", label: "Commercial casework", note: "AmeriCase" },
          { href: "#/contact", label: "Visit the shop", note: "840 Broad St, Emmaus" },
        ]}
      />
      <PageCta line1="Let's build" line2="something" line3="lasting." />
    </>
  )
}

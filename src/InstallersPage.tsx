import { Eyebrow, OutlineButton } from "./App"

const asset = "/media"

const INSTALL_SCOPE = [
  { title: "Architectural millwork", body: "Wall paneling, reception desks, trim and custom woodwork from our own shop, set by the crews who know how it was built.", img: `${asset}/cat-millwork.png` },
  { title: "AmeriCase casework", body: "Laminate, veneer and modular casework installed level, scribed and anchored to spec.", img: `${asset}/cat-casework.png` },
  { title: "Acoustical panels and ceilings", body: "Wall panels, baffles and ceiling systems hung to layout and coordinated with the other trades overhead.", img: `${asset}/cat-acoustics.png` },
  { title: "Solid surfaces", body: "Countertops, wall cladding and fixtures in Corian and other solid surfaces, seamed and finished in place.", img: `${asset}/2e51c.png` },
]

const INSTALL_STEPS = [
  { title: "Field dimensions", body: "We catch field measures three to four weeks before manufacturing. Custom work needs accurate dimensions. We do not build to a guess." },
  { title: "Coordination with the GC", body: "Install dates, site access and sequencing are set with the general contractor so our work lands when the space is ready. [Placeholder: typical lead time to schedule]" },
  { title: "Delivery", body: "Work ships from Emmaus packed and labeled by room, so the right pieces arrive at the right place." },
  { title: "Install", body: "Our own crews set, scribe and finish the work in the field. [Placeholder: crew size]" },
  { title: "Punch list", body: "We walk the work with the GC, close out punch items and hand over a finished space. [Placeholder: warranty terms]" },
]

const SAFETY = [
  { title: "ABC STEP Award, Diamond Level", body: "Greatest safety improvement, late 2019 / early 2020.", img: `${asset}/about/awards/step-diamond.jpg` },
  { title: "Zero Lost Time", body: "Over 100,000 man hours with zero lost time in one fiscal year.", img: `${asset}/about/awards/zero-lost-time.jpg` },
  { title: "Safety Improvement", body: "Safety Improvement Recognition for year-over-year gains and the programs that stuck.", img: `${asset}/about/awards/safety-improvement.jpg` },
]

export function InstallersPage() {
  return (
    <div className="bg-white">
      <section className="relative flex min-h-screen items-end overflow-hidden bg-[#1E1E1E] text-white">
        <img src={`${asset}/amc-film-poster.jpg`} alt="American Installers crew on a lift installing a ceiling" className="absolute inset-0 size-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1750px] px-6 pb-16 md:px-10 md:pb-24">
          <p className="text-caption-m uppercase tracking-[0.16em] text-[#D9B547]">American Installers</p>
          <h1 className="mt-5 max-w-[1100px] text-[11vw] font-normal uppercase leading-[0.92] tracking-[-0.03em] md:text-[min(6.4vw,112px)]">
            Installed right. By the people who built it.
          </h1>
          <p className="mt-6 max-w-[560px] text-body1-s leading-[1.6] text-white/80">
            The installation division of American Millwork &amp; Cabinetry. Shop-built work, set in the field by our own crews.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <Eyebrow>What we install</Eyebrow>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {INSTALL_SCOPE.map((s) => (
            <article key={s.title} className="border-t border-dashed border-black/30 pt-6">
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                <img src={s.img} alt={s.title} className="size-full object-cover" />
              </div>
              <h3 className="mt-5 text-h4-m leading-[1.25]">{s.title}</h3>
              <p className="mt-3 text-body2-s leading-[1.6] text-black/60">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F3EE]">
        <div className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
          <Eyebrow>How an install works</Eyebrow>
          <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {INSTALL_STEPS.map((step, i) => (
              <li key={step.title} className="border-t border-black/20 pt-6">
                <span className="text-caption-s text-black/50">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-h4-m leading-[1.25]">{step.title}</h3>
                <p className="mt-3 text-body2-s leading-[1.6] text-black/60">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1750px] gap-12 px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
        <div>
          <Eyebrow>Service area</Eyebrow>
          <h2 className="mt-6 text-h3-s leading-[1.1] md:text-h3-m">Based in Emmaus, PA. Working across the Mid-Atlantic.</h2>
        </div>
        <div className="text-body1-s leading-[1.6] text-black/70">
          <p>Pennsylvania, New York, New Jersey, Philadelphia, Harrisburg, Baltimore and Washington, D.C., with reach across the Mid-Atlantic.</p>
          <p className="mt-4 text-black/50">[Placeholder: travel radius or regions served outside the Mid-Atlantic]</p>
        </div>
      </section>

      <section className="border-t border-dashed border-black/25">
        <div className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
          <Eyebrow>Safety</Eyebrow>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {SAFETY.map((a) => (
              <article key={a.title}>
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img src={a.img} alt={a.title} className="size-full object-cover" />
                </div>
                <h3 className="mt-5 text-h4-m leading-[1.25]">{a.title}</h3>
                <p className="mt-3 text-body2-s leading-[1.6] text-black/60">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1E1E1E] text-white">
        <div className="mx-auto flex max-w-[1750px] flex-col gap-8 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-32">
          <h2 className="max-w-[760px] text-h3-s leading-[1.1] md:text-h3-m">Need it installed? Tell us about the job.</h2>
          <a href="#/contact"><OutlineButton dark>Contact us</OutlineButton></a>
        </div>
      </section>
    </div>
  )
}

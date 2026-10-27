const asset = "/media"

const DETAILS = [
  { label: "Duration", value: "18 Months" },
  { label: "Location", value: "Blue Bell, PA" },
  { label: "Scope of work", value: "Architectural Millwork, Casework, Cabinetry" },
]

const GALLERY = [
  { src: `${asset}/825ea.png`, alt: "AVE Blue Bell lobby lounge with fireplace wall", ratio: "aspect-square" },
  { src: `${asset}/e52e8.png`, alt: "Resident co-working lounge with wood slat feature wall", ratio: "aspect-[4/5]" },
  { src: `${asset}/4e931.png`, alt: "Courtyard and outdoor amenity terrace", ratio: "aspect-[4/5]" },
  { src: `${asset}/10b28.png`, alt: "Double-height clubroom with custom bar casework", ratio: "aspect-[4/5]" },
]

export function ProjectPage() {
  return (
    <>
      {/* Hero — full bleed */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden text-white">
        <img src={`${asset}/9765d.png`} alt="AVE Blue Bell exterior" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-[58%] h-px bg-white/50" />
        <div className="relative mx-auto h-full max-w-[1750px]">
        <div className="absolute inset-y-0 left-[75.7%] hidden w-px bg-white/50 md:block" />
        <p className="absolute left-6 top-[58%] -translate-y-[calc(100%+10px)] text-body2-s md:left-10">Blue Bell, Pennsylvania</p>
        <p className="absolute left-[calc(75.7%+20px)] top-[58%] hidden -translate-y-[calc(100%+10px)] text-body2-s md:block">
          Multifamily Residential
        </p>
        <h1 className="absolute bottom-10 left-6 text-h2-s md:text-h2-m xl:text-h2-l leading-[1.2] tracking-[-0.02em] md:left-10 ">
          AVE Blue Bell
        </h1>
        <p className="absolute bottom-12 left-[calc(75.7%+20px)] hidden text-body2-s md:block">2026</p>
        </div>
      </section>

      {/* Intro + details */}
      <section className="mx-auto max-w-[1750px] px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,55%)_1fr_35%]">
          <p className="text-h4-m xl:text-h4-l leading-[1.6] tracking-[-0.02em] ">
            A 400-plus residence luxury rental community in Montgomery County, where AMC fabricated and installed the
            interior millwork for every shared space, from the double-height lobby and fireplace lounge to the
            co-working suite, fitness center and resident clubroom bar. Built in our Emmaus shop, delivered on a
            phased schedule while units stayed open for move-ins.
          </p>
          <dl className="md:col-start-3">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex gap-5 border-b border-black/50 px-2.5 py-3 text-body2-s">
                <dt className="shrink-0">{d.label}:</dt>
                <dd className="text-black/50">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Staggered gallery */}
        <div className="mt-20 grid gap-2.5 md:mt-28 md:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            <img src={GALLERY[0].src} alt={GALLERY[0].alt} className={`${GALLERY[0].ratio} w-full object-cover`} />
            <img src={GALLERY[2].src} alt={GALLERY[2].alt} className={`${GALLERY[2].ratio} w-full object-cover`} />
          </div>
          <div className="flex flex-col gap-2.5">
            <img src={GALLERY[1].src} alt={GALLERY[1].alt} className={`${GALLERY[1].ratio} w-full object-cover`} />
            <img src={GALLERY[3].src} alt={GALLERY[3].alt} className={`${GALLERY[3].ratio} w-full object-cover`} />
          </div>
        </div>
      </section>

      {/* Next project — full bleed */}
      <section className="pb-0">
        <div className="mx-auto flex max-w-[1750px] items-end justify-between gap-6 px-6 pb-4 md:px-10">
          <div>
            <p className="mb-3 text-caption-m uppercase tracking-[0.08em] text-black/50">More projects</p>
            <h2 className="text-h3-s md:text-h3-m xl:text-h3-l leading-[1.4] ">Mattison Estates</h2>
          </div>
          <a href="#/portfolio/millwork" className="pb-2 text-body2-s text-black/60 transition-colors hover:text-black">
            All projects →
          </a>
        </div>
        <a href="#/portfolio/project/ave-blue-bell" className="group block h-[60vh] max-h-[548px] min-h-[360px] w-full overflow-hidden">
          <img
            src={`${asset}/6896d.png`}
            alt="Mattison Estates clubhouse bar"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </a>
      </section>
    </>
  )
}

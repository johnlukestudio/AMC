import { LoopVideo } from "./LoopVideo"
import { Eyebrow, OutlineButton } from "./App"

const asset = "/media"

type Card = { title: string; body: string; img?: string }
type Division = {
  slug: string
  name: string
  headline: string
  intro: string[]
  hero: string
  heroVideo?: string
  cardsTitle: string
  cards: Card[]
  steps?: { title: string; title2?: string; body: string }[]
  stepsTitle?: string
  blocks?: { eyebrow: string; title: string; body: string[] }[]
  awards?: Card[]
  quote?: { text: string; name: string; role: string }
  contact?: string[]
  site?: { label: string; href: string }
}

export const DIVISION_PAGES: Division[] = [
  {
    slug: "american-installers",
    name: "American Installers",
    headline: "Installed right. By the people who built it.",
    intro: [
      "AMC Installers LLC installs everything we manufacture, with open, prevailing or union crews.",
    ],
    hero: `${asset}/amc-film-poster.jpg`,
    heroVideo: "loop03",
    cardsTitle: "What we install",
    cards: [
      { title: "Architectural millwork", img: `${asset}/cat-millwork.png`, body: "Our installation company installs millwork, casework and fixtures using open, prevailing or union craftsmen." },
      { title: "AmeriCase casework", img: `${asset}/cat-casework.png`, body: "Installed with the same attention to detail as our fabrication." },
      { title: "Acoustical panels and ceilings", img: `${asset}/cat-acoustics.png`, body: "Our skilled team ensures precise and efficient installation of acoustical panels, ceilings and other elements." },
      { title: "Solid surfaces", img: `${asset}/2e51c.png`, body: "[Placeholder: confirm solid surface install scope]" },
    ],
    stepsTitle: "How an install works",
    steps: [
      { title: "Field dimensions", body: "We catch field measures three to four weeks before manufacturing. Custom work needs accurate dimensions. We do not build to a guess." },
      { title: "Coordination with the GC", body: "[Placeholder: how install scheduling and sequencing are coordinated with the general contractor]" },
      { title: "Delivery", body: "Cabinets, tops, trim and panels built in dedicated shop zones, labeled and ready for install." },
      { title: "Install", body: "AMC Installers LLC installs with highly skilled craftsmen: open, prevailing or union, as the project requires. 9 to 11 people on install." },
      { title: "Punch list", body: "AMC Installers puts it in place and closes the punch list with the same team that built it." },
    ],
    blocks: [
      {
        eyebrow: "Service area",
        title: "Built in the Lehigh Valley. Installed across the Northeast.",
        body: ["Pennsylvania, New York, New Jersey, Philadelphia, Harrisburg, Baltimore and Washington, D.C., with reach across the Mid-Atlantic."],
      },
      {
        eyebrow: "Quality",
        title: "AWI Quality Certification Program",
        body: ["AMC, AMC Installers, and AmeriCase certified by AWI."],
      },
    ],
    awards: [
      { title: "ABC STEP Award, Diamond Level", body: "Greatest safety improvement, late 2019 / early 2020.", img: `${asset}/about/awards/step-diamond.jpg` },
      { title: "Zero Lost Time", body: "Over 100,000 man hours with zero lost time in one fiscal year.", img: `${asset}/about/awards/zero-lost-time.jpg` },
      { title: "Safety Improvement", body: "Safety Improvement Recognition for year-over-year gains and the programs that stuck.", img: `${asset}/about/awards/safety-improvement.jpg` },
    ],
  },
  {
    slug: "amc-acoustical",
    name: "AMC Acoustical",
    headline: "Let's Keep Things Quiet!",
    intro: [
      "Let’s face it we can all use less noise and distraction in our lives. AMC Acoustical’s High Performance Sound Absorption Panels will capture and reduce Sound Reverberation in your space providing quieter & less distracting spaces such as Work & Office Spaces, Common Areas, Restaurants, Libraries, Lecture Halls, Auditoriums, Theaters, Studios & Concert Halls.",
      "AMC Acoustical offers you the following products which enables us to meet or exceed all NRC or SAA requirements for your project.",
    ],
    hero: `${asset}/cat-acoustics.png`,
    heroVideo: "loop01",
    cardsTitle: "Products",
    cards: [
      { title: "Wood Veneer & P-Lam", img: `${asset}/36166.png`, body: "High Performance Acoustic Ceiling and Wall Panels Systems using MDF or FRP cores to Absorb sound and bring warmth & tranquility into your room. AMC offers a wide range of Wood Species, Finishes and Design options to create your own unique space." },
      { title: "Fabric Ceiling & Wall", img: `${asset}/4440b.png`, body: "AMC Acoustical can match any specified fabric. Our Fabric Panels offer High Performance Sound Absorption and add a “Softer Look” to your space." },
      { title: "Custom Acoustical Linear Wood Ceiling & Wall Systems", img: `${asset}/4e931.png`, body: "Bring us your design and let AMC Acoustical bring it to reality. Linear Wood Systems add Design & Texture to your ceilings and walls while offering superior sound absorption to your room." },
      { title: "Panelized Acoustical Panels", img: `${asset}/5b70d.png`, body: "Panelized Acoustical panels to fit your existing Ceiling grids. AMC Acoustical offers standard size acoustical panels that will fit your preexisting ceiling grid for ease of installation and less down time." },
      { title: "Coffered Acoustic Panels", img: `${asset}/67697.png`, body: "Coffered Acoustic Panels will add Texture & Detail while reducing Reverberation in your space. AMC Acoustical can retrofit Panels to your existing Coffered Ceiling or Design Fabricate and Install a Custom Designed ceiling to meet your unique requirements." },
      { title: "Reflective Ceiling Panels", body: "Reflective Ceiling Panels, to direct sound to your audience." },
      { title: "Ceiling Sound Baffles", body: "Ceiling Sound Baffles & Blades, to absorb reverberation." },
      { title: "Diffusers & Ceiling Clouds", body: "Diffusers & Ceiling Clouds to manage background noise." },
    ],
    stepsTitle: "Services",
    steps: [
      { title: "Acoustical Consulting", body: "Our experts provide personalized consultations to assess your space and recommend the best acoustical solutions." },
      { title: "Design and Engineering", body: "We specialize in designing acoustical solutions that blend seamlessly with your interior design while optimizing auditory comfort." },
      { title: "Installation", body: "Our skilled team ensures precise and efficient installation of acoustical panels, ceilings, and other elements." },
      { title: "Maintenance and Repair", body: "We offer ongoing maintenance and repair services to keep your acoustical systems in top condition." },
      { title: "Custom Solutions", body: "From custom-designed acoustical panels to unique soundproofing projects, we cater to your specific requirements." },
    ],
    blocks: [
      { eyebrow: "About", title: "Our Mission", body: ["AMC Acoustical is a leading provider of acoustical solutions, dedicated to enhancing the auditory experience in a variety of spaces. We specialize in acoustical engineering and design, offering a range of services to meet your needs.", "Our mission is to deliver unparalleled acoustical performance through innovative design, superior craftsmanship, and exceptional customer service. We strive to create environments that are not only aesthetically pleasing but also acoustically optimized for comfort and functionality."] },
      { eyebrow: "Sustainability", title: "LEED Accredited", body: ["We are LEED Accredited so our in-house experts can guide your project to successful completion with Green Advantage.", "Please ask us about the availability of FSC ® Certified products."] },
    ],
    site: { label: "Visit amcacoustical.com", href: "https://amcacoustical.com/" },
  },
  {
    slug: "american-surfaces",
    name: "American Surfaces",
    headline: "For first impressions, and lasting impressions.",
    intro: ["Transform your interiors with solid surfaces.", "Custom commercial solid surfaces for office, retail, academic, and other commercial spaces."],
    hero: `${asset}/2e51c.png`,
    heroVideo: "loop02",
    cardsTitle: "Solid surfaces such as Corian",
    cards: [
      { title: "Countertops", img: `${asset}/6b3df.png`, body: "Non-porous, easy to clean, and available in a wide variety of colors and patterns." },
      { title: "Furniture", img: `${asset}/803d7.png`, body: "Custom tables, desks and shelves. Can be shaped and formed into a variety of designs." },
      { title: "Wall Cladding", img: `${asset}/74e34.png`, body: "Seamless, durable, easy to maintain, and shaped to fit any design." },
      { title: "Retail & Hospitality", img: `${asset}/875eb.png`, body: "Hotels and restaurants: countertops, bars and other fixtures." },
    ],
    blocks: [
      { eyebrow: "Why Corian", title: "Versatile, durable, easy to maintain.", body: ["Overall, the versatility, durability, and ease of maintenance of Corian make it a popular choice for a wide range of applications in both residential and commercial settings."] },
      { eyebrow: "Our mission", title: "Integrity from beginning to end.", body: ["We strive to serve our clients with integrity from the beginning to the end of a project, offering industry-leading expertise and creativity to achieve your goals.", "The team at American Surfaces has decades of experience in local and international projects, and we enjoy one another’s camaraderie as we work together to serve you."] },
    ],
    quote: { text: "I love to transform interiors for clients and give them the “wow” experience to show off their property to others. Solid surfaces can achieve that!", name: "Arton Metolli", role: "Founder, American Surfaces" },
    contact: ["846-5 Broad St, Emmaus, PA 18049", "484-597-2430", "design@american-surfaces.com"],
    site: { label: "Visit american-surfaces.com", href: "https://american-surfaces.com/" },
  },
]

export function DivisionPage() {
  const slug = window.location.hash.replace(/^#\/divisions\/?/, "").split(/[?/]/)[0]
  const d = DIVISION_PAGES.find((x) => x.slug === slug) ?? DIVISION_PAGES[0]
  return (
    <div className="bg-white">
      <section className="relative flex min-h-screen items-end overflow-hidden bg-[#1E1E1E] text-white">
        {d.heroVideo ? (
          <LoopVideo name={d.heroVideo} label={d.name} className="absolute inset-0 size-full opacity-70" />
        ) : (
          <img src={d.hero} alt={d.name} className="absolute inset-0 size-full object-cover opacity-70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1750px] px-6 pb-16 md:px-10 md:pb-24">
          <p className="text-caption-m uppercase tracking-[0.16em] text-[#D9B547]">{d.name}</p>
          <h1 className="mt-5 max-w-[1150px] text-[11vw] font-normal uppercase leading-[0.92] tracking-[-0.03em] md:text-[min(6.4vw,112px)]">{d.headline}</h1>
          {d.intro.map((p) => (
            <p key={p} className="mt-5 max-w-[720px] text-body1-s leading-[1.6] text-white/85">{p}</p>
          ))}
          {d.site && (
            <a href={d.site.href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block border-b border-white/60 pb-1 text-caption-s uppercase tracking-[0.12em] hover:border-white">
              {d.site.label}
            </a>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
        <Eyebrow>{d.cardsTitle}</Eyebrow>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {d.cards.map((c) => (
            <article key={c.title} className="border-t border-dashed border-black/30 pt-6">
              {c.img && (
                <div className="mb-5 aspect-[4/5] overflow-hidden bg-neutral-100">
                  <img src={c.img} alt={c.title} className="size-full object-cover" />
                </div>
              )}
              <h3 className="text-h4-m leading-[1.25]">{c.title}</h3>
              <p className="mt-3 text-body2-s leading-[1.6] text-black/60">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      {d.steps && (
        <section className="bg-[#F5F3EE]">
          <div className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
            <Eyebrow>{d.stepsTitle ?? ""}</Eyebrow>
            <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
              {d.steps.map((s, i) => (
                <li key={s.title} className="border-t border-black/20 pt-6">
                  <span className="text-caption-s text-black/50">Step {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-h4-m leading-[1.25]">{s.title}</h3>
                  <p className="mt-3 text-body2-s leading-[1.6] text-black/60">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {d.blocks?.map((b) => (
        <section key={b.title} className="border-t border-dashed border-black/25">
          <div className="mx-auto grid max-w-[1750px] gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
            <div>
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-h3-s leading-[1.1] md:text-h3-m">{b.title}</h2>
            </div>
            <div className="text-body1-s leading-[1.6] text-black/70">
              {b.body.map((p) => <p key={p} className="mb-4">{p}</p>)}
            </div>
          </div>
        </section>
      ))}

      {d.awards && (
        <section className="border-t border-dashed border-black/25">
          <div className="mx-auto max-w-[1750px] px-6 py-24 md:px-10 md:py-32">
            <Eyebrow>Safety</Eyebrow>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {d.awards.map((a) => (
                <article key={a.title}>
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100"><img src={a.img} alt={a.title} className="size-full object-cover" /></div>
                  <h3 className="mt-5 text-h4-m leading-[1.25]">{a.title}</h3>
                  <p className="mt-3 text-body2-s leading-[1.6] text-black/60">{a.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {d.quote && (
        <section className="bg-[#F5F3EE]">
          <figure className="mx-auto max-w-[1100px] px-6 py-24 text-center md:py-32">
            <blockquote className="text-h3-s leading-[1.2] md:text-h3-m">“{d.quote.text}”</blockquote>
            <figcaption className="mt-8 text-caption-m uppercase tracking-[0.14em] text-black/60">{d.quote.name}, {d.quote.role}</figcaption>
          </figure>
        </section>
      )}

      <section className="bg-[#1E1E1E] text-white">
        <div className="mx-auto flex max-w-[1750px] flex-col gap-8 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-32">
          <div>
            <h2 className="max-w-[760px] text-h3-s leading-[1.1] md:text-h3-m">Contact {d.name}</h2>
            {d.contact && <div className="mt-6 space-y-1 text-body1-s text-white/75">{d.contact.map((c) => <p key={c}>{c}</p>)}</div>}
          </div>
          <div className="flex flex-wrap gap-4">
            {d.site && <a href={d.site.href} target="_blank" rel="noopener noreferrer"><OutlineButton dark>{d.site.label}</OutlineButton></a>}
            <a href="#/contact"><OutlineButton dark>Contact us</OutlineButton></a>
          </div>
        </div>
      </section>
    </div>
  )
}

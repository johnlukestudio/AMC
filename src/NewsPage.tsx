import { useEffect, useMemo, useState } from "react"
import { Eyebrow } from "./App"

const asset = "/assets"

type Block = { h?: string; p: string[] }
export type Post = {
  slug: string
  title: string
  date: string
  tag: string
  /** Optional: posts without photography (e.g. awards) render a typographic award plate. */
  img?: string
  award?: { org: string; name: string; year: string }
  excerpt: string
  body: Block[]
}

export const NEWS: Post[] = [
  {
    slug: "awi-award-of-excellence",
    title: "AMC Featured in Design Solutions Magazine as an AWI Award of Excellence Recipient",
    date: "February 24, 2021",
    tag: "Awards",
    img: `${asset}/9765d.png`,
    excerpt:
      "American Millwork & Cabinetry is proud to have been chosen as a recipient of the prestigious AWI “Award of Excellence” for our work on AVE Blue Bell.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry is proud to have been chosen as a recipient of the prestigious Architectural Woodwork Institute “Award of Excellence” for our work on the new luxury apartment complex AVE Blue Bell, and to see the project featured in the latest issue of Design Solutions Magazine.",
          "The award recognizes architectural woodwork that sets the standard for craftsmanship, detailing and installation. For a team that has built everything in-house since 2002, it is a meaningful nod from the industry we care about most.",
        ],
      },
      {
        h: "A 400-plus residence community",
        p: [
          "AVE Blue Bell is a luxury rental community in Montgomery County, Pennsylvania. AMC fabricated and installed the interior millwork for every shared space, from the double-height lobby and fireplace lounge to the co-working suite, fitness center and resident clubroom bar.",
          "Work was delivered on a phased schedule while units remained open for move-ins, which meant tight coordination between our shop, our install crews and the general contractor on site.",
        ],
      },
      {
        h: "What the judges looked at",
        p: [
          "AWI awards are judged on design intent, technical difficulty, quality of materials and the precision of the finished installation. Panels, reveals and transitions are inspected up close, and the work has to hold up to the AWI Architectural Woodwork Standards.",
          "On AVE Blue Bell that meant continuous grain matching across wall paneling, clean scribe lines at every stone and drywall condition, and casework built to stand up to daily resident use.",
        ],
      },
      {
        h: "Made in Emmaus",
        p: [
          "Every piece on the project was engineered, drawn and built in our Emmaus, PA facility. Keeping shop drawings, CNC programming, fabrication and finishing under one roof is what lets us control quality from the first sketch to the last screw.",
        ],
      },
      {
        h: "Thank you",
        p: [
          "We want to thank the owners, the design team and our partners on site, and above all the AMC craftspeople whose work earned this recognition. It's one more reason we keep raising the bar.",
        ],
      },
    ],
  },
  {
    slug: "altitude-marketing-desk-shields",
    title: "American Millwork Partners with Altitude Marketing for COVID-19 Custom Desk Shields",
    date: "June 2, 2020",
    tag: "Manufacturing",
    img: `${asset}/08f78.png`,
    excerpt:
      "AMC partnered with Altitude Marketing to create and install custom desk shields for its Emmaus-based office.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry recently partnered with Altitude Marketing, an integrated marketing agency serving technology-focused B2B companies and manufacturers for more than 15 years, to create and install custom desk shields for its Emmaus-based office.",
        ],
      },
      {
        h: "Designed around the workspace",
        p: [
          "Rather than off-the-shelf panels, each shield was measured and fabricated to fit Altitude's existing desks, keeping sightlines open while giving every team member a protected workstation.",
          "The shields were built in our Emmaus shop and installed by our own crew with minimal disruption to the office.",
        ],
      },
    ],
  },
  {
    slug: "safety-awards",
    title: "Safety Awards",
    date: "May 27, 2020",
    tag: "Awards",
    award: { org: "ABC", name: "STEP Safety Award · Diamond Level", year: "2020" },
    excerpt:
      "AMC is privileged to have been recognized for our hard work and efforts by receiving three safety awards.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry is privileged to have been recognized for our hard work and efforts by receiving three safety awards: one for the last quarter of 2019 and two for the first quarter of 2020.",
          "The first award, the “Step Award,” marks attaining the highest achievement, the “Diamond Level.”",
        ],
      },
      {
        h: "Safety is a daily habit",
        p: [
          "From the shop floor to every job site, our crews follow strict procedures so that everyone goes home safe at the end of the day. These awards belong to every member of the AMC team.",
        ],
      },
    ],
  },
  {
    slug: "covid-19-custom-partitions",
    title: "American Millwork Creates COVID-19 Custom Partitions for Local Businesses",
    date: "May 12, 2020",
    tag: "Manufacturing",
    img: `${asset}/cf31d.png`,
    excerpt:
      "AMC is proud to use our diverse talents to help local businesses in the somewhat difficult times of COVID-19.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry is proud to use our diverse talents to help local businesses in the somewhat difficult times of COVID-19. To conform to CDC guidelines for customer safety, partitions are suggested where social distancing is not practical.",
          "Trina Burkhart, owner of “Parlor Hair & Makeup Studio” located in Nazareth, PA, approached American Millwork to build custom partitions between her stations.",
        ],
      },
      {
        h: "Built to fit, built fast",
        p: [
          "Our engineering team turned around drawings within days, and the shop fabricated partitions that match the studio's finishes, so the space stays welcoming while keeping clients and staff safe.",
        ],
      },
    ],
  },
  {
    slug: "amc-covid-19-crusher",
    title: "AMC COVID-19 Crusher",
    date: "April 21, 2020",
    tag: "Manufacturing",
    img: `${asset}/f4bae.png`,
    excerpt:
      "AMC is doing our part to promote coronavirus safety with the AMC COVID-19 Crusher.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry is doing our part to promote coronavirus safety with the AMC COVID-19 CRUSHER. Our new shop-built machine is utilized to disinfect our plant equipment on a daily basis.",
          "Spraying a chlorine bleach and water solution mixed as per CDC recommendations, it uses a battery-operated compressor and pressure pot to reach every corner of the shop.",
        ],
      },
    ],
  },
  {
    slug: "pa-construction-may-resume",
    title: "Construction Activities May Resume in Pennsylvania on May 1",
    date: "April 20, 2020",
    tag: "Industry",
    img: `${asset}/185d7.png`,
    excerpt: "Read the full article at PAPublicContracts.com on construction activities resuming in Pennsylvania.",
    body: [
      {
        p: [
          "Pennsylvania announced that construction activities may resume statewide on May 1, under updated guidance for job site safety.",
          "AMC is ready to return to active job sites across PA, NY and NJ with protocols in place for our install crews. Read the full article at PAPublicContracts.com.",
        ],
      },
    ],
  },
  {
    slug: "north-shore-animal-league",
    title: "North Shore Animal League: Bianca's Furry Friends Grand Opening",
    date: "December 2, 2019",
    tag: "Projects",
    img: `${asset}/40490.png`,
    excerpt:
      "With the likes of Howard Stern, Billy Joel and Rachael Ray on hand, North Shore Animal League opened its new Rescue and Adoption facility.",
    body: [
      {
        p: [
          "Opening with the likes of Howard Stern, Billy Joel and Rachael Ray on hand, the North Shore Animal League will be a safe haven and second chance with Bianca's Furry Friends, its new state-of-the-art Rescue and Adoption facility.",
          "AMC is proud to have provided millwork for the project, helping create a bright, durable environment for animals, staff and visitors alike.",
        ],
      },
    ],
  },
  {
    slug: "amc-asi-christmas-party",
    title: "AMC/ASI Christmas Party",
    date: "November 20, 2019",
    tag: "Company",
    img: `${asset}/62abe.png`,
    excerpt:
      "We are all looking forward to Thanksgiving, and Christmas is right around the corner, so we've started to plan the party.",
    body: [
      {
        p: [
          "We are all looking forward to Thanksgiving, and Christmas is right around the corner, so we have started to plan the AMC/ASI Christmas Party for December 14th.",
          "It's our favorite chance of the year to thank the whole team and their families for everything they build with us.",
        ],
      },
    ],
  },
  {
    slug: "second-harvest-lehigh-valley",
    title: "AMC and Whiting-Turner Contracting Co. Donate to Second Harvest of Lehigh Valley",
    date: "October 8, 2019",
    tag: "Community",
    img: `${asset}/197f8.png`,
    excerpt:
      "AMC partnered with Whiting-Turner Contracting Co. to supply Second Harvest of Lehigh Valley with needed materials.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry is proud to have partnered with Whiting-Turner Contracting Co. to supply the charitable organization Second Harvest of Lehigh Valley with needed materials.",
          "Supporting the communities where we live and work is part of who we are, and we're grateful to every volunteer who showed up.",
        ],
      },
    ],
  },
  {
    slug: "awi-self-labeling",
    title: "American Millwork & Cabinetry's AWI Status Changed to “Self-Labeling”",
    date: "August 14, 2019",
    tag: "Industry",
    award: { org: "AWI", name: "Quality Certification Program · Self-Labeling", year: "2019" },
    excerpt:
      "With our continued strict adhesion to AWI Standards and Provisional Project Requirements, our AWI status has been changed to “Self-Labeling.”",
    body: [
      {
        p: [
          "American Millwork & Cabinetry is proud to announce that with our continued strict adhesion to AWI Standards and Provisional Project Requirements, our AWI status has been changed to “Self-Labeling.”",
          "Self-labeling status means AMC can certify that our work meets AWI Quality Certification Program standards, a mark of trust for architects, owners and general contractors.",
        ],
      },
    ],
  },
]

const FILTERS = ["All", ...Array.from(new Set(NEWS.map((n) => n.tag)))]

const shortDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

/* Flat typographic stand-in for posts without photography (awards, certifications). */
function AwardPlate({ post, large = false }: { post: Post; large?: boolean }) {
  const a = post.award ?? { org: "AMC", name: post.tag, year: new Date(post.date).getFullYear().toString() }
  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-dark-100 px-5 text-dark-950 transition-colors duration-500 group-hover:bg-green-100 md:px-10">
      <span className="text-caption-s uppercase tracking-[0.18em] text-gold-600">Award</span>
      <span className={`mt-3 leading-[0.9] tracking-[-0.04em] ${large ? "text-h1-s md:text-h1-m xl:text-h1-l" : "text-h1-s"}`}>
        {a.org}
      </span>
      <span className={`mt-3 max-w-[80%] ${large ? "text-body1-s md:text-body1-m" : "text-body2-s"}`}>
        {a.name} · {a.year}
      </span>
    </div>
  )
}

/* Image card with overlaid tag, date and title */
export function NewsCard({ post, className = "aspect-[4/5]" }: { post: Post; className?: string }) {
  if (!post.img)
    return (
      <a href={`#/news/${post.slug}`} className={`group relative block overflow-hidden bg-dark-100 ${className}`}>
        <AwardPlate post={post} />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-caption-s text-dark-950">
          <span>• {post.tag}</span>
          <time>{shortDate(post.date)}</time>
        </div>
        <h3 className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 border-t border-dark-950/15 p-5 text-h4-m leading-[1.25] text-dark-950 xl:text-h4-l">
          <span className="max-w-[90%]">{post.title}</span>
          <span className="text-h4-s transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
        </h3>
      </a>
    )
  return (
    <a href={`#/news/${post.slug}`} className={`group relative block overflow-hidden bg-black ${className}`}>
      <img
        src={post.img}
        alt=""
        className="absolute inset-0 size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-caption-s text-white">
        <span>• {post.tag}</span>
        <time>{shortDate(post.date)}</time>
      </div>
      <h3 className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-h4-m xl:text-h4-l leading-[1.25] text-white ">
        <span className="max-w-[90%]">{post.title}</span>
        <span className="text-h4-s transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          ↗
        </span>
      </h3>
    </a>
  )
}

export function NewsPage() {
  const [filter, setFilter] = useState("All")
  const [q, setQ] = useState("")
  const [featured, ...rest] = NEWS
  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return (filter === "All" && !term ? rest : NEWS).filter(
      (n) =>
        (filter === "All" || n.tag === filter) &&
        (!term || `${n.title} ${n.excerpt}`.toLowerCase().includes(term)),
    )
  }, [filter, q, rest])

  return (
    <section className="mx-auto max-w-[1750px] px-6 pt-32 pb-24 md:px-10 md:pt-[140px] md:pb-32">
      <Eyebrow>news</Eyebrow>
      <div className="mt-6 flex flex-col gap-8 border-b border-black/10 pb-10 md:flex-row md:items-end md:justify-between">
        <h1 className="max-w-[900px] text-h2-s md:text-h2-m xl:text-h2-l leading-[1.05] tracking-[-0.02em] text-dark-950 ">
          News from
          <br />
          the shop floor.
        </h1>
        <p className="max-w-[360px] text-body1-s leading-[1.6] text-black/60 md:text-right">
          Awards, projects and updates from American Millwork &amp; Cabinetry and our team in Emmaus, PA.
        </p>
      </div>

      <div className="mt-10">
        <NewsCard post={featured} className="aspect-[4/5] md:aspect-[21/9]" />
      </div>

      {/* Search + filters */}
      <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <label className="flex w-full items-center gap-3 border-b border-black/50 px-1 py-3 md:max-w-[360px]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-black/50">
            <circle cx="6" cy="6" r="4.75" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search news"
            className="w-full bg-transparent text-body2-s outline-none placeholder:text-black/30"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-[8px] text-caption-s uppercase tracking-wide transition-colors duration-300 ${
                filter === f
                  ? "border-black bg-black text-white"
                  : "border-black/20 text-black/70 hover:border-black hover:text-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {list.length ? (
        <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <NewsCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="mt-8 border-t border-black/10 pt-8 text-body2-s text-black/50">
          No stories match your search. Try another term or category.
        </p>
      )}
    </section>
  )
}

export function ArticlePage() {
  const getSlug = () => window.location.hash.replace(/^#\/news\/?/, "")
  const [slug, setSlug] = useState(getSlug)
  useEffect(() => {
    const on = () => setSlug(getSlug())
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  const post = NEWS.find((n) => n.slug === slug) ?? NEWS[0]
  const words = post.body.flatMap((b) => b.p).join(" ").split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  const recent = NEWS.filter((n) => n.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="mx-auto max-w-[1750px] px-6 pt-32 md:px-10 md:pt-[140px]">
        <a href="#/news" className="text-body2-s text-black/50 transition-colors hover:text-black">
          ← All news
        </a>
        <p className="mt-10 text-body2-s">• {post.tag}</p>
        <h1 className="mt-4 max-w-[1100px] text-h2-s md:text-h2-m xl:text-h2-l leading-[1.08] tracking-[-0.02em] text-dark-950 ">
          {post.title}
        </h1>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-black/10 pt-5 text-body2-s sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center bg-black text-caption-s tracking-wide text-white">
              AMC
            </span>
            <div>
              <dt className="text-black/50">Written by</dt>
              <dd>American Millwork &amp; Cabinetry</dd>
            </div>
          </div>
          <div>
            <dt className="text-black/50">Published</dt>
            <dd>{post.date}</dd>
          </div>
          <div className="sm:text-right">
            <dt className="text-black/50">Read time</dt>
            <dd>{minutes} min read</dd>
          </div>
        </dl>

        <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]">
          {post.img ? (
            <img src={post.img} alt={post.title} className="size-full object-cover" />
          ) : (
            <AwardPlate post={post} large />
          )}
        </div>

        <div className="mx-auto max-w-[720px] py-20 md:py-28">
          {post.body.map((b, i) => (
            <div key={i} className={i ? "mt-14" : ""}>
              {b.h && <h2 className="mb-6 text-h3-s md:text-h3-m xl:text-h3-l leading-[1.2] tracking-[-0.01em] ">{b.h}</h2>}
              {b.p.map((t, j) => (
                <p
                  key={j}
                  className={`text-h4-s leading-[1.75] text-black/70  ${j ? "mt-5" : ""} ${
                    i === 0 && j === 0 ? "text-h4-m xl:text-h4-l text-black  md:leading-[1.6]" : ""
                  }`}
                >
                  {t}
                </p>
              ))}
            </div>
          ))}
          {post.slug === "awi-award-of-excellence" && (
            <a
              href="#/portfolio/project/ave-blue-bell"
              className="mt-14 flex items-center justify-between border-y border-black/10 py-6 text-body1-s transition-colors hover:text-black/60"
            >
              <span>
                <span className="block text-caption-s uppercase tracking-wide text-black/50">View the project</span>
                AVE Blue Bell, Blue Bell PA
              </span>
              <span className="text-h4-s">↗</span>
            </a>
          )}
        </div>
      </article>

      <section className="mx-auto max-w-[1750px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="flex flex-col gap-6 border-t border-black/10 pt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>keep reading</Eyebrow>
            <h2 className="mt-6 text-h3-s md:text-h3-m xl:text-h3-l leading-[1.1] ">Recent news</h2>
          </div>
          <a href="#/news" className="text-body2-s text-black/60 transition-colors hover:text-black">
            All news →
          </a>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((p) => (
            <NewsCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  )
}

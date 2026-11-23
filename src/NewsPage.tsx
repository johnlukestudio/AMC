import { useMemo, useState } from "react"
import { Eyebrow } from "./App"
import { PortfolioImage } from "./PortfolioImage"
import type { PortfolioPhotoId } from "./portfolio-photos"
import { CARD_SIZES_3, HERO_SIZES } from "./photos"
import { getPathname, registerNewsSlugs, resolveRoute } from "./routes"
import { ALTITUDE_PHOTOS } from "./altitude-photos"
import { SeminarCarousel } from "./SeminarCarousel"
import type { SeminarPhoto } from "./seminar-photos"

const asset = "/media"

type PullQuote = { text: string; name: string; title: string; company: string }
type Block = { h?: string; p: string[]; quote?: PullQuote; about?: boolean }
export type Post = {
  slug: string
  title: string
  date: string
  tag: string
  /** Optional: posts without photography (e.g. awards) render a typographic award plate. */
  img?: string
  srcSet?: string
  webpSrcSet?: string
  width?: number
  height?: number
  /** Focal point for object-cover crops, especially portrait news cards. */
  objectPosition?: string
  /** Stills render in the shared carousel instead of a full-bleed hero. */
  carousel?: boolean
  photos?: SeminarPhoto[]
  photoBase?: string
  carouselLabel?: string
  carouselMax?: number
  photo?: PortfolioPhotoId
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
    img: `${asset}/portfolio/ave-blue-bell-3840.jpg`,
    photo: "ave-blue-bell",
    excerpt:
      "American Millwork & Cabinetry is proud to have been chosen as a recipient of the prestigious AWI “Award of Excellence” for our work on AVE Blue Bell.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry is proud to have been chosen as a recipient of the prestigious Architectural Woodwork Institute “Award of Excellence” for our work on the new luxury apartment complex AVE Blue Bell, and to see the project featured in the latest issue of Design Solutions Magazine.",
          "The award recognizes architectural woodwork that sets the standard for craftsmanship, detailing and installation. For a team that has built everything in-house since 2003, it is a meaningful nod from the industry we care about most.",
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
        h: "Made in the Lehigh Valley",
        p: [
          "Every piece on the project was engineered, drawn and built in our Lehigh Valley, PA facility. Keeping shop drawings, CNC programming, fabrication and finishing under one roof is what lets us control quality from the first sketch to the last screw.",
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
  /*
    Omitted from the draft press release:
    - Internal status notes, suggested uses, and the note not to send the draft.
    - [TO CONFIRM: names of the instructors or speakers.]
    - [TO CONFIRM: whether a formal plant tour was on the published agenda.]
    - [TO CONFIRM: that this chapter role is current and should be stated in the release.]
    - [TO CONFIRM: current facility square footage. The company's About page states both 75,000 and 65,000 square feet in different sections.]
    - The sources list and the Related event section about the May 8, 2026 chapter meeting.
    Attendance was confirmed at about 70 people and is included.
    George's quote is included without the bracket tag.
  */
  {
    slug: "awi-project-management-seminar",
    title: "American Millwork & Cabinetry Hosts AWI Project Management Seminar in Emmaus",
    date: "November 23, 2026",
    tag: "Company",
    carousel: true,
    img: `${asset}/news/awi-seminar/017-836.jpg`,
    srcSet: `${asset}/news/awi-seminar/017-480.jpg 480w, ${asset}/news/awi-seminar/017-836.jpg 836w`,
    webpSrcSet: `${asset}/news/awi-seminar/017-480.webp 480w, ${asset}/news/awi-seminar/017-836.webp 836w`,
    width: 836,
    height: 627,
    excerpt:
      "About 70 people attended the two-day AWI seminar, Tame the Chaos: Mastering Project Management, at the Emmaus plant on Oct. 1 and 2, 2026.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry hosted a two-day Architectural Woodwork Institute education seminar at its plant at 840 Broad Street in Emmaus on Oct. 1 and 2, 2026.",
          "AWI and its Central PA and New Jersey chapters presented the Project Management Education Outreach Seminar, titled \"Tame the Chaos: Mastering Project Management.\" Sessions ran from 8 a.m. to 5:30 p.m. on Thursday, Oct. 1, and from 7:30 a.m. to 2 p.m. on Friday, Oct. 2.",
        ],
      },
      {
        p: [
          "The program covered planning, scheduling, shop drawings, costing, production, delivery, cash flow, and communication. AWI described the gathering, while it was underway, as bringing \"over 700 years of project management experience in one room.\" The institute thanked American Millwork & Cabinetry for hosting.",
          "Photos from the two days show classroom sessions in the shop, vendor tables, meals, and groups walking the production floor. About 70 people attended.",
        ],
      },
      {
        p: [],
        quote: {
          text: "One of the things I enjoy most about AWI is the opportunity to bring people together to learn from one another, laugh together, build relationships, and simply enjoy the moment. Every time we get together, I walk away having learned something new.",
          name: "George Reitz",
          title: "CEO and president",
          company: "American Millwork & Cabinetry",
        },
      },
      {
        p: [
          "American Millwork & Cabinetry is an AWI member firm. Reitz is listed by AWI as the contact for the New Jersey chapter.",
        ],
      },
      { p: [], about: true },
    ],
  },
  {
    slug: "ember-berwyn-design-solutions-cover",
    title: "Ember @ Berwyn on the Cover of AWI Design Solutions",
    date: "Spring 2024",
    tag: "Recognition",
    img: `${asset}/about/timeline/ds-cover-2024-460.jpg`,
    srcSet: `${asset}/about/timeline/ds-cover-2024-460.jpg 460w`,
    webpSrcSet: `${asset}/about/timeline/ds-cover-2024-460.webp 460w`,
    width: 460,
    height: 606,
    excerpt:
      "AMC's Ember @ Berwyn project is on the cover of AWI Design Solutions magazine, Spring 2024.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry's Ember @ Berwyn project is on the cover of Design Solutions, the Architectural Woodwork Institute magazine, Spring 2024.",
          "The cover is a feature in the magazine. It is not an AWI Award of Excellence.",
        ],
      },
    ],
  },
  {
    slug: "altitude-marketing-desk-shields",
    title: "American Millwork Partners with Altitude Marketing for COVID-19 Custom Desk Shields",
    date: "June 2, 2020",
    tag: "Manufacturing",
    carousel: true,
    photos: ALTITUDE_PHOTOS,
    photoBase: `${asset}/news/altitude-office`,
    carouselLabel: "Photographs of the Altitude Marketing office, millwork by American Millwork and Cabinetry.",
    carouselMax: 1200,
    img: `${asset}/news/altitude-office/cafe-2560.jpg`,
    srcSet: `${asset}/news/altitude-office/cafe-640.jpg 640w, ${asset}/news/altitude-office/cafe-1280.jpg 1280w, ${asset}/news/altitude-office/cafe-1920.jpg 1920w, ${asset}/news/altitude-office/cafe-2560.jpg 2560w`,
    webpSrcSet: `${asset}/news/altitude-office/cafe-640.webp 640w, ${asset}/news/altitude-office/cafe-1280.webp 1280w, ${asset}/news/altitude-office/cafe-1920.webp 1920w, ${asset}/news/altitude-office/cafe-2560.webp 2560w`,
    width: 2560,
    height: 1707,
    excerpt:
      "AMC partnered with Altitude Marketing to create and install custom desk shields for its Lehigh Valley, PA office.",
    body: [
      {
        p: [
          "American Millwork & Cabinetry recently partnered with Altitude Marketing, an integrated marketing agency serving technology-focused B2B companies and manufacturers for more than 15 years, to create and install custom desk shields for its Lehigh Valley, PA office.",
        ],
      },
      {
        h: "Designed around the workspace",
        p: [
          "Rather than off-the-shelf panels, each shield was measured and fabricated to fit Altitude's existing desks, keeping sightlines open while giving every team member a protected workstation.",
          "The shields were built in our Lehigh Valley shop and installed by our own crew with minimal disruption to the office.",
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
    img: `${asset}/news/covid-partitions-1374.jpg`,
    srcSet: `${asset}/news/covid-partitions-640.jpg 640w, ${asset}/news/covid-partitions-1280.jpg 1280w, ${asset}/news/covid-partitions-1374.jpg 1374w`,
    webpSrcSet: `${asset}/news/covid-partitions-640.webp 640w, ${asset}/news/covid-partitions-1280.webp 1280w, ${asset}/news/covid-partitions-1374.webp 1374w`,
    width: 1374,
    height: 916,
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
    img: `${asset}/news/covid-crusher-385.jpg`,
    srcSet: `${asset}/news/covid-crusher-385.jpg 385w`,
    webpSrcSet: `${asset}/news/covid-crusher-385.webp 385w`,
    width: 385,
    height: 255,
    objectPosition: "center",
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
    slug: "north-shore-animal-league",
    title: "North Shore Animal League: Bianca's Furry Friends Grand Opening",
    date: "December 2, 2019",
    tag: "Projects",
    img: `${asset}/news/north-shore-585.jpg`,
    srcSet: `${asset}/news/north-shore-585.jpg 585w`,
    webpSrcSet: `${asset}/news/north-shore-585.webp 585w`,
    width: 585,
    height: 438,
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
    img: `${asset}/news/christmas-1600.jpg`,
    srcSet: `${asset}/news/christmas-640.jpg 640w, ${asset}/news/christmas-1280.jpg 1280w, ${asset}/news/christmas-1600.jpg 1600w`,
    webpSrcSet: `${asset}/news/christmas-640.webp 640w, ${asset}/news/christmas-1280.webp 1280w, ${asset}/news/christmas-1600.webp 1600w`,
    width: 1600,
    height: 1067,
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
    img: `${asset}/news/second-harvest-984.jpg`,
    srcSet: `${asset}/news/second-harvest-640.jpg 640w, ${asset}/news/second-harvest-984.jpg 984w`,
    webpSrcSet: `${asset}/news/second-harvest-640.webp 640w, ${asset}/news/second-harvest-984.webp 984w`,
    width: 984,
    height: 550,
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

registerNewsSlugs(NEWS.map((n) => n.slug))

const FILTERS = ["All", ...Array.from(new Set(NEWS.map((n) => n.tag)))]

const shortDate = (d: string) => {
  const parsed = new Date(d)
  if (Number.isNaN(parsed.getTime())) return d
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function PostImage({
  post,
  alt,
  className,
  pictureClassName = "",
  sizes,
  loading = "lazy",
}: {
  post: Post
  alt: string
  className: string
  pictureClassName?: string
  sizes?: string
  loading?: "eager" | "lazy"
}) {
  if (!post.img) return null
  const img = (
    <img
      src={post.img}
      srcSet={post.srcSet}
      sizes={post.srcSet ? sizes : undefined}
      width={post.width}
      height={post.height}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      style={post.objectPosition ? { objectPosition: post.objectPosition } : undefined}
    />
  )
  if (!post.webpSrcSet) return img
  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={post.webpSrcSet} sizes={sizes} />
      {img}
    </picture>
  )
}

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
export function NewsCard({ post, className = "aspect-[4/5]", sizes = CARD_SIZES_3 }: { post: Post; className?: string; sizes?: string }) {
  if (!post.img)
    return (
      <a href={`/news/${post.slug}/`} className={`group relative block overflow-hidden bg-dark-100 ${className}`}>
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
    <a href={`/news/${post.slug}/`} className={`group relative block overflow-hidden bg-black ${className}`}>
      {post.photo ? (
        <PortfolioImage
          id={post.photo}
          alt={post.title}
          sizes={sizes}
          pictureClassName="absolute inset-0 block size-full"
          className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <PostImage
          post={post}
          alt={post.title}
          sizes={sizes}
          pictureClassName="absolute inset-0 block size-full"
          className="absolute inset-0 size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      )}
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
          the Shop Floor
        </h1>
        <p className="max-w-[360px] text-body1-s leading-[1.6] text-black/60 md:text-right">
          Awards, projects and updates from American Millwork &amp; Cabinetry and our team in the Lehigh Valley, PA.
        </p>
      </div>

      <div className="mt-10">
        <NewsCard post={featured} className="aspect-[4/5] md:aspect-[21/9]" sizes={HERO_SIZES} />
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

function PullQuoteBlock({ quote }: { quote: PullQuote }) {
  return (
    <figure className="mt-16 border-l-2 border-gold-600 py-1 pl-6 md:mt-20 md:pl-10">
      <span aria-hidden="true" className="block text-h2-s leading-none text-gold-600 md:text-h2-m">
        “
      </span>
      <blockquote className="mt-3 max-w-[36ch] text-h3-s leading-[1.3] tracking-[-0.02em] text-dark-950 md:text-h3-m">
        {quote.text}
      </blockquote>
      <figcaption className="mt-8">
        <span className="block text-caption-s uppercase tracking-[0.16em]">{quote.name}</span>
        <span className="mt-1 block text-caption-s uppercase tracking-[0.14em] text-black/50">{quote.title}</span>
        <span className="mt-1 block text-caption-s uppercase tracking-[0.14em] text-black/50">{quote.company}</span>
      </figcaption>
    </figure>
  )
}

function AboutAmc() {
  return (
    <section className="mt-20 border-t border-black/15 pt-8">
      <img src="/media/73d6c.svg" alt="" className="h-8 w-auto" />
      <p className="mt-5 text-caption-s uppercase tracking-[0.18em] text-black/50">About AMC</p>
      <p className="mt-5 max-w-[68ch] text-body1-s leading-[1.65] text-black/80 md:text-body1-m">
        American Millwork &amp; Cabinetry manufactures and installs custom millwork and cabinetry in the Lehigh Valley,
        about five miles south of Allentown. Its work includes custom millwork, solid wood and veneer cabinets,
        countertops, and architectural millwork.
      </p>
      <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
        <div>
          <dt className="text-caption-s uppercase tracking-[0.16em] text-black/50">Founded</dt>
          <dd className="mt-1 text-body2-s">2002</dd>
        </div>
        <div>
          <dt className="text-caption-s uppercase tracking-[0.16em] text-black/50">Location</dt>
          <dd className="mt-1 text-body2-s">Emmaus, PA (Lehigh Valley)</dd>
        </div>
        <div>
          <dt className="text-caption-s uppercase tracking-[0.16em] text-black/50">Certification</dt>
          <dd className="mt-1 text-body2-s">AWI QCP (AMC and AmeriCase)</dd>
        </div>
        <div>
          <dt className="text-caption-s uppercase tracking-[0.16em] text-black/50">Address</dt>
          <dd className="mt-1 text-body2-s">840 Broad St, Emmaus, PA 18049</dd>
        </div>
        <div>
          <dt className="text-caption-s uppercase tracking-[0.16em] text-black/50">Phone</dt>
          <dd className="mt-1 text-body2-s">
            <a href="tel:+16109650040" className="underline decoration-black/25 underline-offset-4 hover:decoration-black">
              (610) 965-0040
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-caption-s uppercase tracking-[0.16em] text-black/50">Web</dt>
          <dd className="mt-1 text-body2-s">
            <a
              href="https://www.amcmillwork.com"
              className="underline decoration-black/25 underline-offset-4 hover:decoration-black"
            >
              amcmillwork.com
            </a>
          </dd>
        </div>
      </dl>
    </section>
  )
}

export function ArticlePage() {
  const slug = resolveRoute(getPathname()).slug
  const post = NEWS.find((n) => n.slug === slug) ?? NEWS[0]
  const words = post.body
    .flatMap((b) => [...b.p, b.quote?.text ?? ""])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  const recent = NEWS.filter((n) => n.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="mx-auto max-w-[1750px] px-6 pt-32 md:px-10 md:pt-[140px]">
        <a href="/news/" className="text-body2-s text-black/50 transition-colors hover:text-black">
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

        {post.carousel ? (
          <div className="mt-10">
            <SeminarCarousel
              photos={post.photos}
              base={post.photoBase}
              label={post.carouselLabel}
              maxWidth={post.carouselMax}
            />
          </div>
        ) : (
          <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]">
            {post.img ? (
              post.photo ? (
                <PortfolioImage
                  id={post.photo}
                  alt={post.title}
                  sizes={HERO_SIZES}
                  pictureClassName="block size-full"
                  className="size-full object-cover"
                />
              ) : (
                <PostImage
                  post={post}
                  alt={post.title}
                  sizes={HERO_SIZES}
                  pictureClassName="block size-full"
                  className="size-full object-cover"
                  loading="eager"
                />
              )
            ) : (
              <AwardPlate post={post} large />
            )}
          </div>
        )}

        <div className="mx-auto max-w-[720px] py-20 md:py-28">
          {post.body.map((b, i) => {
            if (b.about || b.h === "About the company") return <AboutAmc key={i} />
            if (b.quote) return <PullQuoteBlock key={i} quote={b.quote} />
            return (
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
            )
          })}
          {post.slug === "awi-award-of-excellence" && (
            <a
              href="/portfolio/project/ave-blue-bell/"
              className="mt-14 flex items-center justify-between border-y border-black/10 py-6 text-body1-s transition-colors hover:text-black/60"
            >
              <span>
                <span className="block text-caption-s uppercase tracking-wide text-black/50">View the project</span>
                AVE Blue Bell, Blue Bell PA
              </span>
              <span className="text-h4-s">↗</span>
            </a>
          )}
          {post.slug === "ember-berwyn-design-solutions-cover" && (
            <a
              href="https://www.nxtbook.com/nxtbooks/awi/designsolutions_2024spring/index.php?startid=11#/p/Intro"
              target="_blank"
              rel="noreferrer"
              className="mt-14 flex items-center justify-between border-y border-black/10 py-6 text-body1-s transition-colors hover:text-black/60"
            >
              <span>
                <span className="block text-caption-s uppercase tracking-wide text-black/50">Read the issue</span>
                AWI Design Solutions, Spring 2024
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
          <a href="/news/" className="text-body2-s text-black/60 transition-colors hover:text-black">
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

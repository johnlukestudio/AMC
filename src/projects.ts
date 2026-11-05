/** Portfolio projects. `image` is the featured photo: portfolio card, hover thumbnail, and project hero. */

export type ProjectImage = { src: string; alt: string; ratio?: string }

export type PortfolioCategory = "millwork" | "casework" | "acoustics"

export type Project = {
  slug: string
  name: string
  year: string
  place?: string
  type?: string
  /** Portfolio filters. A project can appear in more than one. */
  categories: PortfolioCategory[]
  image: string
  alt: string
  summary?: string
  details?: { label: string; value: string }[]
  gallery: ProjectImage[]
  cls: string
  ratio: string
}

export const PROJECTS: Project[] = [
  {
    slug: "cheston-elementary-school",
    name: "Cheston Elementary School",
    year: "2026",
    categories: ["millwork", "casework"],
    image: "30adf.png",
    alt: "Cheston Elementary School",
    gallery: [{ src: "803d7.png", alt: "Cheston Elementary School interior" }],
    cls: "md:col-span-6",
    ratio: "aspect-[610/650]",
  },
  {
    slug: "ave-blue-bell",
    name: "AVE Blue Bell",
    year: "2026",
    place: "Blue Bell, Pennsylvania",
    type: "Multifamily Residential",
    categories: ["millwork", "casework"],
    image: "9765d.png",
    alt: "AVE Blue Bell exterior",
    summary:
      "A 400-plus residence luxury rental community in Montgomery County, where AMC fabricated and installed the interior millwork for every shared space, from the double-height lobby and fireplace lounge to the co-working suite, fitness center and resident clubroom bar. Built in our Emmaus shop, delivered on a phased schedule while units stayed open for move-ins.",
    details: [
      { label: "Duration", value: "18 Months" },
      { label: "Location", value: "Blue Bell, PA" },
      {
        label: "Scope of work",
        value: "Architectural Millwork, Casework, Cabinetry",
      },
    ],
    gallery: [
      {
        src: "825ea.png",
        alt: "AVE Blue Bell lobby lounge",
        ratio: "aspect-square",
      },
      {
        src: "e52e8.png",
        alt: "AVE Blue Bell lounge and dining area",
        ratio: "aspect-[4/5]",
      },
      {
        src: "4e931.png",
        alt: "AVE Blue Bell dining room",
        ratio: "aspect-[4/5]",
      },
      {
        src: "10b28.png",
        alt: "AVE Blue Bell clubroom",
        ratio: "aspect-[4/5]",
      },
    ],
    cls: "md:col-span-5 md:col-start-8 md:mt-[18vw]",
    ratio: "aspect-[610/433]",
  },
  {
    slug: "mattison-estates",
    name: "Mattison Estates",
    year: "2026",
    categories: ["millwork"],
    image: "6896d.png",
    alt: "Mattison Estates lounge",
    gallery: [{ src: "d7b6e.png", alt: "Mattison Estates library" }],
    cls: "md:col-span-6",
    ratio: "aspect-[610/433]",
  },
  {
    slug: "kalahari-resort",
    name: "Kalahari Resort",
    year: "2025",
    categories: ["millwork"],
    image: "940fb.png",
    alt: "Kalahari Resort entrance",
    gallery: [{ src: "4440b.png", alt: "Kalahari Resort interior" }],
    cls: "md:col-span-6 md:col-start-7 md:mt-[8vw]",
    ratio: "aspect-[610/433]",
  },
  {
    slug: "milford-village",
    name: "Milford Village",
    year: "2022",
    categories: ["casework"],
    image: "0688e.png",
    alt: "Milford Village",
    gallery: [{ src: "6b3df.png", alt: "Milford Village residences" }],
    cls: "md:col-span-6 md:col-start-4",
    ratio: "aspect-[690/488]",
  },
  {
    slug: "waugh-chapel-monarch-clubhouse",
    name: "Waugh Chapel Monarch Clubhouse",
    year: "2023",
    categories: ["millwork"],
    image: "b6a68.png",
    alt: "Waugh Chapel Monarch Clubhouse",
    gallery: [
      { src: "1735b.png", alt: "Waugh Chapel Monarch Clubhouse atrium" },
    ],
    cls: "md:col-span-6",
    ratio: "aspect-[650/487]",
  },
  {
    slug: "washington-crossing",
    name: "Washington Crossing",
    year: "2025",
    categories: ["millwork"],
    image: "96354.png",
    alt: "Washington Crossing hall",
    gallery: [
      { src: "cf03d.png", alt: "Washington Crossing wood wall" },
      { src: "e5b5d.png", alt: "Washington Crossing interior" },
      { src: "f291a.png", alt: "Washington Crossing reception desk" },
    ],
    cls: "md:col-span-6 md:col-start-7 md:mt-[5vw]",
    ratio: "aspect-[650/460]",
  },
]

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}

export function projectsInCategory(slug: string): Project[] {
  if (slug === "all" || slug === "") return PROJECTS
  return PROJECTS.filter((project) =>
    project.categories.includes(slug as PortfolioCategory),
  )
}

export function projectPathnames(): string[] {
  return PROJECTS.map((project) => `/portfolio/project/${project.slug}`)
}

export function media(file: string): string {
  return `/media/${file}`
}

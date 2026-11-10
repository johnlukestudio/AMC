import { PortfolioImage } from "./PortfolioImage"
import {
  PORTFOLIO_GALLERY_FULL_SIZES,
  PORTFOLIO_GALLERY_HALF_SIZES,
  PORTFOLIO_HERO_SIZES,
} from "./photos"
import { projectBySlug, PROJECTS, type ProjectImage } from "./projects"

function GalleryPhoto({
  item,
  className,
  sizes,
}: {
  item: ProjectImage
  className: string
  sizes: string
}) {
  return (
    <PortfolioImage
      id={item.src}
      alt={item.alt}
      sizes={sizes}
      className={className}
    />
  )
}

function Gallery({ items }: { items: ProjectImage[] }) {
  if (items.length === 4 && items.every((item) => item.ratio)) {
    return (
      <div className="mt-20 grid gap-2.5 md:mt-28 md:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <GalleryPhoto
            item={items[0]}
            sizes={PORTFOLIO_GALLERY_HALF_SIZES}
            className={`${items[0].ratio} w-full object-cover`}
          />
          <GalleryPhoto
            item={items[2]}
            sizes={PORTFOLIO_GALLERY_HALF_SIZES}
            className={`${items[2].ratio} w-full object-cover`}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <GalleryPhoto
            item={items[1]}
            sizes={PORTFOLIO_GALLERY_HALF_SIZES}
            className={`${items[1].ratio} w-full object-cover`}
          />
          <GalleryPhoto
            item={items[3]}
            sizes={PORTFOLIO_GALLERY_HALF_SIZES}
            className={`${items[3].ratio} w-full object-cover`}
          />
        </div>
      </div>
    )
  }

  const sizes =
    items.length > 1
      ? PORTFOLIO_GALLERY_HALF_SIZES
      : PORTFOLIO_GALLERY_FULL_SIZES
  return (
    <div
      className={`mt-20 grid gap-2.5 md:mt-28 ${
        items.length > 1 ? "md:grid-cols-2" : ""
      }`}
    >
      {items.map((item) => (
        <GalleryPhoto
          key={item.src}
          item={item}
          sizes={sizes}
          className={`${
            items.length === 1 ? "aspect-[16/9]" : "aspect-[4/5]"
          } w-full object-cover`}
        />
      ))}
    </div>
  )
}

export function ProjectPage({ slug }: { slug: string }) {
  const project = projectBySlug(slug)
  if (!project) return null
  const index = PROJECTS.findIndex((item) => item.slug === project.slug)
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const hasCopy = Boolean(
    project.summary || project.details?.length || project.gallery.length,
  )

  return (
    <>
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden text-white">
        <PortfolioImage
          id={project.image}
          alt={project.alt}
          sizes={PORTFOLIO_HERO_SIZES}
          pictureClassName="absolute inset-0 block size-full"
          className="size-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-[58%] h-px bg-white/50" />
        <div className="relative mx-auto h-full max-w-[1750px]">
          <div className="absolute inset-y-0 left-[75.7%] hidden w-px bg-white/50 md:block" />
          {project.place && (
            <p className="absolute left-6 top-[58%] -translate-y-[calc(100%+10px)] text-body2-s md:left-10">
              {project.place}
            </p>
          )}
          {project.type && (
            <p className="absolute left-[calc(75.7%+20px)] top-[58%] hidden -translate-y-[calc(100%+10px)] text-body2-s md:block">
              {project.type}
            </p>
          )}
          <h1 className="absolute bottom-10 left-6 text-h2-s md:text-h2-m xl:text-h2-l leading-[1.2] tracking-[-0.02em] md:left-10 ">
            {project.name}
          </h1>
          <p className="absolute bottom-12 left-[calc(75.7%+20px)] hidden text-body2-s md:block">
            {project.year}
          </p>
        </div>
      </section>

      {hasCopy && (
        <section className="mx-auto max-w-[1750px] px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-24">
          {(project.summary || project.details) && (
            <div className="grid gap-12 lg:grid-cols-[minmax(0,55%)_1fr_35%]">
              {project.summary && (
                <p className="text-h4-m xl:text-h4-l leading-[1.6] tracking-[-0.02em] ">
                  {project.summary}
                </p>
              )}
              {project.details && (
                <dl className="md:col-start-3">
                  {project.details.map((d) => (
                    <div
                      key={d.label}
                      className="flex gap-5 border-b border-black/50 px-2.5 py-3 text-body2-s"
                    >
                      <dt className="shrink-0">{d.label}:</dt>
                      <dd className="text-black/50">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
          {project.gallery.length > 0 && <Gallery items={project.gallery} />}
        </section>
      )}

      <section className="pb-0">
        <div className="mx-auto flex max-w-[1750px] items-end justify-between gap-6 px-6 pb-4 md:px-10">
          <div>
            <p className="mb-3 text-caption-m uppercase tracking-[0.08em] text-black/50">
              More projects
            </p>
            <h2 className="text-h3-s md:text-h3-m xl:text-h3-l leading-[1.4] ">
              {next.name}
            </h2>
          </div>
          <a
            href="/portfolio/millwork/"
            className="pb-2 text-body2-s text-black/60 transition-colors hover:text-black"
          >
            All projects →
          </a>
        </div>
        <a
          href={`/portfolio/project/${next.slug}/`}
          className="group block h-[60vh] max-h-[548px] min-h-[360px] w-full overflow-hidden"
        >
          <PortfolioImage
            id={next.image}
            alt={next.alt}
            sizes={PORTFOLIO_HERO_SIZES}
            pictureClassName="block size-full"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </a>
      </section>
    </>
  )
}

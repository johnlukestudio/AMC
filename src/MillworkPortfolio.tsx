import { useEffect, useRef } from "react"
import { media, projectsInCategory } from "./projects"
import { getPathname, resolveRoute } from "./routes"

const asset = "/media"
const corner = `${asset}/4a604.svg`

const FILTERS = [
  { label: "Millwork", slug: "millwork" },
  { label: "Casework", slug: "casework" },
  { label: "Acoustics", slug: "acoustics" },
  { label: "All projects", slug: "all" },
]

const CUBE_W = 218
const CUBE_H = 220
const OFF = -99999

/* One shared cursor "cube": a single position drives a clipped copy inside every
   project frame, so it reads as one square passing over the grid. On leave it keeps
   travelling along its last heading and slides out of the clipped frames. */
export function MillworkPortfolio() {
  const slug = resolveRoute(getPathname()).slug || "millwork"
  const current = FILTERS.find((f) => f.slug === slug) ?? FILTERS[0]
  const projects = projectsInCategory(current.slug)
  const composed = current.slug === "all"
  const gridRef = useRef<HTMLDivElement>(null)
  const frames = useRef<(HTMLDivElement | null)[]>([])
  const cubes = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || !window.matchMedia("(pointer: fine)").matches) return
    const mouse = { x: OFF, y: OFF }
    const pos = { x: OFF, y: OFF }
    const prev = { x: 0, y: 0 }
    const mv = { x: 0, y: 0 }
    const drift = { x: 0, y: 0 }
    let inside = false
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mv.x = mv.x * 0.7 + (e.clientX - prev.x) * 0.3
      mv.y = mv.y * 0.7 + (e.clientY - prev.y) * 0.3
      prev.x = mouse.x = e.clientX
      prev.y = mouse.y = e.clientY
    }
    const onEnter = (e: MouseEvent) => {
      inside = true
      prev.x = mouse.x = e.clientX
      prev.y = mouse.y = e.clientY
      mv.x = mv.y = 0
      if (Math.abs(pos.x - mouse.x) > 4000) {
        pos.x = mouse.x
        pos.y = mouse.y
      }
    }
    const onLeave = () => {
      inside = false
      const len = Math.hypot(mv.x, mv.y) || 1
      const speed = Math.max(len, 14)
      drift.x = (mv.x / len) * speed || speed
      drift.y = (mv.y / len) * speed
    }

    const tick = () => {
      if (inside) {
        pos.x += (mouse.x - pos.x) * 0.16
        pos.y += (mouse.y - pos.y) * 0.16
      } else if (pos.x !== OFF) {
        pos.x += drift.x
        pos.y += drift.y
        drift.x *= 1.03
        drift.y *= 1.03
        if (Math.abs(pos.x) > 6000 || Math.abs(pos.y) > 6000)
          pos.x = pos.y = OFF
      }
      frames.current.forEach((f, i) => {
        const c = cubes.current[i]
        if (!f || !c) return
        const r = f.getBoundingClientRect()
        c.style.transform = `translate3d(${pos.x - r.left - CUBE_W / 2}px, ${pos.y - r.top - CUBE_H / 2}px, 0)`
      })
      raf = requestAnimationFrame(tick)
    }

    grid.addEventListener("mousemove", onMove)
    grid.addEventListener("mouseenter", onEnter)
    grid.addEventListener("mouseleave", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      grid.removeEventListener("mousemove", onMove)
      grid.removeEventListener("mouseenter", onEnter)
      grid.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <section className="mx-auto max-w-[1750px] px-6 pt-32 pb-24 md:px-10 md:pt-[140px] md:pb-32">
      <nav aria-label="Portfolio categories" className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f.slug === current.slug
          return (
            <a
              key={f.slug}
              href={`/portfolio/${f.slug}/`}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-5 py-[8px] text-caption-s uppercase tracking-wide transition-colors duration-300 ${
                active
                  ? "border-black bg-black text-white"
                  : "border-black/20 text-black/60 hover:border-black hover:text-black"
              }`}
            >
              {f.label}
            </a>
          )
        })}
      </nav>
      <span className="text-body2-s leading-none capitalize">
        {current.slug === "all" ? "All projects" : `${current.label} projects`}
      </span>
      {projects.length === 0 ? (
        <p className="mt-12 max-w-[520px] text-body1-s leading-[1.6] text-black/60">
          No {current.label.toLowerCase()} projects are published yet.
        </p>
      ) : (
      <div
        ref={gridRef}
        className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 md:cursor-none md:grid-cols-12 md:gap-y-[8vw]"
      >
        {projects.map((p, i) => (
          <a
            key={p.slug}
            href={`/portfolio/project/${p.slug}/`}
            className={`block self-start ${composed ? p.cls : "md:col-span-6"}`}
          >
            <div
              ref={(el) => {
                frames.current[i] = el
              }}
              className={`relative overflow-hidden ${p.ratio}`}
            >
              <img
                src={media(p.image)}
                alt={p.alt}
                className="absolute inset-0 size-full object-cover"
              />
              <div
                ref={(el) => {
                  cubes.current[i] = el
                }}
                className="pointer-events-none absolute left-0 top-0 hidden will-change-transform md:block"
                style={{
                  width: CUBE_W,
                  height: CUBE_H,
                  transform: `translate3d(${OFF}px, ${OFF}px, 0)`,
                }}
              >
                <img
                  src={media(p.image)}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
                <img
                  src={corner}
                  alt=""
                  width={19.5}
                  height={19.5}
                  className="absolute -left-[5px] -top-[6px]"
                />
                <img
                  src={corner}
                  alt=""
                  width={19.5}
                  height={19.5}
                  className="absolute -right-[5px] -top-[6px] rotate-90"
                />
                <img
                  src={corner}
                  alt=""
                  width={19.5}
                  height={19.5}
                  className="absolute -bottom-[6px] -right-[5px] rotate-180"
                />
                <img
                  src={corner}
                  alt=""
                  width={19.5}
                  height={19.5}
                  className="absolute -bottom-[6px] -left-[5px] -rotate-90"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-body2-s">
              <span className="capitalize">{p.name}</span>
              <span className="text-black/50">{p.year}</span>
            </div>
          </a>
        ))}
      </div>
      )}
    </section>
  )
}

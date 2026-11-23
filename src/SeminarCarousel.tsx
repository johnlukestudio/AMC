import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import { SEMINAR_PHOTOS, type SeminarPhoto } from "./seminar-photos"

const SEMINAR_BASE = "/media/news/awi-seminar"
const SEMINAR_LABEL =
  "Photographs from the AWI Project Management seminar at American Millwork and Cabinetry, October 1 and 2, 2026"

function srcSet(base: string, photo: SeminarPhoto, ext: "jpg" | "webp") {
  return photo.widths.map((w) => `${base}/${photo.stem}-${w}.${ext} ${w}w`).join(", ")
}

type CarouselProps = {
  photos?: SeminarPhoto[]
  base?: string
  label?: string
  /** Desktop cap, in pixels. Stays at the seminar album width unless a post passes its own. */
  maxWidth?: number
}

/** Landscape frame, centered. Portraits fit inside that height and nothing is stretched past its file size. */
export function SeminarCarousel({
  photos = SEMINAR_PHOTOS,
  base = SEMINAR_BASE,
  label = SEMINAR_LABEL,
  maxWidth = 836,
}: CarouselProps = {}) {
  const scroller = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const count = photos.length
  const sizes = `(min-width: ${maxWidth + 32}px) ${maxWidth}px, 100vw`

  const go = useCallback(
    (next: number) => {
      const el = scroller.current
      const i = (next + count) % count
      setIndex(i)
      if (!el) return
      el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" })
    },
    [count],
  )

  useEffect(() => {
    setIndex(0)
    scroller.current?.scrollTo({ left: 0 })
  }, [base])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const w = el.clientWidth || 1
        const i = Math.round(el.scrollLeft / w)
        setIndex(Math.max(0, Math.min(count - 1, i)))
      })
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener("scroll", onScroll)
    }
  }, [count])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      go(index + 1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      go(index - 1)
    }
  }

  return (
    <section
      className="mx-auto w-full outline-none"
      style={{ maxWidth }}
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        ref={scroller}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => {
          const near = Math.abs(i - index) <= 2 || Math.abs(i - index) >= count - 2
          const largest = photo.widths[photo.widths.length - 1]
          return (
            <div key={photo.stem} className="w-full shrink-0 snap-center overflow-hidden" aria-hidden={i !== index}>
              <div className="relative aspect-[4/3] w-full bg-neutral-200">
                {near ? (
                  <picture className="absolute inset-0 flex items-center justify-center">
                    <source type="image/webp" srcSet={srcSet(base, photo, "webp")} sizes={sizes} />
                    <img
                      src={`${base}/${photo.stem}-${largest}.jpg`}
                      srcSet={srcSet(base, photo, "jpg")}
                      sizes={sizes}
                      width={photo.width}
                      height={photo.height}
                      alt={i === index ? photo.alt : ""}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      style={{ maxWidth: `min(100%, ${photo.width}px)`, maxHeight: `min(100%, ${photo.height}px)` }}
                      className="h-auto w-auto object-contain"
                    />
                  </picture>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          className="border border-black/20 px-4 py-2 text-caption-s uppercase tracking-wide hover:border-black"
          onClick={() => go(index - 1)}
        >
          Previous
        </button>
        <p className="text-caption-s text-black/60" aria-live="polite">
          {index + 1} of {count}
        </p>
        <button
          type="button"
          className="border border-black/20 px-4 py-2 text-caption-s uppercase tracking-wide hover:border-black"
          onClick={() => go(index + 1)}
        >
          Next
        </button>
      </div>
    </section>
  )
}

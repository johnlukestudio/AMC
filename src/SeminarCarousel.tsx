import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import { SEMINAR_PHOTOS, type SeminarPhoto } from "./seminar-photos"

const BASE = "/media/news/awi-seminar"

function srcSet(photo: SeminarPhoto, ext: "jpg" | "webp") {
  return photo.widths.map((w) => `${BASE}/${photo.stem}-${w}.${ext} ${w}w`).join(", ")
}

/** 836px-wide seminar stills. The frame matches the album's 4:3 landscape shots and is not stretched past the source. */
export function SeminarCarousel() {
  const scroller = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const count = SEMINAR_PHOTOS.length

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
      className="mx-auto w-full max-w-[836px] outline-none"
      aria-roledescription="carousel"
      aria-label="Photographs from the AWI Project Management seminar at American Millwork and Cabinetry, October 1 and 2, 2026"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        ref={scroller}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SEMINAR_PHOTOS.map((photo, i) => {
          const near = Math.abs(i - index) <= 2 || Math.abs(i - index) >= count - 2
          const largest = photo.widths[photo.widths.length - 1]
          return (
            <div key={photo.stem} className="w-full shrink-0 snap-center" aria-hidden={i !== index}>
              {near ? (
                <picture className="block">
                  <source type="image/webp" srcSet={srcSet(photo, "webp")} sizes="(min-width: 868px) 836px, 100vw" />
                  <img
                    src={`${BASE}/${photo.stem}-${largest}.jpg`}
                    srcSet={srcSet(photo, "jpg")}
                    sizes="(min-width: 868px) 836px, 100vw"
                    width={photo.width}
                    height={photo.height}
                    alt={i === index ? photo.alt : ""}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="aspect-[4/3] w-full bg-neutral-200 object-cover"
                  />
                </picture>
              ) : (
                <div className="aspect-[4/3] w-full bg-neutral-200" />
              )}
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

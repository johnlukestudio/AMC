import { useEffect, useState } from "react"

/** Scroll to a section holding a YouTubeFacade and start it (hash routing safe). */
export function playFilmAt(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top, behavior: "smooth" })
  window.setTimeout(() => window.dispatchEvent(new CustomEvent("amc-play-film", { detail: sectionId })), 700)
}

export const AMC_FILM_ID = "74eBYIORrts"
export const AMC_FILM_POSTER = "/media/amc-film-poster.jpg"

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduce(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])
  return reduce
}

export function YouTubeFacade({
  videoId = AMC_FILM_ID,
  poster = AMC_FILM_POSTER,
  title = "American Millwork: Who We Are",
  duration = "02:08",
  label = "Watch the film",
  sectionId,
}: {
  sectionId?: string
  videoId?: string
  poster?: string
  title?: string
  duration?: string
  label?: string
}) {
  const [playing, setPlaying] = useState(false)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    if (!sectionId) return
    const on = (e: Event) => (e as CustomEvent).detail === sectionId && setPlaying(true)
    window.addEventListener("amc-play-film", on)
    return () => window.removeEventListener("amc-play-film", on)
  }, [sectionId])
  const posterMotion = reduce ? "" : "transition duration-700 group-hover:scale-[1.02] group-hover:opacity-65"
  const controlMotion = reduce ? "" : "transition-colors duration-300"
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 block size-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <img
            src={poster}
            alt=""
            loading="lazy"
            className={`absolute inset-0 size-full object-cover opacity-80 ${posterMotion}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className={`absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white text-white backdrop-blur-sm group-hover:bg-white group-hover:text-black group-focus-visible:bg-white group-focus-visible:text-black sm:size-24 md:size-32 ${controlMotion}`}>
            <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" className="ml-1" aria-hidden="true">
              <path d="M22 13 0 26V0z" />
            </svg>
          </span>
          {label && (
            <span className="absolute bottom-6 left-6 text-caption-s uppercase tracking-[0.16em] text-white md:bottom-8 md:left-8">
              {label}
            </span>
          )}
          {duration && <span className="absolute bottom-6 right-6 text-caption-s uppercase tracking-[0.16em] text-white/70 md:bottom-8 md:right-8">
            {duration}
          </span>}
        </button>
      )}
    </div>
  )
}

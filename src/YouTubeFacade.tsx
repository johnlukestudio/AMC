import { useState } from "react"

export const AMC_FILM_ID = "74eBYIORrts"
export const AMC_FILM_POSTER = "/media/amc-film-poster.jpg"

export function YouTubeFacade({
  videoId = AMC_FILM_ID,
  poster = AMC_FILM_POSTER,
  title = "Inside American Millwork & Cabinetry: a film about our shop and our people",
  duration = "02:08",
}: {
  videoId?: string
  poster?: string
  title?: string
  duration?: string
}) {
  const [playing, setPlaying] = useState(false)
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
            className="absolute inset-0 size-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black group-focus-visible:bg-white group-focus-visible:text-black sm:size-24 md:size-32">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" className="ml-1" aria-hidden="true">
              <path d="M22 13 0 26V0z" />
            </svg>
          </span>
          <span className="absolute bottom-6 left-6 text-caption-s uppercase tracking-[0.16em] text-white md:bottom-8 md:left-8">
            Watch the film
          </span>
          <span className="absolute bottom-6 right-6 text-caption-s uppercase tracking-[0.16em] text-white/70 md:bottom-8 md:right-8">
            {duration}
          </span>
        </button>
      )}
    </div>
  )
}

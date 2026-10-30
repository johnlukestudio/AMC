import { useEffect, useState } from "react"

const base = "/media/loops"

/* Seamless background loop. Mobile gets the 720p file; reduced motion gets the poster only. */
export function LoopVideo({ name, className = "", label }: { name: string; className?: string; label?: string }) {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduce(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])
  const poster = `${base}/${name}.jpg`
  if (reduce) return <img src={poster} alt={label ?? ""} aria-hidden={label ? undefined : true} className={`object-cover ${className}`} />
  return (
    <video
      className={`object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <source src={`${base}/${name}-m.mp4`} type="video/mp4" media="(max-width: 767px)" />
      <source src={`${base}/${name}.mp4`} type="video/mp4" />
    </video>
  )
}

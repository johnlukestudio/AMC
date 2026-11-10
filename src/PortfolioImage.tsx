import type { CSSProperties } from "react"
import { portfolioSources, type PortfolioPhotoId } from "./portfolio-photos"

export function PortfolioImage({
  id,
  alt,
  sizes,
  className,
  pictureClassName = "block",
  loading = "lazy",
  fetchPriority,
  draggable,
  style,
  hidden,
}: {
  id: PortfolioPhotoId
  alt: string
  sizes: string
  className?: string
  pictureClassName?: string
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
  draggable?: boolean
  style?: CSSProperties
  hidden?: boolean
}) {
  const photo = portfolioSources(id)
  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={photo.avif} sizes={sizes} />
      <img
        src={photo.src}
        srcSet={photo.jpg}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={loading === "eager" ? "auto" : "async"}
        draggable={draggable}
        style={style}
        className={className}
        aria-hidden={hidden || undefined}
      />
    </picture>
  )
}

/** Portfolio photography encoded from the unsuffixed live originals.
 *  Each file is sRGB, EXIF-stripped, and never wider than the camera file.
 *  AVIF is quality 55 (4:2:0, effort 4). JPEG fallback is mozjpeg quality 84.
 *  `width` and `height` are the 3840px master, which every original can fill.
 */

export const PORTFOLIO_WIDTHS = [1280, 1920, 2560, 3840] as const

export type PortfolioPhotoId = "cheston-school" | "cheston-interior" | "ave-blue-bell" | "ave-lobby" | "ave-lounge" | "ave-dining" | "ave-clubroom" | "mattison-lounge" | "mattison-library" | "kalahari-entrance" | "kalahari-interior" | "milford-village" | "milford-residences" | "waugh-chapel" | "waugh-atrium" | "washington-hall" | "washington-wall" | "washington-interior" | "washington-reception"

export type PortfolioPhoto = {
  id: PortfolioPhotoId
  width: number
  height: number
}

export const PORTFOLIO_PHOTOS: Record<PortfolioPhotoId, PortfolioPhoto> = {
  "cheston-school": { id: "cheston-school", width: 3840, height: 2560 },
  "cheston-interior": { id: "cheston-interior", width: 3840, height: 2560 },
  "ave-blue-bell": { id: "ave-blue-bell", width: 3840, height: 2560 },
  "ave-lobby": { id: "ave-lobby", width: 3840, height: 2561 },
  "ave-lounge": { id: "ave-lounge", width: 3840, height: 2560 },
  "ave-dining": { id: "ave-dining", width: 3840, height: 2559 },
  "ave-clubroom": { id: "ave-clubroom", width: 3840, height: 2561 },
  "mattison-lounge": { id: "mattison-lounge", width: 3840, height: 2560 },
  "mattison-library": { id: "mattison-library", width: 3840, height: 2560 },
  "kalahari-entrance": { id: "kalahari-entrance", width: 3840, height: 2559 },
  "kalahari-interior": { id: "kalahari-interior", width: 3840, height: 2560 },
  "milford-village": { id: "milford-village", width: 3840, height: 2560 },
  "milford-residences": { id: "milford-residences", width: 3840, height: 2561 },
  "waugh-chapel": { id: "waugh-chapel", width: 3840, height: 2561 },
  "waugh-atrium": { id: "waugh-atrium", width: 3840, height: 2560 },
  "washington-hall": { id: "washington-hall", width: 3840, height: 2558 },
  "washington-wall": { id: "washington-wall", width: 3840, height: 2558 },
  "washington-interior": {
    id: "washington-interior",
    width: 3840,
    height: 2558,
  },
  "washington-reception": {
    id: "washington-reception",
    width: 3840,
    height: 2558,
  },
}

export function portfolioSources(id: PortfolioPhotoId) {
  const photo = PORTFOLIO_PHOTOS[id]
  const srcSet = (ext: "avif" | "jpg") =>
    PORTFOLIO_WIDTHS.map(
      (w) => `/media/portfolio/${id}-${w}.${ext} ${w}w`,
    ).join(", ")
  const largest = PORTFOLIO_WIDTHS[PORTFOLIO_WIDTHS.length - 1]
  return {
    src: `/media/portfolio/${id}-${largest}.jpg`,
    avif: srcSet("avif"),
    jpg: srcSet("jpg"),
    width: photo.width,
    height: photo.height,
  }
}

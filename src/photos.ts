/** A photo plus downscaled srcset candidates. Widths are never larger than the file's native size. */

export type ResponsivePhoto = {
  src: string
  srcSet: string
  width: number
  height: number
}

export function responsivePhoto(
  base: string,
  widths: readonly number[],
  width: number,
  height: number,
): ResponsivePhoto {
  return {
    src: `${base}-${widths[widths.length - 1]}.jpg`,
    srcSet: widths.map((w) => `${base}-${w}.jpg ${w}w`).join(", "),
    width,
    height,
  }
}

/** Service hero sits in a padded 1750px column, so the slot never exceeds the 1920px source. */
export const HERO_SIZES =
  "(min-width: 1830px) 1670px, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 3rem)"

/** Four-up product cards. The widest cell is about 400px, under the 1024px source even at 2x. */
export const CARD_SIZES =
  "(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"

/** Three-up service cards. Widest cell is about 540px. */
export const CARD_SIZES_3 =
  "(min-width: 1024px) 540px, (min-width: 640px) 46vw, 92vw"

export function acousticalPhoto(name: string): ResponsivePhoto {
  return responsivePhoto(
    `/media/acoustical/${name}`,
    [480, 768, 1024],
    1024,
    684,
  )
}

export function serviceHero(name: "acoustical" | "surfaces"): ResponsivePhoto {
  return responsivePhoto(`/media/heroes/${name}`, [768, 1280, 1920], 1920, 1080)
}

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

/** Project hero and the next-project band are full viewport width. */
export const PORTFOLIO_HERO_SIZES = "100vw"

/** Portfolio grid cards. The widest cell is about 815px inside the 1750px column. */
export const PORTFOLIO_CARD_SIZES =
  "(min-width: 1830px) 815px, (min-width: 768px) calc((100vw - 7.5rem) / 2), calc(100vw - 3rem)"

/** One gallery image across the padded column. Same slot as a service hero. */
export const PORTFOLIO_GALLERY_FULL_SIZES = HERO_SIZES

/** Two-column gallery cell, about 830px at the column's max width. */
export const PORTFOLIO_GALLERY_HALF_SIZES =
  "(min-width: 1830px) 830px, (min-width: 768px) calc((100vw - 5.625rem) / 2), calc(100vw - 3rem)"

/** About-page marquee tiles. */
export const PORTFOLIO_MARQUEE_SIZES = "(min-width: 768px) 330px, 260px"

/** Timeline thumbnails never render wider than 190px. */
export const PORTFOLIO_THUMB_SIZES = "190px"

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

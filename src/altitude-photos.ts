import type { SeminarPhoto } from "./seminar-photos"

const W = [640, 1280, 1920, 2560]

/** Nine office photographs from the Altitude Marketing portfolio. Cafe brick wall first. */
export const ALTITUDE_PHOTOS: SeminarPhoto[] = [
  { n: 1, stem: "cafe", width: 2560, height: 1707, widths: W, alt: "Cafe brick wall at the Altitude Marketing office" },
  { n: 2, stem: "front", width: 2560, height: 1707, widths: W, alt: "Front windows at the Altitude Marketing office" },
  { n: 3, stem: "alcove", width: 2560, height: 1708, widths: W, alt: "Cafe alcove at the Altitude Marketing office" },
  { n: 4, stem: "beverage", width: 2560, height: 1707, widths: W, alt: "Beverage station looking toward the lot at Altitude Marketing" },
  { n: 5, stem: "award", width: 2560, height: 1707, widths: W, alt: "Award cabinet on the brick wall at Altitude Marketing" },
  { n: 6, stem: "back", width: 2560, height: 1707, widths: W, alt: "Back hallway at the Altitude Marketing office" },
  { n: 7, stem: "rear", width: 2560, height: 1706, widths: W, alt: "Rear hallway at the Altitude Marketing office" },
  { n: 8, stem: "office-a", width: 2560, height: 1707, widths: W, alt: "Conference table and mountain painting at Altitude Marketing" },
  { n: 9, stem: "office-b", width: 2560, height: 1708, widths: W, alt: "Conference room with the Altitude logo on screen" },
]

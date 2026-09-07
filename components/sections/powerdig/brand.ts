/** PowerDig brand primitives shared by the section components. */
export const BRAND_ORANGE = "#C87722";
export const BRAND_GOLD = "#D4A45A";
export const BRAND_SHINE = "#FFD166";
export const BRAND_INK = "#0A0A0A";
export const HEADING_FONT = "var(--font-lato)";

/** Hex colour + 2-digit alpha suffix, e.g. withAlpha(BRAND_ORANGE, "33"). */
export function withAlpha(hex: string, alpha: string): string {
  return `${hex}${alpha}`;
}

const POLISH_COUNTRY_CODE = "48";
const POLISH_LOCAL_LENGTH = 9;
const NON_BREAKING_HYPHEN = "‑";

function digitsOf(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** "795704504" → "795‑704‑504" (non-breaking hyphens keep it on one line). */
export function formatPhoneDisplay(raw: string): string {
  const digits = digitsOf(raw);
  const local =
    digits.startsWith(POLISH_COUNTRY_CODE) && digits.length === 11 ? digits.slice(2) : digits;
  if (local.length !== POLISH_LOCAL_LENGTH) return raw.trim();
  return [local.slice(0, 3), local.slice(3, 6), local.slice(6)].join(NON_BREAKING_HYPHEN);
}

/** Normalises a Polish number to E.164 ("+48795704504"); null when impossible. */
export function toE164(raw: string): string | null {
  const digits = digitsOf(raw);
  if (!digits) return null;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  if (raw.trim().startsWith("+")) return `+${digits}`;
  if (digits.length === POLISH_LOCAL_LENGTH) return `+${POLISH_COUNTRY_CODE}${digits}`;
  if (digits.length === 11 && digits.startsWith(POLISH_COUNTRY_CODE)) return `+${digits}`;
  return null;
}

export function toTelHref(raw: string): string {
  return `tel:${toE164(raw) ?? digitsOf(raw)}`;
}

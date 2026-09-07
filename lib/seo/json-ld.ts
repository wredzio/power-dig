import { toE164 } from "@/lib/format-phone";

interface OpeningHoursRow {
  days?: string | null;
  time?: string | null;
}

const DAY_CODES: Record<string, string> = {
  pon: "Mo",
  pn: "Mo",
  poniedzialek: "Mo",
  poniedziałek: "Mo",
  mon: "Mo",
  monday: "Mo",
  wt: "Tu",
  wto: "Tu",
  wtorek: "Tu",
  tue: "Tu",
  tuesday: "Tu",
  sr: "We",
  śr: "We",
  sro: "We",
  śro: "We",
  sroda: "We",
  środa: "We",
  wed: "We",
  wednesday: "We",
  czw: "Th",
  cz: "Th",
  czwartek: "Th",
  thu: "Th",
  thursday: "Th",
  pt: "Fr",
  pi: "Fr",
  pia: "Fr",
  piatek: "Fr",
  piątek: "Fr",
  fri: "Fr",
  friday: "Fr",
  sob: "Sa",
  so: "Sa",
  sobota: "Sa",
  sat: "Sa",
  saturday: "Sa",
  nd: "Su",
  ndz: "Su",
  niedz: "Su",
  niedziela: "Su",
  sun: "Su",
  sunday: "Su",
};

const TIME_RANGE = /(\d{1,2})[:.](\d{2})\s*[–\-—]\s*(\d{1,2})[:.](\d{2})/;

function dayCode(token: string): string | null {
  const key = token.trim().toLowerCase().replace(/\.$/, "");
  return DAY_CODES[key] ?? null;
}

function pad(n: string): string {
  return n.padStart(2, "0");
}

/**
 * Turns human opening hours ("Pon–Pt", "7:00 – 18:00") into schema.org
 * `openingHours` strings ("Mo-Fr 07:00-18:00"). Rows that are not real
 * hours (closed days, marketing copy) are skipped.
 */
export function parseOpeningHours(rows: OpeningHoursRow[] | null | undefined): string[] {
  if (!rows) return [];
  return rows.flatMap((row) => {
    const time = row.time?.match(TIME_RANGE);
    if (!row.days || !time) return [];
    const [from, to] = row.days.split(/\s*[–\-—]\s*/).map(dayCode);
    if (!from) return [];
    const days = to && to !== from ? `${from}-${to}` : from;
    return [`${days} ${pad(time[1])}:${time[2]}-${pad(time[3])}:${time[4]}`];
  });
}

export interface LocalBusinessInput {
  name: string;
  url: string;
  phone?: string | null;
  email?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  areaServed?: string | null;
  openingHours?: OpeningHoursRow[] | null;
  locale: string;
}

export type JsonLd = Record<string, unknown> & { "@context": string; "@type": string };

function compact<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  ) as T;
}

/** schema.org `Electrician` (a LocalBusiness subtype) for the whole site. */
export function buildLocalBusinessJsonLd(input: LocalBusinessInput): JsonLd & {
  name: string;
  telephone?: string;
  email?: string;
  image?: string;
  logo?: string;
  areaServed?: { "@type": string; name: string };
  openingHours?: string[];
  inLanguage: string;
} {
  const telephone = input.phone ? (toE164(input.phone) ?? undefined) : undefined;
  const openingHours = parseOpeningHours(input.openingHours);
  return compact({
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${input.url}/#business`,
    name: input.name,
    url: input.url,
    description: input.description ?? undefined,
    telephone,
    email: input.email ?? undefined,
    image: input.logoUrl ?? undefined,
    logo: input.logoUrl ?? undefined,
    areaServed: input.areaServed
      ? { "@type": "AdministrativeArea", name: input.areaServed }
      : undefined,
    openingHours: openingHours.length > 0 ? openingHours : undefined,
    priceRange: "$$",
    inLanguage: input.locale,
  });
}

export interface FaqItemInput {
  question?: string | null;
  answer?: string | null;
}

export function buildFaqJsonLd(items: FaqItemInput[]): JsonLd & {
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>;
} {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        "@type": "Question" as const,
        name: item.question!,
        acceptedAnswer: { "@type": "Answer" as const, text: item.answer! },
      })),
  };
}

import { routing } from "@/i18n/routing";

/**
 * Business card data for PowerDig Serwis. Sanity settings override these
 * at runtime; the constants are the last-resort fallback and the source
 * for build-time artefacts (manifest, OG image, JSON-LD defaults).
 */
export const SITE = {
  name: "PowerDig Serwis Daniel Głogowski",
  shortName: "PowerDig Serwis",
  /** Production origin; overridden by Sanity settings or NEXT_PUBLIC_SITE_URL. */
  url: "https://www.powerdig.pl",
  ownerName: "Daniel Głogowski",
  phone: "795704504",
  email: "powerdig.serwis@gmail.com",
  areaServed: "Małopolska",
  brandColor: "#C87722",
  backgroundColor: "#0A0A0A",
} as const;

const LOCALHOST_URL = "http://localhost:3000";

interface ResolveSiteUrlInput {
  settingsUrl?: string | null;
  envUrl?: string | null;
  /** Known production origin, preferred over the *.vercel.app deployment host. */
  productionUrl?: string | null;
  vercelUrl?: string | null;
}

function normaliseHttpUrl(candidate: string | null | undefined): string | null {
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    if (!/^https?:$/.test(url.protocol)) return null;
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return null;
    return url.origin;
  } catch {
    return null;
  }
}

/**
 * Picks the public site origin: CMS settings, then NEXT_PUBLIC_SITE_URL,
 * then the known production domain, then the Vercel deployment host, then
 * localhost. Localhost values in CMS/env are ignored so a forgotten dev URL
 * never leaks into production canonicals, and the *.vercel.app host is only
 * used when no real domain is known.
 */
export function resolveSiteUrl(input: ResolveSiteUrlInput): string {
  const envUrl = normaliseHttpUrl(input.envUrl);
  const productionUrl = normaliseHttpUrl(input.productionUrl);
  // An env URL pointing at a *.vercel.app host is a deployment address, not
  // the public domain; it must not beat a known production origin.
  const envIsDeploymentHost = envUrl !== null && isVercelHost(envUrl);

  return (
    normaliseHttpUrl(input.settingsUrl) ??
    (envIsDeploymentHost ? null : envUrl) ??
    productionUrl ??
    envUrl ??
    (input.vercelUrl ? normaliseHttpUrl(`https://${input.vercelUrl}`) : null) ??
    LOCALHOST_URL
  );
}

function isVercelHost(origin: string): boolean {
  return new URL(origin).hostname.endsWith(".vercel.app");
}

export function getSiteUrl(settingsUrl?: string | null): string {
  return resolveSiteUrl({
    settingsUrl,
    envUrl: process.env.NEXT_PUBLIC_SITE_URL,
    productionUrl: SITE.url,
    vercelUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL,
  });
}

/**
 * Builds the public path for a page slug, honouring next-intl's
 * `localePrefix: "as-needed"` (default locale has no prefix).
 */
export function localizedPath(locale: string, slug: string): string {
  const trimmed = slug.replace(/^\/+|\/+$/g, "");
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  if (!trimmed) return prefix || "/";
  return `${prefix}/${trimmed}`;
}

export const OG_LOCALES: Record<string, string> = {
  pl: "pl_PL",
  en: "en_US",
};

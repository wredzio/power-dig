import { describe, expect, it } from "vitest";

import { buildPageMetadata } from "./page-metadata";

const settings = {
  title: "PowerDig Serwis",
  description: "Domyślny opis serwisu elektrycznego.",
  keywords: ["elektryk", "serwis AGD"],
  ogImageUrl: "https://cdn.sanity.io/images/settings-og.jpg",
};

describe("buildPageMetadata", () => {
  it("uses the site title as an absolute title on the homepage", () => {
    const meta = buildPageMetadata({
      page: { title: "Strona główna" },
      settings,
      locale: "pl",
      slug: "/",
      siteUrl: "https://powerdig.pl",
    });
    expect(meta.title).toEqual({ absolute: "PowerDig Serwis" });
    expect(meta.description).toBe(settings.description);
    expect(meta.keywords).toEqual(settings.keywords);
  });

  it("prefers page-level SEO fields", () => {
    const meta = buildPageMetadata({
      page: {
        title: "FAQ",
        metadata: {
          metaTitle: "Najczęstsze pytania",
          metaDescription: "Odpowiedzi na pytania o usługi elektryczne.",
          keywords: ["faq"],
          ogImageUrl: "https://cdn.sanity.io/images/faq.jpg",
        },
      },
      settings,
      locale: "pl",
      slug: "faq",
      siteUrl: "https://powerdig.pl",
    });
    expect(meta.title).toBe("Najczęstsze pytania");
    expect(meta.description).toBe("Odpowiedzi na pytania o usługi elektryczne.");
    expect(meta.keywords).toEqual(["faq"]);
    expect(meta.openGraph?.images).toEqual([
      { url: "https://cdn.sanity.io/images/faq.jpg", width: 1200, height: 630 },
    ]);
  });

  it("builds a locale-aware canonical with hreflang alternates", () => {
    const meta = buildPageMetadata({
      page: { title: "FAQ" },
      settings,
      locale: "en",
      slug: "faq",
      siteUrl: "https://powerdig.pl",
    });
    expect(meta.alternates?.canonical).toBe("https://powerdig.pl/en/faq");
    expect(meta.alternates?.languages).toEqual({
      pl: "https://powerdig.pl/faq",
      en: "https://powerdig.pl/en/faq",
      "x-default": "https://powerdig.pl/faq",
    });
    expect(meta.openGraph).toMatchObject({
      url: "https://powerdig.pl/en/faq",
      locale: "en_US",
      alternateLocale: ["pl_PL"],
      siteName: "PowerDig Serwis",
      type: "website",
    });
    expect(meta.twitter).toEqual({ card: "summary_large_image" });
  });

  it("marks noIndex pages as non-indexable", () => {
    const meta = buildPageMetadata({
      page: { title: "Draft", metadata: { noIndex: true } },
      settings,
      locale: "pl",
      slug: "draft",
      siteUrl: "https://powerdig.pl",
    });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("leaves OG images undefined so the generated opengraph-image route is used", () => {
    const meta = buildPageMetadata({
      page: { title: "FAQ" },
      settings: { ...settings, ogImageUrl: undefined },
      locale: "pl",
      slug: "faq",
      siteUrl: "https://powerdig.pl",
    });
    expect(meta.openGraph?.images).toBeUndefined();
  });
});

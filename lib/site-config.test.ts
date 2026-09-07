import { describe, expect, it } from "vitest";

import { localizedPath, resolveSiteUrl, SITE } from "./site-config";

describe("SITE constants", () => {
  it("exposes the business card data", () => {
    expect(SITE.name).toBe("PowerDig Serwis Daniel Głogowski");
    expect(SITE.shortName).toBe("PowerDig Serwis");
    expect(SITE.phone).toBe("795704504");
    expect(SITE.email).toBe("powerdig.serwis@gmail.com");
  });
});

describe("resolveSiteUrl", () => {
  it("prefers a real settings URL", () => {
    expect(
      resolveSiteUrl({
        settingsUrl: "https://powerdig.pl/",
        envUrl: "http://localhost:3000",
        vercelUrl: "power-dig.vercel.app",
      }),
    ).toBe("https://powerdig.pl");
  });

  it("skips localhost settings and falls back to env", () => {
    expect(
      resolveSiteUrl({ settingsUrl: "http://localhost:3000", envUrl: "https://example.com" }),
    ).toBe("https://example.com");
  });

  it("falls back to the Vercel deployment URL", () => {
    expect(
      resolveSiteUrl({
        settingsUrl: null,
        envUrl: "http://localhost:3000",
        vercelUrl: "power-dig.vercel.app",
      }),
    ).toBe("https://power-dig.vercel.app");
  });

  it("falls back to localhost when nothing else is set", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });

  it("ignores malformed URLs", () => {
    expect(resolveSiteUrl({ settingsUrl: "not a url", envUrl: "also bad" })).toBe(
      "http://localhost:3000",
    );
  });
});

describe("localizedPath", () => {
  it("keeps the default locale unprefixed (localePrefix: as-needed)", () => {
    expect(localizedPath("pl", "/")).toBe("/");
    expect(localizedPath("pl", "faq")).toBe("/faq");
  });

  it("prefixes non-default locales with and without a leading slash", () => {
    expect(localizedPath("en", "/")).toBe("/en");
    expect(localizedPath("en", "faq")).toBe("/en/faq");
    expect(localizedPath("en", "/polityka-prywatnosci")).toBe("/en/polityka-prywatnosci");
  });

  it("treats an empty slug as the homepage", () => {
    expect(localizedPath("pl", "")).toBe("/");
    expect(localizedPath("en", "")).toBe("/en");
  });
});

import { describe, expect, it } from "vitest";

import { buildFaqJsonLd, buildLocalBusinessJsonLd, parseOpeningHours } from "./json-ld";

describe("parseOpeningHours", () => {
  it("parses Polish day ranges and times into schema.org format", () => {
    expect(
      parseOpeningHours([
        { days: "Pon–Pt", time: "7:00 – 18:00" },
        { days: "Sobota", time: "8:00 – 14:00" },
        { days: "Niedziela", time: "Zamknięte" },
      ]),
    ).toEqual(["Mo-Fr 07:00-18:00", "Sa 08:00-14:00"]);
  });

  it("parses English day names", () => {
    expect(
      parseOpeningHours([
        { days: "Mon–Fri", time: "7:00 – 18:00" },
        { days: "Saturday", time: "8:00 – 14:00" },
        { days: "Sunday", time: "Closed" },
      ]),
    ).toEqual(["Mo-Fr 07:00-18:00", "Sa 08:00-14:00"]);
  });

  it("skips rows it cannot understand", () => {
    expect(parseOpeningHours([{ days: "Telefon", time: "Szybki dojazd" }])).toEqual([]);
    expect(parseOpeningHours(undefined)).toEqual([]);
  });
});

describe("buildLocalBusinessJsonLd", () => {
  const jsonLd = buildLocalBusinessJsonLd({
    name: "PowerDig Serwis Daniel Głogowski",
    url: "https://powerdig.pl",
    phone: "795-704-504",
    email: "powerdig.serwis@gmail.com",
    description: "Elektryk",
    logoUrl: "https://powerdig.pl/logo.png",
    areaServed: "Małopolska",
    openingHours: [{ days: "Pon–Pt", time: "7:00 – 18:00" }],
    locale: "pl",
  });

  it("describes an Electrician local business", () => {
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("Electrician");
    expect(jsonLd["@id"]).toBe("https://powerdig.pl/#business");
    expect(jsonLd.name).toBe("PowerDig Serwis Daniel Głogowski");
    expect(jsonLd.telephone).toBe("+48795704504");
    expect(jsonLd.email).toBe("powerdig.serwis@gmail.com");
    expect(jsonLd.image).toBe("https://powerdig.pl/logo.png");
    expect(jsonLd.logo).toBe("https://powerdig.pl/logo.png");
    expect(jsonLd.areaServed).toEqual({ "@type": "AdministrativeArea", name: "Małopolska" });
    expect(jsonLd.openingHours).toEqual(["Mo-Fr 07:00-18:00"]);
    expect(jsonLd.inLanguage).toBe("pl");
  });

  it("omits optional keys that have no value", () => {
    const minimal = buildLocalBusinessJsonLd({
      name: "X",
      url: "https://x.pl",
      phone: null,
      email: null,
      locale: "en",
    });
    expect(minimal).not.toHaveProperty("telephone");
    expect(minimal).not.toHaveProperty("email");
    expect(minimal).not.toHaveProperty("image");
    expect(minimal).not.toHaveProperty("areaServed");
    expect(minimal).not.toHaveProperty("openingHours");
  });
});

describe("buildFaqJsonLd", () => {
  it("maps question/answer pairs to a FAQPage", () => {
    const faq = buildFaqJsonLd([
      { question: "Q1", answer: "A1" },
      { question: "Q2", answer: "A2" },
    ]);
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(2);
    expect(faq.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "Q1",
      acceptedAnswer: { "@type": "Answer", text: "A1" },
    });
  });

  it("drops incomplete items", () => {
    const faq = buildFaqJsonLd([
      { question: "", answer: "A" },
      { question: "Q", answer: "A" },
    ]);
    expect(faq.mainEntity).toHaveLength(1);
  });
});

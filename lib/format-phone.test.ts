import { describe, expect, it } from "vitest";

import { formatPhoneDisplay, toE164, toTelHref } from "./format-phone";

describe("formatPhoneDisplay", () => {
  it("groups a 9-digit Polish number with non-breaking hyphens", () => {
    expect(formatPhoneDisplay("795704504")).toBe("795‑704‑504");
  });

  it("normalises numbers that already contain separators", () => {
    expect(formatPhoneDisplay("795-704-504")).toBe("795‑704‑504");
    expect(formatPhoneDisplay("+48 795 704 504")).toBe("795‑704‑504");
  });

  it("returns the trimmed input when the number is not a 9-digit Polish number", () => {
    expect(formatPhoneDisplay(" +1 555 0100 ")).toBe("+1 555 0100");
  });
});

describe("toE164", () => {
  it("adds the Polish country code to a local number", () => {
    expect(toE164("795704504")).toBe("+48795704504");
    expect(toE164("795-704-504")).toBe("+48795704504");
  });

  it("keeps an existing country code", () => {
    expect(toE164("+48 795 704 504")).toBe("+48795704504");
    expect(toE164("0048795704504")).toBe("+48795704504");
  });

  it("returns null for garbage", () => {
    expect(toE164("")).toBeNull();
    expect(toE164("abc")).toBeNull();
  });
});

describe("toTelHref", () => {
  it("builds a tel: link in E.164", () => {
    expect(toTelHref("795-704-504")).toBe("tel:+48795704504");
  });

  it("falls back to the raw digits when E.164 cannot be derived", () => {
    expect(toTelHref("12")).toBe("tel:12");
  });
});

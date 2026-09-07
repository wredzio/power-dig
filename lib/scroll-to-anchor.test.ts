import { describe, expect, it } from "vitest";

import { anchorIdFromHref, scrollToAnchor } from "./scroll-to-anchor";

describe("anchorIdFromHref", () => {
  it("extracts the id from hash-only and root-relative anchors", () => {
    expect(anchorIdFromHref("#uslugi")).toBe("uslugi");
    expect(anchorIdFromHref("/#o-nas")).toBe("o-nas");
  });

  it("returns null for regular links", () => {
    expect(anchorIdFromHref("/faq")).toBeNull();
    expect(anchorIdFromHref("https://example.com/#x")).toBeNull();
    expect(anchorIdFromHref("#")).toBeNull();
  });
});

describe("scrollToAnchor", () => {
  it("returns false outside a browser so callers fall back to navigation", () => {
    expect(scrollToAnchor("#uslugi")).toBe(false);
    expect(scrollToAnchor("/faq")).toBe(false);
  });
});

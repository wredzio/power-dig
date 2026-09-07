const HEADER_SELECTOR = "header";
const ANCHOR_HREF = /^\/?#(.+)$/;

/** "#uslugi" and "/#uslugi" are same-page anchors. */
export function anchorIdFromHref(href: string): string | null {
  const match = href.match(ANCHOR_HREF);
  return match ? match[1] : null;
}

/**
 * Smoothly scrolls to a same-page anchor, offset by the sticky header, and
 * updates the URL hash. Returns false when the href is not an anchor or the
 * target is missing, so the caller can let the browser navigate normally.
 */
export function scrollToAnchor(href: string): boolean {
  const id = anchorIdFromHref(href);
  if (!id || typeof document === "undefined") return false;
  const target = document.getElementById(id);
  if (!target) return false;

  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  const offset = header?.offsetHeight ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", href);
  return true;
}

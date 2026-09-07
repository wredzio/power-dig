"use client";

import { Camera, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { BRAND_ORANGE, withAlpha } from "./brand";
import { SectionHeader } from "./section-header";

export interface PowerDigGalleryImage {
  alt: string;
  caption?: string;
  category?: string;
  /** Grid thumbnail (rendered element, e.g. <SanityPicture />). */
  thumbnail: ReactNode;
  /** Large rendition shown in the lightbox. */
  full: ReactNode;
}

export interface PowerDigGalleryLabels {
  dialog: string;
  close: string;
  previous: string;
  next: string;
}

export interface PowerDigGalleryProps {
  id?: string;
  supra?: string;
  title: string;
  subtitle?: string;
  footnote?: string;
  images: PowerDigGalleryImage[];
  labels: PowerDigGalleryLabels;
}

export function PowerDigGallery({
  id = "galeria",
  supra,
  title,
  subtitle,
  footnote,
  images,
  labels,
}: PowerDigGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const count = images.length;

  const openAt = useCallback((index: number) => {
    setLoading(true);
    setOpenIndex(index);
  }, []);
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setLoading(true);
      setOpenIndex((i) => (i === null ? null : (i + delta + count) % count));
    },
    [count],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  return (
    <section id={id} className="px-6 py-24" style={{ backgroundColor: "var(--pd-bg-section)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader supra={supra} title={title} subtitle={subtitle} />

        {count === 0 ? (
          <div
            className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-sm border border-dashed px-8 py-14 text-center"
            style={{ borderColor: withAlpha(BRAND_ORANGE, "44") }}
          >
            <Camera size={32} color={BRAND_ORANGE} />
            {footnote && <p className="text-sm text-[var(--pd-text-dim)]">{footnote}</p>}
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => openAt(i)}
                  aria-label={image.caption || image.alt}
                  className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-sm border text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C87722]"
                  style={{
                    borderColor: withAlpha(BRAND_ORANGE, "33"),
                    backgroundColor: "var(--pd-bg-card)",
                  }}
                >
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_picture]:block [&_picture]:h-full">
                    {image.thumbnail}
                  </div>

                  <div
                    className="absolute top-3 right-3 h-4 w-4 rotate-45 opacity-70"
                    style={{
                      borderRight: `2px solid ${BRAND_ORANGE}`,
                      borderTop: `2px solid ${BRAND_ORANGE}`,
                    }}
                  />

                  {(image.caption || image.category) && (
                    <div
                      className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-3 px-4 py-3"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                      }}
                    >
                      {image.caption && (
                        <span className="text-sm font-semibold text-white">{image.caption}</span>
                      )}
                      {image.category && (
                        <span
                          className="shrink-0 rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                          style={{
                            backgroundColor: withAlpha(BRAND_ORANGE, "cc"),
                            color: "#0A0A0A",
                          }}
                        >
                          {image.category}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {count > 0 && footnote && (
          <p className="mt-6 text-center text-xs text-[var(--pd-text-dim)]">{footnote}</p>
        )}
      </div>

      {openIndex !== null && images[openIndex] && (
        <div
          className="fixed inset-0 z-[60] bg-black/92"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-20 rounded-sm p-2 text-white/70 transition-colors hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label={labels.close}
          >
            <X className="h-6 w-6" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-sm p-2 text-white/70 transition-colors hover:text-white md:left-4"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label={labels.previous}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-sm p-2 text-white/70 transition-colors hover:text-white md:right-4"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label={labels.next}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {loading && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-white/50" />
            </div>
          )}

          <figure
            className="flex h-full flex-col items-center justify-center gap-4 px-12 py-12 md:px-20"
            onClick={(e) => e.stopPropagation()}
            onLoadCapture={() => setLoading(false)}
          >
            <div
              className={cn(
                "flex max-h-[80vh] max-w-full items-center justify-center transition-opacity duration-300 [&_img]:max-h-[80vh] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain",
                loading ? "opacity-0" : "opacity-100",
              )}
            >
              {images[openIndex].full}
            </div>
            {(images[openIndex].caption || images[openIndex].category) && (
              <figcaption className="flex items-center gap-3 text-sm text-white/80">
                {images[openIndex].caption}
                {images[openIndex].category && (
                  <span
                    className="rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                    style={{ backgroundColor: withAlpha(BRAND_ORANGE, "cc"), color: "#0A0A0A" }}
                  >
                    {images[openIndex].category}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}

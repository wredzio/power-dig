import type { ReactNode } from "react";

import { BRAND_ORANGE, HEADING_FONT, withAlpha } from "./brand";
import { SectionHeader } from "./section-header";

export interface PowerDigAboutProps {
  id?: string;
  supra?: string;
  title: string;
  paragraphs: string[];
  stats: Array<{ value: string; label: string }>;
  ownerName?: string;
  ownerTitle?: string;
  /** Rendered portrait (e.g. <SanityPicture />). Falls back to a silhouette. */
  image?: ReactNode;
  photoPlaceholder?: string;
}

const PORTRAIT_WIDTH = 280;
const PORTRAIT_HEIGHT = 360;

export function PowerDigAbout({
  id = "o-nas",
  supra,
  title,
  paragraphs,
  stats,
  ownerName,
  ownerTitle,
  image,
  photoPlaceholder,
}: PowerDigAboutProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--pd-bg-section)" }}
    >
      <div
        className="pointer-events-none absolute top-0 -right-32 h-full w-64 opacity-5"
        style={{
          background: `linear-gradient(90deg, transparent, ${BRAND_ORANGE}, transparent)`,
          transform: "skewX(-15deg)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader supra={supra} title={title} align="left" className="mb-0" />

            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-relaxed text-[var(--pd-text)]/70 ${i < paragraphs.length - 1 ? "mb-4" : "mb-8"}`}
              >
                {paragraph}
              </p>
            ))}

            {stats.length > 0 && (
              <dl className="grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`} className="text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd
                      className="mb-1 text-3xl font-black"
                      style={{ color: BRAND_ORANGE, fontFamily: HEADING_FONT }}
                    >
                      {stat.value}
                    </dd>
                    <dd className="text-xs tracking-wider text-[var(--pd-text-dim)] uppercase">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-sm blur-3xl"
                style={{ backgroundColor: withAlpha(BRAND_ORANGE, "20") }}
              />
              <figure
                className="relative overflow-hidden rounded-sm border"
                style={{
                  borderColor: withAlpha(BRAND_ORANGE, "44"),
                  backgroundColor: "var(--pd-bg-card)",
                  width: PORTRAIT_WIDTH,
                  height: PORTRAIT_HEIGHT,
                }}
              >
                {image ? (
                  <div className="absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_picture]:block [&_picture]:h-full">
                    {image}
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ paddingBottom: 56 }}
                    aria-hidden="true"
                  >
                    <svg width="140" height="160" viewBox="0 0 140 160" fill="none">
                      <circle
                        cx="70"
                        cy="52"
                        r="32"
                        fill={withAlpha(BRAND_ORANGE, "18")}
                        stroke={withAlpha(BRAND_ORANGE, "44")}
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 160 C5 115 35 100 70 100 C105 100 135 115 135 160 Z"
                        fill={withAlpha(BRAND_ORANGE, "12")}
                        stroke={withAlpha(BRAND_ORANGE, "33")}
                        strokeWidth="1.5"
                      />
                    </svg>
                    {photoPlaceholder && (
                      <div className="mt-3 text-[10px] tracking-[0.2em] text-[var(--pd-text-dim)] uppercase">
                        {photoPlaceholder}
                      </div>
                    )}
                  </div>
                )}

                <div
                  className="absolute top-3 left-3"
                  style={{
                    width: 20,
                    height: 20,
                    borderTop: `2px solid ${withAlpha(BRAND_ORANGE, "66")}`,
                    borderLeft: `2px solid ${withAlpha(BRAND_ORANGE, "66")}`,
                  }}
                />
                <div
                  className="absolute top-3 right-3"
                  style={{
                    width: 20,
                    height: 20,
                    borderTop: `2px solid ${withAlpha(BRAND_ORANGE, "66")}`,
                    borderRight: `2px solid ${withAlpha(BRAND_ORANGE, "66")}`,
                  }}
                />

                {(ownerName || ownerTitle) && (
                  <figcaption
                    className="absolute right-0 bottom-0 left-0 p-4 text-center"
                    style={{
                      backgroundColor: image
                        ? "rgba(10,10,10,0.72)"
                        : withAlpha(BRAND_ORANGE, "18"),
                      borderTop: `1px solid ${withAlpha(BRAND_ORANGE, "33")}`,
                    }}
                  >
                    {ownerName && (
                      <div
                        className="text-sm font-black tracking-widest uppercase"
                        style={{ color: BRAND_ORANGE, fontFamily: HEADING_FONT }}
                      >
                        {ownerName}
                      </div>
                    )}
                    {ownerTitle && (
                      <div
                        className="mt-0.5 text-[10px] tracking-wider uppercase"
                        style={{ color: image ? "rgba(245,240,232,0.7)" : "var(--pd-text-dim)" }}
                      >
                        {ownerTitle}
                      </div>
                    )}
                  </figcaption>
                )}
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

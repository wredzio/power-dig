import { Phone, Shovel } from "lucide-react";

import { cn } from "@/lib/utils";

import { BRAND_ORANGE, HEADING_FONT, withAlpha } from "./brand";

export interface PowerDigMiniExcavatorProps {
  id?: string;
  supra?: string;
  /** Line breaks in the title are honoured. */
  title: string;
  paragraphs: string[];
  ctaLabel?: string;
  ctaHref?: string;
  featuresTitle?: string;
  features: string[];
  equipmentName?: string;
  equipmentSpecs?: string;
}

export function PowerDigMiniExcavator({
  id = "koparka",
  supra,
  title,
  paragraphs,
  ctaLabel,
  ctaHref,
  featuresTitle,
  features,
  equipmentName,
  equipmentSpecs,
}: PowerDigMiniExcavatorProps) {
  return (
    <section id={id} className="relative overflow-hidden px-6 py-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, var(--pd-bg) 45%, var(--pd-bg-accent) 50%, var(--pd-bg) 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-28"
        style={{ background: "linear-gradient(to bottom, var(--pd-bg-section), transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-28"
        style={{ background: "linear-gradient(to top, var(--pd-bg-section), transparent)" }}
      />
      <div
        className="absolute top-0 left-0 z-0 h-full w-1"
        style={{ backgroundColor: BRAND_ORANGE }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            {supra && (
              <p
                className="mb-4 inline-flex items-center gap-3 border-l-4 pl-4 text-sm font-bold tracking-[0.2em] uppercase"
                style={{ borderColor: BRAND_ORANGE, color: BRAND_ORANGE }}
              >
                <Shovel size={20} />
                {supra}
              </p>
            )}

            <h2
              className="mb-6 text-4xl leading-tight font-black whitespace-pre-line uppercase md:text-6xl"
              style={{ fontFamily: HEADING_FONT }}
            >
              {title}
            </h2>

            <div className="mb-6 h-[2px] w-16" style={{ backgroundColor: BRAND_ORANGE }} />

            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  "leading-relaxed text-[var(--pd-text)]/70",
                  i < paragraphs.length - 1 ? "mb-6" : "mb-8",
                )}
              >
                {paragraph}
              </p>
            ))}

            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                className={cn(
                  "inline-flex items-center justify-center gap-3 rounded-[6px] bg-[#C87722] px-6 py-3",
                  "text-sm font-bold tracking-widest text-[#0A0A0A] uppercase transition-all duration-300",
                  "hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(200,119,34,0.5)] hover:brightness-110 active:scale-[0.98]",
                )}
              >
                <Phone size={20} color="#0A0A0A" />
                {ctaLabel}
              </a>
            )}
          </div>

          <div
            className="rounded-sm border p-8"
            style={{
              borderColor: withAlpha(BRAND_ORANGE, "33"),
              backgroundColor: "var(--pd-bg-card)",
            }}
          >
            {featuresTitle && (
              <h3
                className="mb-6 text-sm font-bold tracking-[0.2em] uppercase"
                style={{ color: BRAND_ORANGE }}
              >
                {featuresTitle}
              </h3>
            )}
            {features.length > 0 && (
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-xs font-black"
                      style={{ backgroundColor: BRAND_ORANGE, color: "#0A0A0A" }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-[var(--pd-text-muted)]">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {(equipmentName || equipmentSpecs) && (
              <div
                className="mt-8 border-t pt-6"
                style={{ borderColor: withAlpha(BRAND_ORANGE, "22") }}
              >
                <div className="flex items-center gap-3">
                  <div>
                    {equipmentName && (
                      <div
                        className="text-xs font-bold tracking-wider uppercase"
                        style={{ color: BRAND_ORANGE }}
                      >
                        {equipmentName}
                      </div>
                    )}
                    {equipmentSpecs && (
                      <div className="text-xs text-[var(--pd-text-dim)]">{equipmentSpecs}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Award } from "lucide-react";
import type { ReactNode } from "react";

import { BRAND_ORANGE, HEADING_FONT, withAlpha } from "./brand";
import { SectionHeader } from "./section-header";

export interface PowerDigCertificate {
  title: string;
  issuer?: string;
  number?: string;
  /** Already formatted for the locale, e.g. "Ważny do: marzec 2028". */
  validUntilLabel?: string;
  description?: string;
  /** Optional scan / issuer logo (rendered element). */
  image?: ReactNode;
}

export interface PowerDigCertificatesProps {
  id?: string;
  supra?: string;
  title: string;
  subtitle?: string;
  footnote?: string;
  items: PowerDigCertificate[];
}

export function PowerDigCertificates({
  id = "certyfikaty",
  supra,
  title,
  subtitle,
  footnote,
  items,
}: PowerDigCertificatesProps) {
  return (
    <section id={id} className="px-6 py-24" style={{ backgroundColor: "var(--pd-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader supra={supra} title={title} subtitle={subtitle} />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={`${item.title}-${index}`}
              className="flex h-full flex-col rounded-sm border p-6 transition-colors duration-300 hover:border-[#C87722]/60"
              style={{
                borderColor: withAlpha(BRAND_ORANGE, "33"),
                backgroundColor: "var(--pd-bg-card)",
              }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm"
                  style={{ backgroundColor: withAlpha(BRAND_ORANGE, "18") }}
                >
                  <Award size={24} color={BRAND_ORANGE} />
                </div>
                {item.image && (
                  <div className="h-14 w-24 overflow-hidden rounded-sm [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_picture]:block [&_picture]:h-full">
                    {item.image}
                  </div>
                )}
              </div>

              <h3
                className="mb-2 text-lg leading-tight font-black uppercase"
                style={{ fontFamily: HEADING_FONT }}
              >
                {item.title}
              </h3>

              {(item.issuer || item.number) && (
                <p className="mb-3 text-xs tracking-wider text-[var(--pd-text-dim)] uppercase">
                  {[item.issuer, item.number].filter(Boolean).join(" · ")}
                </p>
              )}

              {item.description && (
                <p className="text-sm leading-relaxed text-[var(--pd-text-muted)]">
                  {item.description}
                </p>
              )}

              {item.validUntilLabel && (
                <p
                  className="mt-auto pt-4 text-[11px] font-bold tracking-wider uppercase"
                  style={{ color: BRAND_ORANGE }}
                >
                  {item.validUntilLabel}
                </p>
              )}
            </li>
          ))}
        </ul>

        {footnote && (
          <p className="mt-6 text-center text-xs text-[var(--pd-text-dim)]">{footnote}</p>
        )}
      </div>
    </section>
  );
}

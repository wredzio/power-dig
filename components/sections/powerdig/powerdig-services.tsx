import { Ban, Check } from "lucide-react";

import { ElectricBorder } from "@/components/ui/electric-border/electric-border";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon-name";

import { BRAND_ORANGE, HEADING_FONT, withAlpha } from "./brand";
import { SectionHeader } from "./section-header";

export interface PowerDigService {
  icon: IconName;
  tag?: string;
  title: string;
  description: string;
  details?: string[];
  note?: string;
}

export interface PowerDigServicesProps {
  id?: string;
  supra?: string;
  title: string;
  subtitle?: string;
  services: PowerDigService[];
}

export function PowerDigServices({
  id = "uslugi",
  supra,
  title,
  subtitle,
  services,
}: PowerDigServicesProps) {
  return (
    <section
      id={id}
      className="overflow-x-hidden px-6 py-24"
      style={{ backgroundColor: "var(--pd-bg)" }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader supra={supra} title={title} subtitle={subtitle} />

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={`${service.title}-${index}`} className="h-full">
              <ElectricBorder
                color={BRAND_ORANGE}
                chaos={0.14}
                speed={1.1}
                borderRadius={4}
                className="h-full"
              >
                <article
                  className="flex h-full flex-col p-6"
                  style={{ backgroundColor: "var(--pd-bg-card)", borderRadius: 4 }}
                >
                  {service.tag && (
                    <span
                      className="mb-5 self-start rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                      style={{
                        backgroundColor: withAlpha(BRAND_ORANGE, "22"),
                        color: BRAND_ORANGE,
                      }}
                    >
                      {service.tag}
                    </span>
                  )}

                  <div className="mb-4">
                    <Icon name={service.icon} size={32} color={BRAND_ORANGE} />
                  </div>

                  <h3
                    className="mb-3 text-lg leading-tight font-black uppercase"
                    style={{ fontFamily: HEADING_FONT }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--pd-text-muted)]">
                    {service.description}
                  </p>

                  {service.details && service.details.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-xs text-[var(--pd-text-muted)]"
                        >
                          <Check size={14} color={BRAND_ORANGE} className="mt-0.5 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.note && (
                    <p
                      className="mt-auto flex items-center gap-2 pt-4 text-[11px] font-bold tracking-wider uppercase"
                      style={{ color: BRAND_ORANGE }}
                    >
                      <Ban size={14} className="shrink-0" />
                      <span>{service.note}</span>
                    </p>
                  )}
                </article>
              </ElectricBorder>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

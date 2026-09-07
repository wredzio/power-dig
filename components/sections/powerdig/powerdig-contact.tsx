import { Mail, Phone } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon-name";

import { BRAND_ORANGE, HEADING_FONT, withAlpha } from "./brand";
import { SectionHeader } from "./section-header";

export interface PowerDigContactCard {
  icon: IconName;
  title: string;
  value: string;
}

export interface PowerDigContactProps {
  id?: string;
  supra?: string;
  title: string;
  phoneHref: string;
  phoneLabel: string;
  email?: string;
  callNowLabel: string;
  cards: PowerDigContactCard[];
}

export function PowerDigContact({
  id = "kontakt",
  supra,
  title,
  phoneHref,
  phoneLabel,
  email,
  callNowLabel,
  cards,
}: PowerDigContactProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--pd-bg)" }}
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionHeader
          supra={supra}
          title={title}
          className="mb-0"
          titleClassName="mb-4 md:text-6xl"
          dividerClassName="mb-12 mt-0"
        />

        <a href={phoneHref} className="group mb-10 block transition-transform hover:scale-105">
          <div
            className="mb-2 text-6xl font-black tracking-tight md:text-8xl"
            style={{
              color: BRAND_ORANGE,
              fontFamily: HEADING_FONT,
              textShadow: `0 0 60px ${withAlpha(BRAND_ORANGE, "66")}`,
            }}
          >
            {phoneLabel}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--pd-text-dim)] transition-colors group-hover:text-[var(--pd-text)]/80">
            <Phone size={18} color={BRAND_ORANGE} />
            {callNowLabel}
          </div>
        </a>

        {email && (
          <a
            href={`mailto:${email}`}
            className="group mb-12 flex items-center justify-center gap-3 text-lg text-[var(--pd-text)]/70 transition-colors hover:text-[var(--pd-text)]"
          >
            <Mail size={22} color={BRAND_ORANGE} />
            <span className="border-b border-[var(--pd-text-dim)] pb-0.5 transition-colors group-hover:border-[var(--pd-text-muted)]">
              {email}
            </span>
          </a>
        )}

        {cards.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            {cards.map((card) => (
              <li
                key={card.title}
                className="rounded-sm border p-5"
                style={{
                  borderColor: withAlpha(BRAND_ORANGE, "33"),
                  backgroundColor: "var(--pd-bg-card)",
                }}
              >
                <div className="mb-3">
                  <Icon name={card.icon} size={24} color={BRAND_ORANGE} />
                </div>
                <div
                  className="mb-1 text-xs font-bold tracking-wider uppercase"
                  style={{ color: BRAND_ORANGE }}
                >
                  {card.title}
                </div>
                <div className="text-sm text-[var(--pd-text-muted)]">{card.value}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

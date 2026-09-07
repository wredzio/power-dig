"use client";

import { ChevronDown, Phone } from "lucide-react";
import dynamic from "next/dynamic";

import { LogoMark } from "@/components/ui/logo/logo-mark";
import { ShinyText } from "@/components/ui/shiny-text/shiny-text";
import { scrollToAnchor } from "@/lib/scroll-to-anchor";
import { cn } from "@/lib/utils";

import { BRAND_GOLD, BRAND_ORANGE, BRAND_SHINE, HEADING_FONT, withAlpha } from "./brand";

// The WebGL background is client-only and not needed for first paint, so it
// is code-split and mounted after hydration.
const Lightning = dynamic(
  () => import("@/components/ui/lightning/lightning").then((m) => m.Lightning),
  { ssr: false },
);

// Two bolts, same parameters as the original two stacked canvases
// (opacity-55 and opacity-40), now rendered in one pass.
const HERO_BOLTS = [
  { hue: 30, xOffset: -0.7, speed: 0.2, intensity: 0.9, size: 0.8, opacity: 0.55 },
  { hue: 28, xOffset: 0.7, speed: 0.15, intensity: 0.7, size: 1.0, opacity: 0.4 },
];

export interface PowerDigHeroProps {
  id?: string;
  ownerName: string;
  ownerTitle?: string;
  title: string;
  tagline?: string;
  serviceTags: string[];
  ctaPhoneHref: string;
  ctaPhoneLabel: string;
  ctaServicesLabel: string;
  ctaServicesHref: string;
}

function splitTitle(title: string): [string, string] {
  const [first = "", ...rest] = title.trim().split(/\s+/);
  return [first, rest.join(" ")];
}

export function PowerDigHero({
  id = "hero",
  ownerName,
  ownerTitle,
  title,
  tagline,
  serviceTags,
  ctaPhoneHref,
  ctaPhoneLabel,
  ctaServicesLabel,
  ctaServicesHref,
}: PowerDigHeroProps) {
  const [titleTop, titleBottom] = splitTitle(title);

  return (
    <section
      id={id}
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-hidden md:min-h-[calc(100dvh-5.5rem)]"
      style={{ backgroundColor: "var(--pd-bg)" }}
    >
      <div className="absolute inset-0 z-0">
        <Lightning bolts={HERO_BOLTS} />
      </div>

      <div className="pd-hero-vignette absolute inset-0 z-10" />

      <div
        className="absolute right-0 bottom-0 left-0 z-20 h-24"
        style={{ background: "linear-gradient(to bottom, transparent, var(--pd-bg))" }}
      />

      <div className="relative z-30 flex flex-col items-center px-6 text-center">
        <div className="mb-8 flex items-center gap-4">
          <LogoMark size={64} />
          <div className="text-left">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: BRAND_ORANGE, fontFamily: HEADING_FONT }}
            >
              {ownerName}
            </p>
            {ownerTitle && (
              <p className="text-xs tracking-[0.35em] text-[var(--pd-text-muted)] uppercase">
                {ownerTitle}
              </p>
            )}
          </div>
        </div>

        <h1
          className="mb-4 text-6xl font-black tracking-tight uppercase md:text-8xl"
          style={{ fontFamily: HEADING_FONT }}
        >
          <ShinyText
            text={titleTop}
            color={BRAND_ORANGE}
            shineColor={BRAND_SHINE}
            speed={3.5}
            spread={100}
            className="leading-none"
          />
          {titleBottom && (
            <>
              <br />
              <ShinyText
                text={titleBottom}
                color={BRAND_GOLD}
                shineColor="#FFFFFF"
                speed={4}
                spread={110}
                className="text-5xl leading-none md:text-7xl"
              />
            </>
          )}
        </h1>

        {tagline && (
          <p className="mb-2 max-w-xl text-lg font-light text-[var(--pd-text-muted)] md:text-xl">
            {tagline}
          </p>
        )}

        {serviceTags.length > 0 && (
          <ul className="mb-10 flex flex-wrap items-center justify-center gap-2 text-sm">
            {serviceTags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
                style={{
                  borderColor: withAlpha(BRAND_ORANGE, "66"),
                  color: BRAND_ORANGE,
                  backgroundColor: withAlpha(BRAND_ORANGE, "15"),
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={ctaPhoneHref}
            className={cn(
              "flex items-center justify-center gap-3 rounded-[6px] px-8 py-4 text-sm font-bold tracking-widest text-[#0A0A0A] uppercase",
              "bg-[#C87722] transition-all duration-300",
              "hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(200,119,34,0.55)] hover:brightness-110 active:scale-[0.98]",
            )}
          >
            <Phone size={20} color="#0A0A0A" />
            <span>{ctaPhoneLabel}</span>
          </a>
          <a
            href={ctaServicesHref}
            onClick={(e) => {
              if (scrollToAnchor(ctaServicesHref)) e.preventDefault();
            }}
            className={cn(
              "group flex items-center justify-center gap-3 rounded-[6px] border px-8 py-4 text-sm font-bold tracking-widest uppercase",
              "border-[#C87722]/55 text-[var(--pd-text)] transition-all duration-300",
              "hover:border-[#C87722] hover:bg-[#C87722] hover:text-[#0A0A0A] active:scale-[0.98]",
            )}
          >
            <ChevronDown
              size={18}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
            <span>{ctaServicesLabel}</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 animate-bounce flex-col items-center gap-1 opacity-60">
        <ChevronDown size={20} color={BRAND_ORANGE} />
      </div>
    </section>
  );
}

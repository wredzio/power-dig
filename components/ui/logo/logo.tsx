import Image from "next/image";

import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoVariant = "full" | "compact";

interface LogoProps {
  /** `full` includes the owner name (hero); `compact` omits it (header, footer). */
  variant?: LogoVariant;
  /** Controls the height (e.g. "h-12 md:h-14"); width follows the logo's aspect ratio. */
  className?: string;
  priority?: boolean;
}

// Intrinsic size of the SVG viewBox, keeps the aspect ratio before load.
const LOGO_WIDTH = 1240;
const LOGO_HEIGHT = 757;

const SOURCES: Record<LogoVariant, { dark: string; light: string; alt: string }> = {
  full: { dark: "/brand/logo-dark.svg", light: "/brand/logo-light.svg", alt: SITE.name },
  compact: {
    dark: "/brand/logo-compact-dark.svg",
    light: "/brand/logo-compact-light.svg",
    alt: SITE.shortName,
  },
};

/**
 * PowerDig Serwis logo. Two static SVGs per variant: the dark-theme file has
 * a light "SERWIS", the light-theme one the original black. The `.light`
 * class on <html> decides which one is shown.
 */
export function Logo({ variant = "compact", className, priority = false }: LogoProps) {
  const source = SOURCES[variant];
  const imageClass = "h-full w-auto";
  return (
    <span className={cn("block", className)}>
      <Image
        src={source.dark}
        alt={source.alt}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        unoptimized
        className={cn(imageClass, "[.light_&]:hidden")}
      />
      <Image
        src={source.light}
        alt=""
        aria-hidden="true"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        unoptimized
        className={cn(imageClass, "hidden [.light_&]:block")}
      />
    </span>
  );
}

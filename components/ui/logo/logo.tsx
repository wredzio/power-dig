import Image from "next/image";

import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Controls the height (e.g. "h-12 md:h-14"); width follows the logo's aspect ratio. */
  className?: string;
  priority?: boolean;
}

// Intrinsic size of the SVG viewBox, keeps the aspect ratio before load.
const LOGO_WIDTH = 1240;
const LOGO_HEIGHT = 757;

/**
 * Full PowerDig Serwis logo. Two static SVGs: the dark-theme variant has a
 * light "SERWIS", the light-theme one the original black. The `.light` class
 * on <html> decides which one is shown.
 */
export function Logo({ className, priority = false }: LogoProps) {
  const imageClass = "h-full w-auto";
  return (
    <span className={cn("block", className)}>
      <Image
        src="/brand/logo-dark.svg"
        alt={SITE.name}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        unoptimized
        className={cn(imageClass, "[.light_&]:hidden")}
      />
      <Image
        src="/brand/logo-light.svg"
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

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
}

/**
 * Gradient "shine" sweeping across text. Pure CSS animation (see
 * `.pd-shiny` in globals.css) – no per-frame JavaScript, and it pauses
 * automatically for `prefers-reduced-motion`.
 */
export function ShinyText({
  text,
  speed = 2,
  className,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
}: ShinyTextProps) {
  const style: CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    animationDuration: `${speed}s`,
  };

  return (
    <span className={cn("pd-shiny inline-block", className)} style={style}>
      {text}
    </span>
  );
}

import type React from "react";

import { cn } from "@/lib/utils";

export interface DividerSectionProps {
  style: "tartan" | "solid" | "line";
  image?: React.ReactNode;
  height: "sm" | "md" | "lg";
}

const heightClass = {
  sm: "h-10",
  md: "h-20",
  lg: "h-[120px]",
} as const;

export function DividerSection({ style, image, height }: DividerSectionProps) {
  const h = heightClass[height] ?? "h-20";

  if (style === "line") {
    return (
      <hr
        className={cn(
          "border-border w-full",
          h === "h-10" ? "my-5" : h === "h-20" ? "my-10" : "my-[60px]",
        )}
      />
    );
  }

  if (style === "solid") {
    return <div className={cn("bg-muted w-full", h)} />;
  }

  // tartan
  if (image) {
    return <div className={cn("w-full overflow-hidden", h)}>{image}</div>;
  }

  return <div className={cn("tartan-pattern w-full", h)} />;
}

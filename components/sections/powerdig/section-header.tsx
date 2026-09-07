import { cn } from "@/lib/utils";

import { BRAND_ORANGE, HEADING_FONT } from "./brand";

interface SectionHeaderProps {
  supra?: string | null;
  title: string;
  subtitle?: string | null;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  dividerClassName?: string;
}

export function SectionHeader({
  supra,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  dividerClassName,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={cn(centered ? "mb-16 text-center" : "mb-8", className)}>
      {supra && (
        <p
          className="mb-3 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: BRAND_ORANGE }}
        >
          {supra}
        </p>
      )}
      <h2
        className={cn(
          "text-4xl font-black uppercase md:text-5xl",
          !centered && "mb-6 leading-tight",
          titleClassName,
        )}
        style={{ fontFamily: HEADING_FONT }}
      >
        {title}
      </h2>
      <div
        className={cn("h-[2px] w-16", centered ? "mx-auto mt-4" : "mb-6", dividerClassName)}
        style={{ backgroundColor: BRAND_ORANGE }}
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-md text-sm text-[var(--pd-text-dim)]",
            centered ? "mx-auto" : "max-w-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

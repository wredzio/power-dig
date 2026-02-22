"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOCALES = ["pl", "en"] as const;

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      {LOCALES.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-border select-none">/</span>}
          {loc === locale ? (
            <span className="text-secondary">{loc.toUpperCase()}</span>
          ) : (
            <Link
              href={pathname}
              locale={loc}
              className={cn(
                "text-foreground transition-colors duration-200",
                "hover:text-secondary",
                "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
              )}
            >
              {loc.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

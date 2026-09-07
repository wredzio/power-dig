import { cn } from "@/lib/utils";

import { LogoMark } from "./logo-mark";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark size={36} />
      <span
        className="text-base font-black tracking-tight text-[#C87722] uppercase"
        style={{ fontFamily: "var(--font-lato)" }}
      >
        Power<span className="text-foreground">Dig</span>
      </span>
    </div>
  );
}

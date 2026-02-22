import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 22L24 6L42 22V44H28V32H20V44H6V22Z"
          stroke="#C87722"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M22 14L16 24H21L19 34L30 22H25L22 14Z"
          fill="#C87722"
          stroke="#C87722"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-base font-black uppercase tracking-tight text-[#C87722]"
        style={{ fontFamily: "var(--font-lato)" }}
      >
        Power<span className="text-foreground">Dig</span>
      </span>
    </div>
  );
}

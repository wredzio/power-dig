import { LOGO_MARK } from "./logo-mark-paths";

interface LogoMarkProps {
  /** Rendered height in px; width follows the mark's aspect ratio. */
  size?: number;
  className?: string;
}

const GRADIENT_ID = "pd-logo-mark-gradient";

/**
 * Brand mark: the lightning-bolt "P" from the PowerDig logo (vector paths
 * extracted from the source PDF, see logo-mark-paths.ts).
 */
export function LogoMark({ size = 36, className }: LogoMarkProps) {
  const [, , viewWidth, viewHeight] = LOGO_MARK.viewBox.split(" ").map(Number);
  const width = Math.round((size * viewWidth) / viewHeight);

  return (
    <svg
      width={width}
      height={size}
      viewBox={LOGO_MARK.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          gradientUnits="userSpaceOnUse"
          x1={LOGO_MARK.gradient.x1}
          y1="0"
          x2={LOGO_MARK.gradient.x2}
          y2="0"
        >
          <stop offset="0" stopColor={LOGO_MARK.gradient.from} />
          <stop offset="1" stopColor={LOGO_MARK.gradient.to} />
        </linearGradient>
      </defs>
      <path d={LOGO_MARK.bolt} fill={`url(#${GRADIENT_ID})`} />
      <path d={LOGO_MARK.bowl} fill={`url(#${GRADIENT_ID})`} />
    </svg>
  );
}

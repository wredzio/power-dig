interface LogoMarkProps {
  size?: number;
  className?: string;
  color?: string;
}

const DEFAULT_COLOR = "#C87722";

/**
 * Brand mark (house + lightning bolt). Single source for the header,
 * hero and Open Graph image so a logo swap happens in one place.
 */
export function LogoMark({ size = 36, className, color = DEFAULT_COLOR }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 22L24 6L42 22V44H28V32H20V44H6V22Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M22 14L16 24H21L19 34L30 22H25L22 14Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

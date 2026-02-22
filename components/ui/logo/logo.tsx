import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo.webp"
      alt="u Szkota"
      width={200}
      height={200}
      className={cn("h-14 w-14 object-contain", className)}
      priority
    />
  );
}

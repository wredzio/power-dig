import { getImageProps } from "next/image";

import { cn } from "@/lib/utils";

import { type AspectRatio, computeHeight } from "./aspect-ratio";
import { createSanityLoader } from "./sanity-image-loader";

interface SanityImageSource {
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string | null;
    metadata?: {
      lqip?: string | null;
      dimensions?: { width?: number; height?: number } | null;
    } | null;
  } | null;
  hotspot?: { x?: number; y?: number; width?: number; height?: number };
  crop?: { top?: number; bottom?: number; left?: number; right?: number };
  alt?: string;
  [key: string]: unknown;
}

interface SanityImageProps {
  image: SanityImageSource;
  alt: string;
  width: number;
  aspectRatio: AspectRatio;
  quality?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function SanityImage({
  image,
  alt,
  width,
  aspectRatio,
  quality,
  priority = false,
  className,
  sizes,
}: SanityImageProps) {
  if (!image?.asset) return null;

  const loader = createSanityLoader(image, aspectRatio);
  const height = computeHeight(width, aspectRatio);
  const blurDataURL = image.asset.metadata?.lqip;

  const { props } = getImageProps({
    src: image.asset.url || image.asset._id || "",
    alt,
    width,
    height,
    loader,
    quality,
    priority,
    sizes,
    ...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {}),
  });

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} className={cn(className)} />
  );
}

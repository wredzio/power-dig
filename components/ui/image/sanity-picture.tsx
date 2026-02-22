import { getImageProps } from "next/image";

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

export interface BreakpointConfig {
  media: string;
  width: number;
  aspectRatio: AspectRatio;
  quality?: number;
}

interface SanityPictureProps {
  image: SanityImageSource;
  alt: string;
  breakpoints: BreakpointConfig[];
  fallbackWidth: number;
  fallbackAspectRatio: AspectRatio;
  blurDataURL?: string;
  priority?: boolean;
  className?: string;
}

export function SanityPicture({
  image,
  alt,
  breakpoints,
  fallbackWidth,
  fallbackAspectRatio,
  blurDataURL,
  priority = false,
  className,
}: SanityPictureProps) {
  if (!image?.asset) return null;

  const sources = breakpoints.map((bp) => {
    const loader = createSanityLoader(image, bp.aspectRatio);
    const height = computeHeight(bp.width, bp.aspectRatio);

    const { props } = getImageProps({
      src: image.asset!.url || image.asset!._id || "",
      alt,
      width: bp.width,
      height,
      loader,
      quality: bp.quality,
    });

    return {
      media: bp.media,
      srcSet: props.srcSet || props.src,
    };
  });

  const fallbackLoader = createSanityLoader(image, fallbackAspectRatio);
  const fallbackHeight = computeHeight(fallbackWidth, fallbackAspectRatio);

  const { props: fallbackProps } = getImageProps({
    src: image.asset.url || image.asset._id || "",
    alt,
    width: fallbackWidth,
    height: fallbackHeight,
    loader: fallbackLoader,
    priority,
    ...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {}),
  });

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.media} media={source.media} srcSet={source.srcSet} />
      ))}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...fallbackProps} className={className} />
    </picture>
  );
}

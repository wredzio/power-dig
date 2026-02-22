import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/sanity.api";

import { type AspectRatio, computeHeight } from "./aspect-ratio";

const builder = createImageUrlBuilder({ projectId, dataset });

interface SanityImageSource {
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string | null;
  } | null;
  hotspot?: { x?: number; y?: number; width?: number; height?: number };
  crop?: { top?: number; bottom?: number; left?: number; right?: number };
  _type?: string;
  [key: string]: unknown;
}

export function createSanityLoader(source: SanityImageSource, aspectRatio?: AspectRatio) {
  return function sanityLoader({ width, quality }: { width: number; quality?: number }) {
    let img = builder
      .image(source)
      .width(width)
      .quality(quality || 75)
      .auto("format");

    if (aspectRatio) {
      const height = computeHeight(width, aspectRatio);
      img = img.height(height).fit("crop");
    }

    return img.url();
  };
}

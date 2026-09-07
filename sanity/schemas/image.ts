import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../sanity.api";

const builder = createImageUrlBuilder({ projectId, dataset });

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

interface ImageWithAsset {
  asset?: { _ref?: string; _id?: string } | null;
}

function hasAsset(source: unknown): source is SanityImageSource {
  if (!source) return false;
  if (typeof source === "string") return true;
  const asset = (source as ImageWithAsset).asset;
  return Boolean(asset?._ref || asset?._id);
}

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!hasAsset(source)) return null;

  return {
    src: builder.image(source).auto("format").width(800).url(),
    width: 800,
    height: 600,
  };
}

/** 1200×630 crop for Open Graph / Twitter cards, respecting hotspot. */
export function urlForOgImage(source: SanityImageSource | undefined | null): string | null {
  if (!hasAsset(source)) return null;
  return builder.image(source).width(OG_WIDTH).height(OG_HEIGHT).fit("crop").auto("format").url();
}

/** Plain URL for JSON-LD `logo`/`image` (max 512px wide). */
export function urlForLogo(source: SanityImageSource | undefined | null): string | null {
  if (!hasAsset(source)) return null;
  return builder.image(source).width(512).auto("format").url();
}

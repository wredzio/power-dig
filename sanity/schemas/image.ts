import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../sanity.api";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source) return null;

  return {
    src: builder.image(source).auto("format").width(800).url(),
    width: 800,
    height: 600,
  };
}

import { getTranslations } from "next-intl/server";

import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigGallery } from "@/components/sections/powerdig/powerdig-gallery";
import { SanityImage } from "@/components/ui/image/sanity-image";
import { SanityPicture } from "@/components/ui/image/sanity-picture";

type Props = PageSectionItem<"gallerySection">;

const THUMB_DESKTOP_WIDTH = 480;
const THUMB_MOBILE_WIDTH = 720;
const FULL_WIDTH = 1600;

export async function SanityGallerySection(section: Props) {
  const t = await getTranslations("gallery");

  const images = (section.images ?? [])
    .filter((item) => item.image?.asset)
    .map((item) => {
      const image = item.image!;
      const dimensions = image.asset?.metadata?.dimensions;
      const naturalRatio =
        dimensions?.width && dimensions?.height
          ? { width: dimensions.width, height: dimensions.height }
          : ("4/3" as const);
      const alt = item.alt || item.caption || "";

      return {
        alt,
        caption: item.caption ?? undefined,
        category: item.category ?? undefined,
        thumbnail: (
          <SanityPicture
            image={image}
            alt={alt}
            breakpoints={[
              { media: "(min-width: 1024px)", width: THUMB_DESKTOP_WIDTH, aspectRatio: "4/3" },
            ]}
            fallbackWidth={THUMB_MOBILE_WIDTH}
            fallbackAspectRatio="4/3"
            blurDataURL={image.asset?.metadata?.lqip ?? undefined}
          />
        ),
        full: (
          <SanityImage
            image={image}
            alt={alt}
            width={FULL_WIDTH}
            aspectRatio={naturalRatio}
            quality={85}
            sizes="100vw"
          />
        ),
      };
    });

  return (
    <PowerDigGallery
      id={section.id ?? undefined}
      supra={section.supra ?? undefined}
      title={section.title ?? ""}
      subtitle={section.subtitle ?? undefined}
      footnote={section.footnote ?? undefined}
      images={images}
      labels={{
        dialog: t("dialog"),
        close: t("close"),
        previous: t("previous"),
        next: t("next"),
      }}
    />
  );
}

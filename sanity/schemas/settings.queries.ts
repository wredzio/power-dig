import { defineQuery } from "next-sanity";

export const navigationQuery =
  defineQuery(`*[_type == "settings" && (language == $language || !defined(language))][0]{
  _id,
  navigation{
    navigationLinks[]{
      label,
      href,
      external,
      order
    } | order(order asc)
  }
}`);

export const settingsQuery = defineQuery(`
  *[_type == "settings" && (language == $language || !defined(language))][0] {
    _id,
    title,
    description,
    keywords,
    url,
    phone,
    address,
    mail,
    social,
    tagline,
    openingHours[]{
      _key,
      days,
      time
    },
    footerNavLinks[]{
      _key,
      label,
      href
    },
    footerNavLegalLinks[]{
      _key,
      label,
      href
    },
    footerGalleryImages[]{
      _key,
      image{
        ...,
        asset->{ _id, url, metadata{ lqip, dimensions } }
      },
      aspectRatio
    }
  }
`);

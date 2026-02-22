import { defineQuery } from "next-sanity";

export const pageQuery =
  defineQuery(`*[_type == "page" && slug.current == $slug && (language == $language || !defined(language))][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  metadata{
    metaTitle,
    metaDescription,
    keywords,
    ogImage{
      ...,
      asset->
    },
    noIndex
  },
  sections[]{
    _key,
    _type,
    ...,
    // Hero section - background image with metadata
    backgroundImage{
      ...,
      asset->{ _id, url, metadata { lqip, dimensions } }
    },
    // About section - features
    features[]{
      ...,
    },
    // FAQ section - items
    items[]{
      ...,
    },
    // Image section - responsive image with metadata
    image{
      ...,
      image{
        ...,
        asset->{ _id, url, metadata { lqip, dimensions } }
      },
      aspectRatio
    },
    // Rich text body
    body[]{
      ...,
      _type == 'image' => {
        ...,
        asset->{ _id, url, metadata { lqip, dimensions } }
      }
    },
    // Divider section - optional pattern/texture image
    _type == 'dividerSection' => {
      image{
        ...,
        asset->{ _id, url, metadata { lqip, dimensions } }
      }
    },
  }
}`);

export const allPagesQuery =
  defineQuery(`*[_type == "page" && (language == $language || !defined(language))]{
  _id,
  title,
  slug
}`);

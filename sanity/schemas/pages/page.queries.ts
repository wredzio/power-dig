import { defineQuery } from "next-sanity";

const IMAGE_ASSET = `asset->{ _id, url, metadata { lqip, dimensions } }`;

export const pageQuery =
  defineQuery(`*[_type == "page" && slug.current == $slug && (language == $language || !defined(language))][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  language,
  metadata{
    metaTitle,
    metaDescription,
    keywords,
    ogImage{
      ...,
      ${IMAGE_ASSET}
    },
    noIndex
  },
  sections[]{
    _key,
    _type,
    _type == "heroSection" => {
      id,
      supra,
      subtitle,
      title,
      description,
      tags,
      ctaLabel,
      ctaHref,
    },
    _type == "servicesSection" => {
      id,
      supra,
      title,
      subtitle,
      services[]{
        _key,
        icon,
        tag,
        title,
        description,
        details,
        note,
      },
    },
    _type == "aboutSection" => {
      id,
      supra,
      title,
      description,
      features[]{ _key, title, description },
      image{
        ...,
        ${IMAGE_ASSET}
      },
      ownerName,
      ownerTitle,
      imagePlaceholder,
    },
    _type == "miniExcavatorSection" => {
      id,
      supra,
      title,
      description,
      description2,
      ctaLabel,
      ctaHref,
      featuresTitle,
      features,
      equipmentName,
      equipmentSpecs,
    },
    _type == "certificatesSection" => {
      id,
      supra,
      title,
      subtitle,
      items[]{
        _key,
        title,
        issuer,
        number,
        validUntil,
        description,
        image{
          ...,
          ${IMAGE_ASSET}
        },
      },
      footnote,
    },
    _type == "gallerySection" => {
      id,
      supra,
      title,
      subtitle,
      images[]{
        _key,
        alt,
        caption,
        category,
        image{
          ...,
          ${IMAGE_ASSET}
        },
      },
      footnote,
    },
    _type == "faqSection" => {
      id,
      supra,
      title,
      subtitle,
      items[]{ _key, question, answer },
    },
    _type == "contactSection" => {
      id,
      subtitle,
      title,
      phone,
      email,
      address,
      hours[]{ _key, icon, days, time },
    },
    _type == "imageSection" => {
      ...,
      image{
        ...,
        image{
          ...,
          ${IMAGE_ASSET}
        },
        aspectRatio
      },
      body[]{
        ...,
        _type == "image" => {
          ...,
          ${IMAGE_ASSET}
        }
      },
    },
    _type == "subheadingSection" => {
      ...,
    },
    _type == "dividerSection" => {
      ...,
      image{
        ...,
        ${IMAGE_ASSET}
      },
    },
  }
}`);

export const allPagesQuery =
  defineQuery(`*[_type == "page" && (language == $language || !defined(language))]{
  _id,
  title,
  slug
}`);

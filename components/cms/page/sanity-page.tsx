import React from "react";

import type { PageQueryResult } from "@/components/cms/sanity-types";

import { SanityAboutSection } from "./components/sanity-about-section";
import { SanityContactSection } from "./components/sanity-contact-section";
import { SanityDividerSection } from "./components/sanity-divider-section";
import { SanityFaqSection } from "./components/sanity-faq-section";
import { SanityHeroSection } from "./components/sanity-hero-section";
import { SanityImageSection } from "./components/sanity-image-section";
import { SanitySubheadingSection } from "./components/sanity-subheading-section";

type ConfigQueryResultNotNullable = NonNullable<PageQueryResult>;
export type PageSections = NonNullable<ConfigQueryResultNotNullable["sections"]>[number];
type PageSectionType = PageSections["_type"];

export type PageSectionItem<T extends PageSectionType> = Extract<PageSections, { _type: T }>;

type SanityPageComponents = {
  [key in PageSectionType]: (props: PageSectionItem<key>) => React.ReactNode;
};

export const sanityPageComponents = {
  heroSection: SanityHeroSection,
  aboutSection: SanityAboutSection,
  faqSection: SanityFaqSection,
  contactSection: SanityContactSection,
  imageSection: SanityImageSection,
  subheadingSection: SanitySubheadingSection,
  dividerSection: SanityDividerSection,
} satisfies SanityPageComponents;

import { responsiveImage } from "./objects/responsive-image";
import { pageType } from "./pages/page";
import { aboutSection } from "./sections/about-section";
import { blockContentSection } from "./sections/block-content-section";
import { contactSection } from "./sections/contact-section";
import { dividerSection } from "./sections/divider-section";
import { faqSection } from "./sections/faq-section";
import { heroSection } from "./sections/hero-section";
import { imageSection } from "./sections/image-section";
import { subheadingSection } from "./sections/subheading-section";
import { settingsType } from "./settings";

export const schemaTypes = [
  settingsType,
  pageType,
  responsiveImage,
  blockContentSection,
  heroSection,
  aboutSection,
  faqSection,
  contactSection,
  imageSection,
  subheadingSection,
  dividerSection,
];

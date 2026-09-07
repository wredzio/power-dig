import { responsiveImage } from "./objects/responsive-image";
import { pageType } from "./pages/page";
import { aboutSection } from "./sections/about-section";
import { blockContentSection } from "./sections/block-content-section";
import { certificatesSection } from "./sections/certificates-section";
import { contactSection } from "./sections/contact-section";
import { faqSection } from "./sections/faq-section";
import { gallerySection } from "./sections/gallery-section";
import { heroSection } from "./sections/hero-section";
import { imageSection } from "./sections/image-section";
import { miniExcavatorSection } from "./sections/mini-excavator-section";
import { servicesSection } from "./sections/services-section";
import { subheadingSection } from "./sections/subheading-section";
import { settingsType } from "./settings";

export const schemaTypes = [
  settingsType,
  pageType,
  responsiveImage,
  blockContentSection,
  heroSection,
  servicesSection,
  aboutSection,
  miniExcavatorSection,
  certificatesSection,
  gallerySection,
  faqSection,
  contactSection,
  imageSection,
  subheadingSection,
];

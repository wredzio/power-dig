/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const config = {
  siteUrl,
  generateRobotsTxt: false,
  exclude: ["/studio", "/studio/**"],
  alternateRefs: [
    { href: `${siteUrl}/pl`, hreflang: "pl" },
    { href: `${siteUrl}/en`, hreflang: "en" },
  ],
};

export default config;

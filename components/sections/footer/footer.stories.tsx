import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FooterSection } from "./footer";

const meta = {
  title: "Sections/Footer",
  component: FooterSection,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contact: {
      phone: "+48 123 456 789",
      address: "ul. Przykładowa 1, 00-001 Warszawa",
      email: "kontakt@example.com",
    },
    socialLinks: [
      { platform: "Facebook", url: "https://facebook.com", icon: "Facebook" },
      { platform: "Instagram", url: "https://instagram.com", icon: "Instagram" },
    ],
  },
};

export const WithNavLinks: Story = {
  args: {
    contact: {
      phone: "+48 123 456 789",
      address: "ul. Przykładowa 1, 00-001 Warszawa",
      email: "kontakt@example.com",
    },
    socialLinks: [
      { platform: "Facebook", url: "https://facebook.com", icon: "Facebook" },
      { platform: "Instagram", url: "https://instagram.com", icon: "Instagram" },
    ],
    tagline: "Tagline for your brand",
    footerNavLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    footerNavLegalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
};

export const WithTaglineOnly: Story = {
  args: {
    contact: {
      phone: "+48 123 456 789",
      address: "ul. Przykładowa 1, 00-001 Warszawa",
      email: "kontakt@example.com",
    },
    tagline: "Your brand tagline",
    socialLinks: [{ platform: "Facebook", url: "https://facebook.com", icon: "Facebook" }],
  },
};

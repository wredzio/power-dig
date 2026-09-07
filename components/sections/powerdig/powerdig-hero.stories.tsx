import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigHero } from "./powerdig-hero";

const meta = {
  title: "PowerDig/Hero",
  component: PowerDigHero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "PowerDig Serwis",
    tagline: "Elektryk, serwis AGD i elektroniki, automatyka – szybko i solidnie.",
    serviceTags: ["Instalacje", "Serwis AGD", "Elektronika", "Automatyka", "Smart Home"],
    ctaPhoneHref: "tel:+48795704504",
    ctaPhoneLabel: "795‑704‑504",
    ctaServicesLabel: "Nasze usługi",
    ctaServicesHref: "#uslugi",
  },
};

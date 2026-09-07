import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigAbout } from "./powerdig-about";

const meta = {
  title: "PowerDig/About",
  component: PowerDigAbout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigAbout>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  supra: "O nas",
  title: "Daniel Głogowski",
  paragraphs: [
    "PowerDig Serwis to firma z wieloletnim doświadczeniem w branży elektrycznej i usługach technicznych.",
    "Obsługujemy klientów indywidualnych i firmy na terenie Małopolski.",
  ],
  stats: [
    { value: "10+", label: "Lat doświadczenia" },
    { value: "500+", label: "Zadowolonych klientów" },
    { value: "24h", label: "Czas reakcji" },
  ],
  ownerName: "Daniel Głogowski",
  ownerTitle: "Właściciel · Elektryk SEP",
};

export const Placeholder: Story = {
  args: { ...baseArgs, photoPlaceholder: "Zdjęcie wkrótce" },
};

export const WithPhoto: Story = {
  args: {
    ...baseArgs,
    // eslint-disable-next-line @next/next/no-img-element
    image: <img src="https://picsum.photos/seed/powerdig/560/720" alt="Daniel Głogowski" />,
  },
};

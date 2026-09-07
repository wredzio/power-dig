import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigGallery } from "./powerdig-gallery";

const meta = {
  title: "PowerDig/Gallery",
  component: PowerDigGallery,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const labels = {
  dialog: "Galeria zdjęć",
  close: "Zamknij",
  previous: "Poprzednie",
  next: "Następne",
};

/* eslint-disable @next/next/no-img-element */
const image = (seed: string, caption: string, category: string) => ({
  alt: caption,
  caption,
  category,
  thumbnail: <img src={`https://picsum.photos/seed/${seed}/640/480`} alt={caption} />,
  full: <img src={`https://picsum.photos/seed/${seed}/1600/1200`} alt={caption} />,
});
/* eslint-enable @next/next/no-img-element */

export const WithImages: Story = {
  args: {
    supra: "Nasze realizacje",
    title: "Galeria",
    subtitle: "Zdjęcia z realizacji – instalacje, rozdzielnice, monitoring.",
    labels,
    images: [
      image("pd1", "Rozdzielnica mieszkaniowa", "Instalacje"),
      image("pd2", "System monitoringu", "Monitoring"),
      image("pd3", "Sterowanie oświetleniem", "Smart home"),
      image("pd4", "Napęd bramy", "Automatyka"),
      image("pd5", "Szafa sterownicza", "Prefabrykacja"),
      image("pd6", "Pomiary instalacji", "Pomiary"),
    ],
  },
};

export const Empty: Story = {
  args: {
    supra: "Nasze realizacje",
    title: "Galeria",
    labels,
    images: [],
    footnote: "Zdjęcia z realizacji zostaną dodane wkrótce.",
  },
};

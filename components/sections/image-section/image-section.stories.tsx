import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ImageSection } from "./image-section";

const meta = {
  title: "Sections/ImageSection",
  component: ImageSection,
} satisfies Meta<typeof ImageSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    title: "Feature Highlight",
    description:
      "This section showcases a feature with an image on the left and text on the right.",
    layout: "left",
    image: (
      <div className="bg-muted text-muted-foreground flex h-64 w-full items-center justify-center lg:h-96">
        Image Placeholder
      </div>
    ),
  },
};

export const Right: Story = {
  args: {
    title: "Another Feature",
    description: "Image on the right side with text on the left.",
    layout: "right",
    image: (
      <div className="bg-muted text-muted-foreground flex h-64 w-full items-center justify-center lg:h-96">
        Image Placeholder
      </div>
    ),
  },
};

export const TextOnly: Story = {
  args: {
    title: "Polityka prywatności",
    description:
      "Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z serwisu uszkota.pl. Administrator dokłada wszelkich starań w celu zapewnienia ochrony prywatności na poziomie co najmniej odpowiadającym standardom określonym w obowiązujących przepisach prawnych.",
    layout: "left",
  },
};

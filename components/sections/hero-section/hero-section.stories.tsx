import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroSection } from "./hero-section";

const meta = {
  title: "Sections/HeroSection",
  component: HeroSection,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Build something amazing",
    description:
      "A minimal, forkable core project. Start here and customize everything to match your brand.",
    ctaLabel: "Get Started",
    ctaHref: "#about",
  },
};

export const WithoutCTA: Story = {
  args: {
    title: "Welcome to Core3",
    description: "The foundation for your next project.",
  },
};

export const WithHighOpacity: Story = {
  args: {
    title: "Your Brand Here",
    description: "Customize this starter to match your project.",
    overlayOpacity: 80,
    ctaLabel: "Learn More",
    ctaHref: "#about",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Simple & Clean",
    overlayOpacity: 60,
  },
};

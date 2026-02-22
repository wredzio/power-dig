import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AboutSection } from "./about-section";

const meta = {
  title: "Sections/AboutSection",
  component: AboutSection,
} satisfies Meta<typeof AboutSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Why choose us",
    description: "We provide the best foundation for your next project.",
    features: [
      {
        icon: "Zap",
        title: "Fast",
        description: "Optimized for performance with Next.js and Turbopack.",
      },
      {
        icon: "Shield",
        title: "Secure",
        description: "Built with security best practices from the ground up.",
      },
      {
        icon: "Palette",
        title: "Customizable",
        description: "Easily adapt the design system to match your brand.",
      },
    ],
  },
};

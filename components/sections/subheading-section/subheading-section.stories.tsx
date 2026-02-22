import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SubheadingSection } from "./subheading-section";

const meta = {
  title: "Sections/SubheadingSection",
  component: SubheadingSection,
} satisfies Meta<typeof SubheadingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Our Services",
  },
};

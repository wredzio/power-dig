import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DividerSection } from "./divider-section";

const meta = {
  title: "Sections/DividerSection",
  component: DividerSection,
} satisfies Meta<typeof DividerSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tartan: Story = {
  args: {
    style: "tartan",
    height: "md",
  },
};

export const TartanWithImage: Story = {
  args: {
    style: "tartan",
    height: "md",
    image: (
      <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
        Custom Pattern
      </div>
    ),
  },
};

export const Solid: Story = {
  args: {
    style: "solid",
    height: "md",
  },
};

export const Line: Story = {
  args: {
    style: "line",
    height: "md",
  },
};

export const Small: Story = {
  args: {
    style: "solid",
    height: "sm",
  },
};

export const Large: Story = {
  args: {
    style: "tartan",
    height: "lg",
  },
};

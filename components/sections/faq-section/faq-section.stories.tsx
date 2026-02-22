import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FaqSection } from "./faq-section";

const meta = {
  title: "Sections/FaqSection",
  component: FaqSection,
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about our services.",
    items: [
      {
        question: "What technologies does Core3 use?",
        answer:
          "Core3 is built with Next.js 16, React 19, Sanity CMS, Tailwind CSS 4, and Storybook 10.",
      },
      {
        question: "How do I customize the theme?",
        answer:
          "Edit the CSS custom properties in app/globals.css to change colors, fonts, and other design tokens.",
      },
      {
        question: "Can I use this as a starting point for my project?",
        answer: "Yes! Core3 is designed to be forked and customized for specific implementations.",
      },
    ],
  },
};

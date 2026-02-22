import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContactSection } from "./contact-section";

const meta = {
  title: "Sections/ContactSection",
  component: ContactSection,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Skontaktuj się z nami",
    phone: "+48 123 456 789",
    address: "ul. Przykładowa 1, 00-001 Warszawa",
    email: "kontakt@example.com",
  },
};

export const WithHours: Story = {
  args: {
    ...Default.args,
    hours: [
      { days: "Poniedziałek – Piątek", time: "10:00 – 22:00" },
      { days: "Sobota", time: "12:00 – 23:00" },
      { days: "Niedziela", time: "12:00 – 21:00" },
    ],
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigFaq } from "./powerdig-faq";

const meta = {
  title: "PowerDig/FAQ",
  component: PowerDigFaq,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigFaq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    supra: "Pytania i odpowiedzi",
    title: "FAQ",
    items: [
      {
        question: "Na jakim obszarze świadczycie usługi?",
        answer: "Działamy na terenie Małopolski – dojeżdżamy do klienta.",
      },
      {
        question: "Jakie urządzenia AGD naprawiacie?",
        answer:
          "Pralki, suszarki, zmywarki, ekspresy do kawy, płyty indukcyjne, piekarniki i okapy. Nie zajmujemy się sprzętem RTV.",
      },
    ],
  },
};

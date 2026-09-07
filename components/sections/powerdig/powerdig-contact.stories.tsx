import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigContact } from "./powerdig-contact";

const meta = {
  title: "PowerDig/Contact",
  component: PowerDigContact,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigContact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    supra: "Skontaktuj się",
    title: "Kontakt",
    phoneHref: "tel:+48795704504",
    phoneLabel: "795‑704‑504",
    email: "powerdig.serwis@gmail.com",
    callNowLabel: "Zadzwoń teraz",
    cards: [
      { icon: "Phone", title: "Telefon", value: "Pon–Sob, 7:00–18:00" },
      { icon: "Zap", title: "Pilne naprawy", value: "Szybki dojazd do klienta" },
      { icon: "Mail", title: "E-mail", value: "Odpowiedź w 24h" },
    ],
  },
};

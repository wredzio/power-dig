import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigServices } from "./powerdig-services";

const meta = {
  title: "PowerDig/Services",
  component: PowerDigServices,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigServices>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    supra: "Czym się zajmujemy",
    title: "Nasze usługi",
    services: [
      {
        icon: "Zap",
        tag: "Instalacje",
        title: "Instalacje elektryczne",
        description: "Montaż nowych instalacji oraz naprawy i serwis istniejących.",
        details: ["Montaż instalacji", "Naprawy i serwis"],
      },
      {
        icon: "WashingMachine",
        tag: "Serwis",
        title: "Serwis AGD",
        description: "Naprawy, serwis i montaż sprzętu AGD z dojazdem do klienta.",
        details: ["Pralki i suszarki", "Zmywarki", "Ekspresy do kawy"],
        note: "Nie naprawiamy RTV",
      },
      {
        icon: "PanelTop",
        tag: "Prefabrykacja",
        title: "Prefabrykacja szaf i rozdzielnic",
        description: "Projekt i prefabrykacja szaf sterowniczych oraz rozdzielnic elektrycznych.",
      },
      {
        icon: "House",
        tag: "Smart Home",
        title: "Inteligentne domy",
        description: "Sterowanie oświetleniem, ogrzewaniem, roletami i bezpieczeństwem.",
      },
    ],
  },
};

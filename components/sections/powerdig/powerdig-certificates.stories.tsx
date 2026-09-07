import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigCertificates } from "./powerdig-certificates";

const meta = {
  title: "PowerDig/Certificates",
  component: PowerDigCertificates,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigCertificates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    supra: "Kwalifikacje",
    title: "Certyfikaty i uprawnienia",
    subtitle: "Prace wykonujemy zgodnie z przepisami i z aktualnymi uprawnieniami.",
    items: [
      {
        title: "Świadectwo kwalifikacyjne SEP (Grupa 1 – E)",
        issuer: "SEP",
        number: "do 1 kV",
        description: "Eksploatacja urządzeń, instalacji i sieci elektroenergetycznych.",
        validUntilLabel: "Ważny do: marzec 2029",
      },
      {
        title: "Pomiary elektryczne",
        issuer: "SEP",
        description: "Uprawnienia do wykonywania pomiarów ochronnych instalacji elektrycznych.",
      },
      {
        title: "Autoryzowany technik serwisu",
        description: "Serwis i montaż urządzeń AGD oraz elektroniki przemysłowej.",
      },
    ],
    footnote: "Pełną listę uprawnień i numery świadectw udostępniamy na życzenie.",
  },
};

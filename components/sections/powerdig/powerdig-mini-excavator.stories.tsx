import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PowerDigMiniExcavator } from "./powerdig-mini-excavator";

const meta = {
  title: "PowerDig/MiniExcavator",
  component: PowerDigMiniExcavator,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PowerDigMiniExcavator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    supra: "Usługi specjalne",
    title: "Usługi\nMinikoparką",
    paragraphs: [
      "Dysponujemy minikoparką, która pozwala realizować prace ziemne w trudno dostępnych miejscach.",
      "Mała szerokość robocza umożliwia pracę w ogrodach, przy budynkach i w miejscach, gdzie duży sprzęt nie ma wstępu.",
    ],
    ctaLabel: "Zadzwoń i umów termin",
    ctaHref: "tel:+48795704504",
    featuresTitle: "Zakres prac",
    features: [
      "Przekopy pod kable i rury",
      "Prace fundamentowe i ziemne",
      "Wykopy pod szamba i zbiorniki",
      "Prace ogrodowe i niwelacja terenu",
    ],
    equipmentName: "Miniekskawator Kubota",
    equipmentSpecs: "Szerokość robocza: 1 m | Głębokość: 1,8 m",
  },
};

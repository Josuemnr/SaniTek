import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuickStatsCard } from "./QuickStatsCard";

const meta: Meta<typeof QuickStatsCard> = {
  title: "Módulos/Risk Map/QuickStatsCard",
  component: QuickStatsCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof QuickStatsCard>;

export const Default: Story = {
  name: "Estadísticas normales",
};

export const EnContextoMapa: Story = {
  name: "Sobre overlay oscuro (como aparece en el mapa)",
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8 rounded-xl">
        <Story />
      </div>
    ),
  ],
};

export const EnContenedorEstrecho: Story = {
  name: "En contenedor estrecho",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 240 }}>
        <Story />
      </div>
    ),
  ],
};

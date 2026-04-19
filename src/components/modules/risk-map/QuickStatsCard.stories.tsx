import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuickStatsCard } from "./QuickStatsCard";

const meta: Meta<typeof QuickStatsCard> = {
  title: "Módulos/Risk Map/QuickStatsCard",
  component: QuickStatsCard,
  parameters: { layout: "padded", backgrounds: { default: "dark" } },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof QuickStatsCard>;

export const Default: Story = {
  name: "Tarjetas de estadísticas rápidas",
};

export const SobreFondoClaro: Story = {
  name: "Sobre fondo claro",
  parameters: { backgrounds: { default: "white" } },
};

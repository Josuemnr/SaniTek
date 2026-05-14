import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlanFeatureItem } from "./PlanFeatureItem";

const meta: Meta<typeof PlanFeatureItem> = {
  title: "Módulos/Suscripción/PlanFeatureItem",
  component: PlanFeatureItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PlanFeatureItem>;

export const AccesoIlimitado: Story = {
  name: "Acceso ilimitado",
  args: { text: "Acceso ilimitado a todas las funciones" },
};

export const Soporte: Story = {
  name: "Soporte 24/7",
  args: { text: "Soporte técnico 24/7" },
};

export const TextoLargo: Story = {
  name: "Texto de feature largo",
  args: { text: "Reportes avanzados con exportación a PDF, Excel y CSV" },
};

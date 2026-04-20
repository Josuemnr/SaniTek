import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

const meta: Meta<typeof PaymentStatusBadge> = {
  title: "Módulos/Suscripción/PaymentStatusBadge",
  component: PaymentStatusBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PaymentStatusBadge>;

export const Pagado: Story = {
  name: "Estado Pagado",
  args: { status: "Pagado" },
};

export const Pendiente: Story = {
  name: "Estado Pendiente",
  args: { status: "Pendiente" },
};

export const Fallido: Story = {
  name: "Estado Fallido",
  args: { status: "Fallido" },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddCardModal } from "./AddCardModal";

const meta: Meta<typeof AddCardModal> = {
  title: "Módulos/Suscripción/AddCardModal",
  component: AddCardModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof AddCardModal>;

export const Default: Story = {
  name: "Modal — Agregar nueva tarjeta",
  args: { onClose: () => {}, onSave: () => {} },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmModal } from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "Módulos/Suscripción/ConfirmModal",
  component: ConfirmModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const EliminarUsuario: Story = {
  name: "Confirmar eliminación de usuario",
  args: {
    title: "Eliminar usuario",
    message: "¿Estás seguro de que deseas eliminar a este usuario? Esta acción no se puede deshacer.",
    confirmLabel: "Eliminar",
    onConfirm: () => {},
    onClose: () => {},
  },
};

export const CancelarPlan: Story = {
  name: "Confirmar cancelación de plan",
  args: {
    title: "Cancelar suscripción",
    message: "Perderás acceso a todas las funciones premium al finalizar el período de facturación actual.",
    confirmLabel: "Cancelar plan",
    onConfirm: () => {},
    onClose: () => {},
  },
};

export const LabelDefault: Story = {
  name: "Con label de confirmación por defecto",
  args: {
    title: "¿Confirmar acción?",
    message: "Esta acción es irreversible.",
    onConfirm: () => {},
    onClose: () => {},
  },
};

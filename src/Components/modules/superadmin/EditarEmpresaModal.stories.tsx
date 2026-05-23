import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditarEmpresaModal } from "./EditarEmpresaModal";

const meta: Meta<typeof EditarEmpresaModal> = {
  title: "Módulos/Super Admin/EditarEmpresaModal",
  component: EditarEmpresaModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof EditarEmpresaModal>;

export const Default: Story = {
  name: "Modal con datos cargados",
  args: {
    empresa: {
      id: 1,
      nombre: "Grupo Industrial Sanitek",
      correoAdmin: "admin@sanitek.com",
      nombreAdmin: "Josué Monroy",
      suscrita: true,
    },
    onClose: () => {},
    onSave: (data) => console.log("Empresa actualizada:", data),
  },
};

export const SinSuscripcion: Story = {
  name: "Empresa sin suscripción",
  args: {
    empresa: {
      id: 2,
      nombre: "Transportes García S.A.",
      correoAdmin: "garcia@transportes.com",
      nombreAdmin: "Paula Concepción",
      suscrita: false,
    },
    onClose: () => {},
    onSave: (data) => console.log("Empresa actualizada:", data),
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { NuevaEmpresaModal } from "./NuevaEmpresaModal";

const meta: Meta<typeof NuevaEmpresaModal> = {
  title: "Módulos/Super Admin/NuevaEmpresaModal",
  component: NuevaEmpresaModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NuevaEmpresaModal>;

export const Default: Story = {
  name: "Modal vacío",
  args: {
    onClose: () => {},
    onSave: (data) => console.log("Empresa creada:", data),
  },
};

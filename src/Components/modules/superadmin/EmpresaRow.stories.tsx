import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmpresaRow } from "./EmpresaRow";

const meta: Meta<typeof EmpresaRow> = {
  title: "Módulos/Super Admin/EmpresaRow",
  component: EmpresaRow,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #f3f4f6", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <Story />
          </tbody>
        </table>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EmpresaRow>;

export const Suscrita: Story = {
  name: "Empresa suscrita",
  args: {
    empresa: {
      id: 1,
      nombre: "Grupo Industrial Sanitek",
      correoAdmin: "admin@sanitek.com",
      nombreAdmin: "Josué Monroy",
      suscrita: true,
    },
    onEdit: () => {},
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
    onEdit: () => {},
  },
};

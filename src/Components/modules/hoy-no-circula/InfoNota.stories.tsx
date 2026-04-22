import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoNota } from "./InfoNota";

const meta: Meta<typeof InfoNota> = {
  title: "Módulos/Hoy No Circula/InfoNota",
  component: InfoNota,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof InfoNota>;

export const Ancho: Story = {
  name: "Ancho completo",
};

export const Estrecho: Story = {
  name: "En contenedor estrecho (como en móvil)",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export const ContenedorConTarjetas: Story = {
  name: "En contexto — debajo de tarjetas",
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-3 w-80">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-sm text-gray-500">
          Tarjeta de ejemplo arriba
        </div>
        <Story />
      </div>
    ),
  ],
};

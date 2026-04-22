import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentHistoryTable } from "./PaymentHistoryTable";
import type { PaymentRecord } from "./PaymentHistoryTable";

const meta: Meta<typeof PaymentHistoryTable> = {
  title: "Módulos/Suscripción/PaymentHistoryTable",
  component: PaymentHistoryTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PaymentHistoryTable>;

const SAMPLE_RECORDS: PaymentRecord[] = [
  { id: 1, date: "01 abr. 2026", description: "Sanitek Premium — Abril 2026", status: "Pagado", amount: 17000 },
  { id: 2, date: "01 mar. 2026", description: "Sanitek Premium — Marzo 2026", status: "Pagado", amount: 17000 },
  { id: 3, date: "01 feb. 2026", description: "Sanitek Premium — Febrero 2026", status: "Fallido", amount: 17000 },
  { id: 4, date: "01 ene. 2026", description: "Sanitek Premium — Enero 2026", status: "Pendiente", amount: 17000 },
];

export const ConRegistros: Story = {
  name: "Tabla con historial de pagos",
  args: { records: SAMPLE_RECORDS },
};

export const SoloExitosos: Story = {
  name: "Solo pagos exitosos",
  args: {
    records: SAMPLE_RECORDS.filter((r) => r.status === "Pagado"),
  },
};

export const TablaVacia: Story = {
  name: "Sin registros",
  args: { records: [] },
};

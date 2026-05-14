import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlanCard } from "./PlanCard";

const meta: Meta<typeof PlanCard> = {
  title: "Módulos/Suscripción/PlanCard",
  component: PlanCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PlanCard>;

export const Default: Story = {
  name: "Plan activo con próximo pago",
  args: { onCancelPlan: () => {} },
};

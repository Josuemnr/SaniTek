import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChangePlanModal } from "./ChangePlanModal";

const meta: Meta<typeof ChangePlanModal> = {
  title: "Módulos/Suscripción/ChangePlanModal",
  component: ChangePlanModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ChangePlanModal>;

export const DesdeBasico: Story = {
  name: "Cambio desde plan Básico",
  args: { currentPlan: "basico", onClose: () => {} },
};

export const DesdePremium: Story = {
  name: "Cambio desde plan Premium",
  args: { currentPlan: "premium", onClose: () => {} },
};

export const DesdeEnterprise: Story = {
  name: "Cambio desde plan Enterprise",
  args: { currentPlan: "enterprise", onClose: () => {} },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddPaymentCard } from "./AddPaymentCard";

const meta: Meta<typeof AddPaymentCard> = {
  title: "Módulos/Suscripción/AddPaymentCard",
  component: AddPaymentCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AddPaymentCard>;

export const Default: Story = {
  name: "Botón añadir método de pago",
  args: { onClick: () => {} },
};

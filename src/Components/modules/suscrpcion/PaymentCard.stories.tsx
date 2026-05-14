import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentCard } from "./PaymentCard";
import type { CardData } from "./PaymentCard";

const meta: Meta<typeof PaymentCard> = {
  title: "Módulos/Suscripción/PaymentCard",
  component: PaymentCard,
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

type Story = StoryObj<typeof PaymentCard>;

const BASE_CARD: CardData = {
  id: 1,
  last4: "4242",
  holder: "Ana Martínez",
  expiry: "12/27",
  isDefault: true,
};

export const TarjetaPredeterminada: Story = {
  name: "Tarjeta predeterminada",
  args: { card: BASE_CARD, onEdit: () => {}, onDelete: () => {} },
};

export const TarjetaSecundaria: Story = {
  name: "Tarjeta no predeterminada",
  args: {
    card: { id: 2, last4: "8891", holder: "Carlos Vega", expiry: "06/26", isDefault: false },
    onEdit: () => {},
    onDelete: () => {},
  },
};

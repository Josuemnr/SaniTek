import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarCard } from "./CalendarCard";
import { getRestrictedDatesForMonth } from "./circula-data";

const meta: Meta<typeof CalendarCard> = {
  title: "Módulos/Hoy No Circula/CalendarCard",
  component: CalendarCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 480, maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CalendarCard>;

const ABRIL_2026 = new Date(2026, 3, 1);
const MAYO_2026  = new Date(2026, 4, 1);

export const AbrilConRestricciones: Story = {
  name: "Abril 2026 — con días restringidos",
  args: {
    selectedDate: new Date(2026, 3, 14),
    currentMonth: ABRIL_2026,
    restrictedDates: getRestrictedDatesForMonth(2026, 3),
    onSelectDate: () => {},
    onPrevMonth: () => {},
    onNextMonth: () => {},
  },
};

export const MayoConRestricciones: Story = {
  name: "Mayo 2026 — con días restringidos",
  args: {
    selectedDate: new Date(2026, 4, 5),
    currentMonth: MAYO_2026,
    restrictedDates: getRestrictedDatesForMonth(2026, 4),
    onSelectDate: () => {},
    onPrevMonth: () => {},
    onNextMonth: () => {},
  },
};

export const SinRestricciones: Story = {
  name: "Sin días restringidos",
  args: {
    selectedDate: new Date(2026, 3, 19),
    currentMonth: ABRIL_2026,
    restrictedDates: [],
    onSelectDate: () => {},
    onPrevMonth: () => {},
    onNextMonth: () => {},
  },
};

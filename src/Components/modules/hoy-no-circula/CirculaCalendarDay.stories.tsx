import type { Meta, StoryObj } from "@storybook/react-vite";
import { CirculaCalendarDay } from "./CirculaCalendarDay";

const meta: Meta<typeof CirculaCalendarDay> = {
  title: "Módulos/Hoy No Circula/CirculaCalendarDay",
  component: CirculaCalendarDay,
  parameters: { layout: "centered", backgrounds: { default: "white" } },
  tags: ["autodocs"],
  argTypes: { onClick: { action: "clicked" } },
};
export default meta;

type Story = StoryObj<typeof CirculaCalendarDay>;

const date = new Date(2026, 3, 15); // 15 Abr 2026

export const Normal: Story = {
  name: "Día normal",
  args: { date, isSelected: false, isRestricted: false, onClick: () => {} },
};

export const Restringido: Story = {
  name: "Día con restricción (punto azul)",
  args: { date, isSelected: false, isRestricted: true, onClick: () => {} },
};

export const Seleccionado: Story = {
  name: "Día seleccionado",
  args: { date, isSelected: true, isRestricted: false, onClick: () => {} },
};

export const SeleccionadoYRestringido: Story = {
  name: "Seleccionado + restricción",
  args: { date, isSelected: true, isRestricted: true, onClick: () => {} },
};

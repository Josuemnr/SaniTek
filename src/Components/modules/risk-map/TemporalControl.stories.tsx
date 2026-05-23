import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { TemporalControl } from "./TemporalControl";
import { useRiskStore } from "@/store/useRiskStore";

const meta: Meta<typeof TemporalControl> = {
  title: "Módulos/Risk Map/TemporalControl",
  component: TemporalControl,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TemporalControl>;

function WithOffset({ offset, children }: { offset: number; children: React.ReactNode }) {
  const setSelectedDayOffset = useRiskStore((s) => s.setSelectedDayOffset);
  useEffect(() => {
    setSelectedDayOffset(offset);
  }, [offset, setSelectedDayOffset]);
  return <>{children}</>;
}

export const Hoy: Story = {
  name: "Día 0 — Hoy",
  decorators: [(Story) => <WithOffset offset={0}><Story /></WithOffset>],
};

export const Ayer: Story = {
  name: "Día -1 — Ayer",
  decorators: [(Story) => <WithOffset offset={-1}><Story /></WithOffset>],
};

export const HaceCinco: Story = {
  name: "Día -5 — Hace 5 días",
  decorators: [(Story) => <WithOffset offset={-5}><Story /></WithOffset>],
};

export const Manana: Story = {
  name: "Día +1 — Predicción mañana",
  decorators: [(Story) => <WithOffset offset={1}><Story /></WithOffset>],
};

export const MaxFuturo: Story = {
  name: "Día +10 — Predicción máxima",
  decorators: [(Story) => <WithOffset offset={10}><Story /></WithOffset>],
};

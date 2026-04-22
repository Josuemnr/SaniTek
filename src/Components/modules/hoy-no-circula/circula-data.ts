export const SPANISH_MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const SPANISH_DAYS_LONG = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
];

export const SPANISH_DAYS_SHORT = [
  "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb",
];

// Placas por día de la semana (1=Lun ... 5=Vie)
const PLATE_SCHEDULE: Record<number, number[]> = {
  1: [3, 4],
  2: [5, 6],
  3: [7, 8],
  4: [9, 0],
  5: [1, 2],
};

export interface HologramaInfo {
  type: string;
  label: string;
  restricted: boolean;
  badgeColor: string;
}

export interface DayRestriction {
  plateEndings: number[];
  schedule: string;
  protocol: "active" | "inactive";
  hologramas: HologramaInfo[];
}

export function getDayRestriction(date: Date): DayRestriction | null {
  const dow = date.getDay();
  if (dow === 0 || dow === 6) return null;
  return {
    plateEndings: PLATE_SCHEDULE[dow],
    schedule: "05:00 - 22:00",
    protocol: "active",
    hologramas: [
      { type: "2",  label: "Holograma 2",  restricted: true,  badgeColor: "bg-amber-400" },
      { type: "0",  label: "Holograma 0",  restricted: false, badgeColor: "bg-emerald-500" },
      { type: "00", label: "Holograma 00", restricted: false, badgeColor: "bg-emerald-500" },
    ],
  };
}

export function getRestrictedDatesForMonth(year: number, month: number): Date[] {
  const dates: Date[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
  }
  return dates;
}

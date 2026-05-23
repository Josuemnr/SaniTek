import { useState, useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import { getDayRestriction, getRestrictedDatesForMonth } from "@/components/modules/hoy-no-circula/circula-data";
import { CalendarCard } from "@/components/modules/hoy-no-circula/CalendarCard";
import { EstadoDiaCard } from "@/components/modules/hoy-no-circula/EstadoDiaCard";
import { PlacasRestringidasCard } from "@/components/modules/hoy-no-circula/PlacasRestringidasCard";
import { HologramasCard } from "@/components/modules/hoy-no-circula/HologramasCard";
import { InfoNota } from "@/components/modules/hoy-no-circula/InfoNota";

export function HoyNoCirculaPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 2, 6));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 2, 1));

  const restrictedDates = useMemo(
    () => getRestrictedDatesForMonth(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth]
  );

  const restriction = useMemo(() => getDayRestriction(selectedDate), [selectedDate]);

  const handlePrevMonth = () =>
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));

  const handleNextMonth = () =>
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  return (
    <div className="flex gap-6 p-6 h-full bg-blue-50 overflow-hidden">
      <div className="flex-1 min-w-0 min-h-0">
        <CalendarCard
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          restrictedDates={restrictedDates}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>

      <div className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto">
        <EstadoDiaCard date={selectedDate} restriction={restriction} />

        {restriction ? (
          <>
            <PlacasRestringidasCard restriction={restriction} />
            <HologramasCard hologramas={restriction.hologramas} />
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center gap-2 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <p className="text-sm font-medium text-gray-700">Sin restricciones</p>
            <p className="text-xs text-gray-400">No hay restricciones vehiculares este día.</p>
          </div>
        )}

        <InfoNota />
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import { getDayRestriction, getRestrictedDatesForMonth } from "./circula-data";
import { CalendarCard } from "./CalendarCard";
import { EstadoDiaCard } from "./EstadoDiaCard";
import { PlacasRestringidasCard } from "./PlacasRestringidasCard";
import { HologramasCard } from "./HologramasCard";
import { InfoNota } from "./InfoNota";

export function HoyNoCirculaContainer() {
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
      {/* Calendario — ocupa todo el espacio libre */}
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

      {/* Panel de detalles */}
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

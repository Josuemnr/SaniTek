import { Calendar } from "lucide-react";
import { SPANISH_DAYS_LONG, SPANISH_MONTHS, type DayRestriction } from "./circula-data";

interface EstadoDiaCardProps {
  date: Date;
  restriction: DayRestriction | null;
}

export function EstadoDiaCard({ date, restriction }: EstadoDiaCardProps) {
  const dayName = SPANISH_DAYS_LONG[date.getDay()];
  const dayNum = date.getDate();
  const monthName = SPANISH_MONTHS[date.getMonth()];
  const dayType = date.getDay() === 0 || date.getDay() === 6 ? "Día de descanso" : "Día laboral";

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-blue-600 px-5 py-4 flex items-center gap-3">
        <div className="bg-white/20 rounded-lg p-2 shrink-0">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">
            {dayName} {dayNum} de {monthName}
          </p>
          <p className="text-blue-100 text-xs">{dayType}</p>
        </div>
      </div>
      <div className="bg-white px-5 py-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">Estado del día</span>
        {restriction ? (
          <span className="text-sm font-semibold text-red-500">Protocolo Activo</span>
        ) : (
          <span className="text-sm font-semibold text-emerald-600">Sin restricciones</span>
        )}
      </div>
    </div>
  );
}

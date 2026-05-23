import { ChevronLeft, ChevronRight } from "lucide-react";
import { SPANISH_MONTHS, SPANISH_DAYS_SHORT } from "./circula-data";
import { CirculaCalendarDay } from "./CirculaCalendarDay";

interface CalendarCardProps {
  selectedDate: Date;
  currentMonth: Date;
  restrictedDates: Date[];
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildCalendarWeeks(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = Array(firstDay.getDay()).fill(null);

  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

export function CalendarCard({
  selectedDate,
  currentMonth,
  restrictedDates,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarCardProps) {
  const weeks = buildCalendarWeeks(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full min-h-0">
      {/* Month header */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {SPANISH_MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Selecciona un día para ver detalles
          </p>
        </div>
        <div className="flex gap-2 mt-1">
          <button
            onClick={onPrevMonth}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={onNextMonth}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 shrink-0 mb-2">
        {SPANISH_DAYS_SHORT.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-normal text-gray-400 py-1 select-none"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid — llena todo el espacio */}
      <div className="flex-1 flex flex-col gap-1 min-h-0">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-1 items-center">
            {week.map((date, di) => (
              <div key={di} className="flex-1 flex items-center justify-center">
                {date ? (
                  <CirculaCalendarDay
                    date={date}
                    isSelected={isSameDay(date, selectedDate)}
                    isRestricted={restrictedDates.some((r) => isSameDay(r, date))}
                    onClick={onSelectDate}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100 mt-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          <span className="text-xs text-gray-500">Día seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-xs text-gray-500">Con restricciones</span>
        </div>
      </div>
    </div>
  );
}

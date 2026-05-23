import { Car, Clock } from "lucide-react";
import { type DayRestriction } from "./circula-data";

interface PlacasRestringidasCardProps {
  restriction: DayRestriction;
}

export function PlacasRestringidasCard({ restriction }: PlacasRestringidasCardProps) {
  const endingLabels = restriction.plateEndings
    .map((n) => (n === 0 ? "0" : String(n)))
    .join(" y ");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Car className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-800 text-sm">Placas Restringidas</h3>
      </div>
      <div className="bg-blue-50 rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Terminación</span>
          <div className="flex gap-2">
            {restriction.plateEndings.map((n) => (
              <span
                key={n}
                className="w-8 h-8 rounded-lg bg-gray-900 text-white text-sm font-bold flex items-center justify-center"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Vehículos con placas terminadas en {endingLabels}
        </p>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="w-4 h-4 text-gray-400 shrink-0" />
        <span className="text-xs">
          <span className="font-medium">Horario</span>{" "}
          {restriction.schedule} hrs
        </span>
      </div>
    </div>
  );
}

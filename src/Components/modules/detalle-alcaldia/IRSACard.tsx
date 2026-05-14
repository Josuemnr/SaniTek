import { getIrsaColor, getIrsaBgColor } from "./detalle-alcaldia-data";

interface IRSACardProps {
  irsa: number;
  irsaMax: number;
  descripcion: string;
  esDatoReal?: boolean;
}

export function IRSACard({ irsa, irsaMax, descripcion, esDatoReal = false }: IRSACardProps) {
  const pct        = Math.min(100, (irsa / irsaMax) * 100);
  const textColor  = getIrsaColor(irsa);
  const barColor   = getIrsaBgColor(irsa);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Índice de Riesgo Sanitario
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {esDatoReal ? "Calculado en tiempo real" : "Datos de referencia"}
          </p>
        </div>
        {esDatoReal && (
          <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            En vivo
          </span>
        )}
      </div>

      <div className="flex items-end gap-2 mt-4">
        <span className={`text-6xl font-black leading-none ${textColor}`}>
          {irsa.toFixed(1)}
        </span>
        <span className="text-2xl text-gray-400 font-semibold mb-1">/{irsaMax.toFixed(0)}</span>
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500">{descripcion}</p>
    </div>
  );
}

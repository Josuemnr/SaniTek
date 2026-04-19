import { getIrsaColor } from "./detalle-alcaldia-data";

interface IRSACardProps {
  irsa: number;
  irsaMax: number;
  descripcion: string;
}

export function IRSACard({ irsa, irsaMax, descripcion }: IRSACardProps) {
  const pct = (irsa / irsaMax) * 100;
  const scoreColor = getIrsaColor(irsa);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Índice de Riesgo Sanitario
      </p>
      <p className="text-[11px] text-gray-400 mt-0.5">Actualizado hace 15 minutos</p>

      <div className="flex items-end gap-2 mt-4">
        <span className={`text-6xl font-black leading-none ${scoreColor}`}>
          {irsa.toFixed(1)}
        </span>
        <span className="text-2xl text-gray-400 font-semibold mb-1">/{irsaMax.toFixed(1)}</span>
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${scoreColor.replace("text-", "bg-")}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500">{descripcion}</p>
    </div>
  );
}

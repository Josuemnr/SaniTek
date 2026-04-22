import { Info } from "lucide-react";

export function InfoNota() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex gap-3 items-start">
      <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
      <p className="text-xs text-gray-600 leading-relaxed">
        Las restricciones pueden cambiar por contingencias ambientales. Consulta siempre las
        actualizaciones oficiales.
      </p>
    </div>
  );
}

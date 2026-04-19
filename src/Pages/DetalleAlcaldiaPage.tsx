import { ArrowLeft } from "lucide-react";
import { useRiskStore } from "@/store/useRiskStore";
import { getDetalleAlcaldia } from "@/components/modules/detalle-alcaldia/detalle-alcaldia-data";
import { IRSACard } from "@/components/modules/detalle-alcaldia/IRSACard";
import { VariablesGrid } from "@/components/modules/detalle-alcaldia/VariablesGrid";

interface DetalleAlcaldiaPageProps {
  onNavigate: (screen: string) => void;
}

export function DetalleAlcaldiaPage({ onNavigate }: DetalleAlcaldiaPageProps) {
  const { selectedAlcaldia } = useRiskStore();
  const detalle = getDetalleAlcaldia(selectedAlcaldia ?? "");

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-5 overflow-y-auto">
      <button
        onClick={() => onNavigate("Mapa de Riesgo")}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al mapa
      </button>

      <div>
        <h1 className="text-3xl font-black text-gray-900">Alcaldía {detalle.nombre}</h1>
        <p className="text-sm text-gray-500 mt-1">{detalle.ciudad}</p>
      </div>

      <IRSACard
        irsa={detalle.irsa}
        irsaMax={detalle.irsaMax}
        descripcion={detalle.irsaDescripcion}
      />

      <VariablesGrid variables={detalle.variables} />
    </div>
  );
}

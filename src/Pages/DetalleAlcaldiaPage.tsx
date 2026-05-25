import { ArrowLeft, Wind, Gauge, Leaf, Bell, BellOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRiskStore } from "@/store/useRiskStore";
import { useDetalleAlcaldia } from "@/hooks/useDetalleAlcaldia";
import { useAlerts } from "@/hooks/useAlerts";
import { useAuth } from "@/Context/AuthContext";
import { getDetalleAlcaldia, type RiskTag } from "@/Components/modules/detalle-alcaldia/detalle-alcaldia-data";
import { IRSACard } from "@/Components/modules/detalle-alcaldia/IRSACard";
import { VariablesGrid } from "@/Components/modules/detalle-alcaldia/VariablesGrid";
import { VariableCard } from "@/Components/modules/detalle-alcaldia/VariableCard";
import { cn } from "@/lib/utils";
import { getAlcaldiaId } from "@/Services/backendApi";
import type { IrsaDiagnosticApiResponse } from "@/hooks/useDetalleAlcaldia";

// ─── Helpers de riesgo para contaminantes ────────────────────────────────────

function no2Tag(v: number): RiskTag {
  if (v < 40)  return "Bajo";
  if (v < 80)  return "Moderado";
  if (v < 140) return "Alto";
  return "Crítico";
}

function o3Tag(v: number): RiskTag {
  if (v < 50)  return "Bajo";
  if (v < 80)  return "Moderado";
  if (v < 120) return "Alto";
  return "Crítico";
}

function pm25Tag(v: number): RiskTag {
  if (v < 15)  return "Óptimo";
  if (v < 25)  return "Bajo";
  if (v < 35)  return "Moderado";
  if (v < 45)  return "Alto";
  return "Crítico";
}

function contaminantesDesdeDiagnostico(diag: IrsaDiagnosticApiResponse): Record<string, number> {
  return {
    NO2: diag.normNo2 * 100,
    O3: diag.normO3 * 110,
    "PM2.5": diag.normPm25 * 45,
  };
}

// ─── Sección de contaminantes (solo si hay datos reales del backend) ──────────

function ContaminantesSection({ diag }: { diag: IrsaDiagnosticApiResponse }) {
  const { no2Measurements, o3Measurements, pm25Measurements } = diag;
  const averagesByPollutant = contaminantesDesdeDiagnostico(diag);
  const no2  = averagesByPollutant["NO2"]   ?? null;
  const o3   = averagesByPollutant["O3"]    ?? null;
  const pm25 = averagesByPollutant["PM2.5"] ?? null;
  
  const totalMeasurements = no2Measurements + o3Measurements + pm25Measurements;

  if (totalMeasurements === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Calidad del Aire — Contaminantes
        </p>
        <p className="text-sm text-gray-400">Sin mediciones disponibles en las últimas 24 h</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">
        Calidad del Aire — Contaminantes (últimas 24 h)
      </p>
      <div className="grid grid-cols-3 gap-4">
        {no2 !== null && (
          <VariableCard
            icon={<Wind className="w-6 h-6 text-amber-400" />}
            label="NO₂ · Dióxido de Nitrógeno"
            value={`${no2.toFixed(1)}`}
            subLabel="µg/m³ · límite NOM: 210"
            riskTag={no2Tag(no2)}
          />
        )}
        {o3 !== null && (
          <VariableCard
            icon={<Gauge className="w-6 h-6 text-violet-400" />}
            label="O₃ · Ozono"
            value={`${o3.toFixed(1)}`}
            subLabel="µg/m³ · límite NOM: 140"
            riskTag={o3Tag(o3)}
          />
        )}
        {pm25 !== null && (
          <VariableCard
            icon={<Leaf className="w-6 h-6 text-emerald-400" />}
            label="PM2.5 · Part. finas"
            value={`${pm25.toFixed(1)}`}
            subLabel="µg/m³ · límite NOM: 45"
            riskTag={pm25Tag(pm25)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Badge de nivel de rezago social ─────────────────────────────────────────

const REZAGO_COLOR: Record<string, string> = {
  LOW:       "text-emerald-600 bg-emerald-50",
  MODERATE:  "text-yellow-600 bg-yellow-50",
  CRITICAL:  "text-red-600 bg-red-50",
  MEDIUM:    "text-yellow-600 bg-yellow-50",
  HIGH:      "text-orange-600 bg-orange-50",
  VERY_HIGH: "text-red-600 bg-red-50",
  "N/D":     "text-gray-500 bg-gray-100",
};

// ─── Página ───────────────────────────────────────────────────────────────────

export function DetalleAlcaldiaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedAlcaldia } = useRiskStore();
  const { detalle, diagRaw } = useDetalleAlcaldia(selectedAlcaldia);

  // Mapear el ID de la alcaldía para la suscripción
  const municipalityId = getAlcaldiaId(selectedAlcaldia);
  // TODO: Obtener el ID numérico del usuario desde el backend. Por ahora usamos un mock o asumimos que se manejará.
  const mockUserId = 1; 
  
  const { isSubscribed, toggleSubscription, loading: loadingAlert } = useAlerts(user ? mockUserId : null, municipalityId);

  const data = detalle ?? getDetalleAlcaldia(selectedAlcaldia ?? "");

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-5 overflow-y-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al mapa
      </button>

      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Alcaldía {data.nombre}</h1>
            <p className="text-sm text-gray-500 mt-1">{data.ciudad}</p>
          </div>
          <button
            onClick={toggleSubscription}
            disabled={loadingAlert}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm",
              isSubscribed 
                ? "bg-primary text-white hover:bg-primary/90" 
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
            )}
          >
            {loadingAlert ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSubscribed ? (
              <BellOff className="w-4 h-4" />
            ) : (
              <Bell className="w-4 h-4" />
            )}
            {isSubscribed ? "Quitar alerta" : "Notificarme"}
          </button>
        </div>
        {diagRaw && (
          <div className="flex flex-col items-end gap-1">
            <span
              className={cn(
                "text-[11px] font-semibold px-2.5 py-1 rounded-full",
                REZAGO_COLOR[diagRaw.riskLevel] ?? REZAGO_COLOR["N/D"]
              )}
            >
              Riesgo: {(diagRaw.riskLevel || "N/D").replace("_", " ")}
            </span>
            <span className="text-[10px] text-gray-400">
              {diagRaw.no2Measurements + diagRaw.o3Measurements + diagRaw.pm25Measurements} medición(es) en 24 h
            </span>
          </div>
        )}
      </div>

      {/* Índice IRSA */}
      <IRSACard
        irsa={data.irsa}
        irsaMax={data.irsaMax}
        descripcion={data.irsaDescripcion}
        esDatoReal={!!diagRaw}
      />

      {/* Puntajes del motor IRSA (solo con datos reales) */}
      {diagRaw && (
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Composición del Índice IRSA
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Calidad del Aire", score: diagRaw.pollutantScore * 100,                  color: "bg-cyan-400"   },
              { label: "Clima",            score: ((diagRaw.normUv + diagRaw.normTmp) / 2) * 100, color: "bg-sky-400"    },
              { label: "Vulnerabilidad",   score: Math.min(100, (diagRaw.vulnerabilityFactor / 2) * 100), color: "bg-purple-400" },
            ].map(({ label, score, color }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-500">{label}</span>
                  <span className="text-xs font-bold text-gray-700">{score.toFixed(0)}/100</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Variables meteorológicas */}
      <VariablesGrid variables={data.variables} />

      {/* Contaminantes individuales */}
      {diagRaw && <ContaminantesSection diag={diagRaw} />}
    </div>
  );
}

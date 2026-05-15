import { ArrowLeft, Wind, Gauge, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRiskStore } from "@/store/useRiskStore";
import { useDetalleAlcaldia } from "@/hooks/useDetalleAlcaldia";
import { getDetalleAlcaldia, type RiskTag } from "@/Components/modules/detalle-alcaldia/detalle-alcaldia-data";
import { IRSACard } from "@/Components/modules/detalle-alcaldia/IRSACard";
import { VariablesGrid } from "@/Components/modules/detalle-alcaldia/VariablesGrid";
import { VariableCard } from "@/Components/modules/detalle-alcaldia/VariableCard";
import { cn } from "@/lib/utils";
import type { IrsaDiagnosticoApiResponse } from "@/hooks/useDetalleAlcaldia";

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

// ─── Sección de contaminantes (solo si hay datos reales del backend) ──────────

function ContaminantesSection({ diag }: { diag: IrsaDiagnosticoApiResponse }) {
  const { promediosPorContaminante, medicionesAireEncontradas } = diag;
  const no2  = promediosPorContaminante["NO2"]   ?? null;
  const o3   = promediosPorContaminante["O3"]    ?? null;
  const pm25 = promediosPorContaminante["PM2.5"] ?? null;

  if (medicionesAireEncontradas === 0) {
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
  BAJO:     "text-emerald-600 bg-emerald-50",
  MEDIO:    "text-yellow-600 bg-yellow-50",
  ALTO:     "text-orange-600 bg-orange-50",
  MUY_ALTO: "text-red-600 bg-red-50",
  "N/D":    "text-gray-500 bg-gray-100",
};

// ─── Página ───────────────────────────────────────────────────────────────────

export function DetalleAlcaldiaPage() {
  const navigate = useNavigate();
  const { selectedAlcaldia } = useRiskStore();
  const { detalle, diagRaw, loading } = useDetalleAlcaldia(selectedAlcaldia);

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
        <div>
          <h1 className="text-3xl font-black text-gray-900">Alcaldía {data.nombre}</h1>
          <p className="text-sm text-gray-500 mt-1">{data.ciudad}</p>
          {loading && (
            <p className="text-xs text-blue-400 mt-1">Cargando datos en tiempo real...</p>
          )}
        </div>
        {diagRaw && (
          <div className="flex flex-col items-end gap-1">
            <span
              className={cn(
                "text-[11px] font-semibold px-2.5 py-1 rounded-full",
                REZAGO_COLOR[diagRaw.nivelRezagoSocial] ?? REZAGO_COLOR["N/D"]
              )}
            >
              Rezago social: {diagRaw.nivelRezagoSocial.replace("_", " ")}
            </span>
            <span className="text-[10px] text-gray-400">
              {diagRaw.medicionesAireEncontradas} medición(es) en 24 h
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
              { label: "Calidad del Aire", score: diagRaw.puntajeAire,           color: "bg-cyan-400"   },
              { label: "Clima",            score: diagRaw.puntajeClima,           color: "bg-sky-400"    },
              { label: "Factor Social",    score: diagRaw.puntajeSocioeconomico,  color: "bg-purple-400" },
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

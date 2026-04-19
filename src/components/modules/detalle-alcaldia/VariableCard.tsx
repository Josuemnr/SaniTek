import { cn } from "@/lib/utils";
import type { RiskTag } from "./detalle-alcaldia-data";
import { RISK_TAG_COLOR } from "./detalle-alcaldia-data";

interface VariableCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subLabel: string;
  riskTag?: RiskTag;
}

export function VariableCard({ icon, label, value, subLabel, riskTag }: VariableCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-2xl">{icon}</span>
        {riskTag && (
          <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", RISK_TAG_COLOR[riskTag])}>
            {riskTag}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-black text-gray-800 mt-0.5">{value}</p>
        <p className="text-[11px] text-gray-400 mt-1">{subLabel}</p>
      </div>
    </div>
  );
}

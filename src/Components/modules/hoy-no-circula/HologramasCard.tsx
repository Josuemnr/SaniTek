import { Ban, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type HologramaInfo } from "./circula-data";

interface HologramasCardProps {
  hologramas: HologramaInfo[];
}

export function HologramasCard({ hologramas }: HologramasCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-blue-500 shrink-0" />
        <h3 className="font-semibold text-gray-800 text-sm">Hologramas</h3>
      </div>
      <div className="flex flex-col gap-2">
        {hologramas.map((h) => (
          <div
            key={h.type}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2",
              h.restricted ? "bg-amber-50" : "bg-emerald-50"
            )}
          >
            <span
              className={cn(
                "w-8 h-8 rounded-lg text-white text-xs font-bold flex items-center justify-center shrink-0",
                h.badgeColor
              )}
            >
              {h.type}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 leading-tight">{h.label}</p>
              <p className="text-xs text-gray-500">{h.restricted ? "No circula" : "Exento"}</p>
            </div>
            {h.restricted ? (
              <Ban className="w-5 h-5 text-red-500 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

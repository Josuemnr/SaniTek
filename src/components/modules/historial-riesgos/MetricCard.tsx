import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  subColor?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ label, value, sub, subColor, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex flex-col gap-1 flex-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      {sub && (
        <span className={cn("text-xs font-medium", subColor ?? "text-gray-400")}>{sub}</span>
      )}
    </div>
  );
}

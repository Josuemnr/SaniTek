import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DataPoint } from "./historial-data";

interface SanidadChartProps {
  data: DataPoint[];
}

export function SanidadChart({ data }: SanidadChartProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col flex-1 min-h-0">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Índice de Sanidad Ambiental — Ciudad de México
      </h2>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientIndice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientTendencia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#94a3b8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 100]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />

            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(value: number, name: string) => [
                value,
                name === "indice" ? "Índice de Sanidad" : "Tendencia",
              ]}
            />

            <Legend
              formatter={(value) =>
                value === "indice" ? "Índice de Sanidad" : "Tendencia"
              }
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />

            <Area
              type="monotone"
              dataKey="tendencia"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="url(#gradientTendencia)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="indice"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#gradientIndice)"
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

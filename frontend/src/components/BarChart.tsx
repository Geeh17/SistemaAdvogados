import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: { mes: number; total: number }[];
  titulo: string;
}

export default function BarChartComponent({ data, titulo }: BarChartProps) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{titulo}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

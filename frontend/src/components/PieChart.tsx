import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartProps {
  data: { nome: string; total: number }[];
}

const COLORS = ["#2563EB", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];

export default function PieChartComponent({ data }: PieChartProps) {
  const formattedData = data.map((item) => ({
    name: item.nome, // agora usa o nome do advogado
    value: item.total, // e o total de clientes
  }));

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Ranking de Advogados
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {formattedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

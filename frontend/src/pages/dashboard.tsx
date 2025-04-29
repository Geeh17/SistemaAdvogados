import { useEffect, useState } from "react";
import axios from "@/services/api";
import Layout from "@/components/Layout";
import PrivateRoute from "@/components/PrivateRoute";
import { Users, ClipboardList, CalendarDays } from "lucide-react";

interface DashboardData {
  totalClientes: number;
  totalFichas: number;
  fichasPorMes: { mes: number; total: number }[];
}

export default function HomePage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    axios.get("/dashboard").then((res) => setDashboard(res.data));
  }, []);

  return (
    <PrivateRoute>
      <Layout>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Painel Administrativo
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Total de Clientes"
            value={dashboard?.totalClientes || 0}
            icon={<Users className="w-6 h-6 text-white" />}
          />
          <Card
            title="Total de Fichas"
            value={dashboard?.totalFichas || 0}
            icon={<ClipboardList className="w-6 h-6 text-white" />}
          />
          <Card
            title="Fichas este mês"
            value={dashboard?.fichasPorMes?.[0]?.total || 0}
            icon={<CalendarDays className="w-6 h-6 text-white" />}
          />
        </div>
      </Layout>
    </PrivateRoute>
  );
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function Card({ title, value, icon }: CardProps) {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>
      <div className="bg-blue-800 p-3 rounded-full">{icon}</div>
    </div>
  );
}

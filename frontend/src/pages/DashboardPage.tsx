import { useEffect, useState } from "react";
import axios from "../services/api";
import { DashboardResumo } from "../types/DashboardResumo";

export default function DashboardPage() {
  const [dados, setDados] = useState<DashboardResumo>({
    totalClientes: 0,
    totalFichas: 0,
    totalFichasMes: 0,
  });

  useEffect(() => {
    axios.get<DashboardResumo>("/dashboard").then((res) => setDados(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p>Total de clientes: {dados.totalClientes}</p>
      <p>Total de fichas: {dados.totalFichas}</p>
      <p>Fichas este mês: {dados.totalFichasMes}</p>
    </div>
  );
}

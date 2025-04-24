import Layout from "@/components/Layout";
import CardResumo from "@/components/CardResumo";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function HomePage() {
  const [dados, setDados] = useState({
    totalClientes: 0,
    totalFichas: 0,
    totalFichasMes: 0,
  });

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setDados(res.data))
      .catch(err => console.error("Erro ao carregar dashboard", err));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bem Vindo!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <CardResumo titulo="Total de Clientes" valor={dados.totalClientes} cor="bg-blue-100" />
        <CardResumo titulo="Total de Fichas" valor={dados.totalFichas} cor="bg-green-100" />
        <CardResumo titulo="Fichas Este Mês" valor={dados.totalFichasMes} cor="bg-yellow-100" />
      </div>
    </Layout>
  );
}

import Layout from "@/components/Layout";
import PrivateRoute from "@/components/PrivateRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

export default function HomePage() {
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalFichas, setTotalFichas] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(
    new Date()
  );

  useEffect(() => {
    setTotalClientes(42);
    setTotalFichas(17);
  }, []);

  const dadosGrafico = [
    { mes: "Jan", fichas: 4 },
    { mes: "Fev", fichas: 7 },
    { mes: "Mar", fichas: 5 },
    { mes: "Abr", fichas: 1 },
    { mes: "Mai", fichas: 8 },
  ];

  const acoesRecentes = [
    { acao: "Criou ficha para João", data: "2025-04-27" },
    { acao: "Editou cliente Maria", data: "2025-04-26" },
    { acao: "Visualizou ficha de Ana", data: "2025-04-25" },
  ];

  return (
    <PrivateRoute>
      <Layout>
        <div className="max-w-7xl mx-auto py-10 px-4">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Sistema de Gestão Jurídica Integrada
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Organize, acompanhe e otimize suas atividades jurídicas com
            praticidade e eficiência.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Link href="/clientes">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 hover:shadow-md transition min-h-[130px] flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                  Clientes
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Gerencie seus clientes cadastrados.
                </p>
              </div>
            </Link>
            <Link href="/fichas">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 hover:shadow-md transition min-h-[130px] flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                  Fichas
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Visualize e edite as fichas vinculadas aos clientes.
                </p>
              </div>
            </Link>
            <Link href="/configuracoes">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 hover:shadow-md transition min-h-[130px] flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                  Meu Perfil
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Atualize seus dados e configurações.
                </p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold dark:text-white mb-4">
                Resumo
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
                  <p>Total de Clientes</p>
                  <h3 className="text-2xl font-bold">{totalClientes}</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg">
                  <p>Total de Fichas</p>
                  <h3 className="text-2xl font-bold">{totalFichas}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold dark:text-white mb-4">
                Fichas por Mês
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dadosGrafico}>
                  <XAxis dataKey="mes" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Bar dataKey="fichas" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-10">
            <h2 className="text-lg font-semibold dark:text-white mb-4">
              Últimas Ações
            </h2>
            <ul className="space-y-2">
              {acoesRecentes.map((acao, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                >
                  <span>{acao.acao}</span>
                  <span className="text-gray-400">{acao.data}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-10">
            <h2 className="text-lg font-semibold dark:text-white mb-4">
              Próximos Compromissos
            </h2>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>27/04:</strong> Audiência - Cliente João
              </li>
              <li>
                <strong>28/04:</strong> Reunião com Maria
              </li>
              <li>
                <strong>29/04:</strong> Encerramento de processo - Ana
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-10">
            <h2 className="text-lg font-semibold dark:text-white mb-4">
              Calendário
            </h2>
            <DatePicker
              locale="pt-BR"
              selected={dataSelecionada}
              onChange={(date: Date | null) => {
                if (date) setDataSelecionada(date);
              }}
              inline
              calendarStartDay={0}
            />
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}

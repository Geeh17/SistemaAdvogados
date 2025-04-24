import Layout from "@/components/Layout";
import PrivateRoute from "@/components/PrivateRoute";
import Link from "next/link";

export default function HomePage() {
  return (
    <PrivateRoute>
      <Layout>
        <div className="max-w-7xl mx-auto py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo ao Sistema de Advogados</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/clientes">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-blue-700">Clientes</h2>
                <p className="text-gray-600 mt-2">Gerencie seus clientes cadastrados.</p>
              </div>
            </Link>

            <Link href="/fichas">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-blue-700">Fichas</h2>
                <p className="text-gray-600 mt-2">Visualize e edite as fichas vinculadas aos clientes.</p>
              </div>
            </Link>

            <Link href="/perfil">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-blue-700">Meu Perfil</h2>
                <p className="text-gray-600 mt-2">Atualize seus dados e configurações.</p>
              </div>
            </Link>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}

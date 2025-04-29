import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/services/api";
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

interface Usuario {
  nome: string;
  email: string;
  role: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const res = await axios.get("/usuarios/perfil");
        setUsuario(res.data);
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
      }
    }

    carregarUsuario();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-6 flex flex-col">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm">Início</span>
        </button>

        {usuario && (
          <div className="text-sm border-b border-blue-700 pb-4 mb-4">
            <p className="font-medium">{usuario.nome}</p>
            <p className="text-blue-200 text-xs">{usuario.email}</p>
            <p className="text-blue-300 italic text-xs">{usuario.role}</p>
          </div>
        )}

        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/clientes"
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
            <Users className="w-5 h-5" />
            Clientes
          </Link>
          <Link
            href="/fichas"
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
            <FileText className="w-5 h-5" />
            Fichas
          </Link>

          {usuario?.role === "MASTER" && (
            <Link
              href="/configuracoes"
              className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
            >
              <Settings className="w-5 h-5" />
              Cadastro de usuario
            </Link>
          )}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white flex items-center gap-2 justify-center"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

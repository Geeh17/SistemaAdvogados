import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-6 flex flex-col">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm">Início</span>
        </button>


        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/clientes" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <Users className="w-5 h-5" />
            Clientes
          </Link>
          <Link href="/fichas" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FileText className="w-5 h-5" />
            Fichas
          </Link>
          <Link href="/configuracoes" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <Settings className="w-5 h-5" />
            Configurações
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white flex items-center gap-2 justify-center"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

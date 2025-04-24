import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-6 flex flex-col">
        <h2 className="text-2xl font-bold">Menu</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/home" className="hover:bg-blue-700 p-2 rounded">Dashboard</Link>
          <Link href="/clientes" className="hover:bg-blue-700 p-2 rounded">Clientes</Link>
          <Link href="/fichas" className="hover:bg-blue-700 p-2 rounded">Fichas</Link>
          <Link href="/configuracoes" className="hover:bg-blue-700 p-2 rounded">Configurações</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
        >
          Sair
        </button>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "../services/api";
import { Cliente } from "../types/Cliente";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    axios.get<Cliente[]>("/clientes").then((res) => setClientes(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <ul className="space-y-2">
        {clientes.map((c) => (
          <li key={c.id} className="border p-2 rounded shadow">
            {c.nome} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
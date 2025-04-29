import { useEffect, useState } from "react";
import axios from "@/services/api";
import Layout from "@/components/Layout";
import PrivateRoute from "@/components/PrivateRoute";
import { formatCPF, formatTelefone } from "@/utils/formatters";
import { Pencil, Trash2 } from "lucide-react";
import ModalCliente from "@/components/ModalCliente";

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  function fetchClientes() {
    axios.get("/clientes").then((res) => setClientes(res.data));
  }

  function handleSubmit(data: Omit<Cliente, "id">) {
    if (editingCliente) {
      axios.put(`/clientes/${editingCliente.id}`, data).then(() => {
        closeModal();
        fetchClientes();
      });
    } else {
      axios.post("/clientes", data).then(() => {
        closeModal();
        fetchClientes();
      });
    }
  }

  function handleDelete(clienteId: number) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      axios.delete(`/clientes/${clienteId}`).then(() => fetchClientes());
    }
  }

  function openModal(cliente?: Cliente) {
    if (cliente) setEditingCliente(cliente);
    else setEditingCliente(null);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingCliente(null);
  }

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpf.includes(busca) ||
      c.telefone.includes(busca)
  );

  return (
    <PrivateRoute>
      <Layout>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Novo Cliente
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar cliente..."
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="bg-white shadow rounded-lg overflow-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">CPF</th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Endereço
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {cliente.nome}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatCPF(cliente.cpf)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatTelefone(cliente.telefone)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {cliente.endereco}
                  </td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    <button
                      onClick={() => openModal(cliente)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Editar cliente"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Excluir cliente"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <ModalCliente
            isOpen={showModal}
            onClose={closeModal}
            onSubmit={handleSubmit}
            cliente={editingCliente}
          />
        )}
      </Layout>
    </PrivateRoute>
  );
}

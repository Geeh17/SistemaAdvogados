import { useEffect, useState } from "react";
import axios from "@/services/api";
import Layout from "@/components/Layout";
import PrivateRoute from "@/components/PrivateRoute";
import { formatCPF, formatTelefone } from "@/utils/formatters";

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  function fetchClientes() {
    axios.get("/clientes").then((res) => setClientes(res.data));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = { nome, cpf, telefone, endereco };

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

  function openModal(cliente?: Cliente) {
    if (cliente) {
      setEditingCliente(cliente);
      setNome(cliente.nome);
      setCpf(cliente.cpf);
      setTelefone(cliente.telefone);
      setEndereco(cliente.endereco);
    } else {
      setEditingCliente(null);
      setNome("");
      setCpf("");
      setTelefone("");
      setEndereco("");
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingCliente(null);
    setNome("");
    setCpf("");
    setTelefone("");
    setEndereco("");
  }

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

        <div className="bg-white shadow rounded-lg overflow-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-medium">CPF</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Telefone</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Endereço</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-800">{cliente.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatCPF(cliente.cpf)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatTelefone(cliente.telefone)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cliente.endereco}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => openModal(cliente)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Editar
                    </button>
                    <button className="text-red-600 hover:underline">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                {editingCliente ? "Editar Cliente" : "Cadastrar Cliente"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Endereço"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Layout>
    </PrivateRoute>
  );
}

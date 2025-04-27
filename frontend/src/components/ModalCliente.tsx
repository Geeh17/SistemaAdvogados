import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Cliente, "id">) => void;
  cliente: Cliente | null;
}

export default function ModalCliente({ isOpen, onClose, onSubmit, cliente }: Props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setCpf(cliente.cpf);
      setTelefone(cliente.telefone);
      setEndereco(cliente.endereco);
    } else {
      setNome("");
      setCpf("");
      setTelefone("");
      setEndereco("");
    }
  }, [cliente]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ nome, cpf, telefone, endereco });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {cliente ? "Editar Cliente" : "Cadastrar Cliente"}
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
          <InputMask
            mask="999.999.999-99"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <InputMask
            mask="(99) 99999-9999"
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
              onClick={onClose}
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
  );
}

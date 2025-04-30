import { useState } from "react";
import axios from "@/services/api";

interface ModalAndamentoProps {
  fichaId: number;
  onClose: () => void;
  onAdd: (novo: any) => void;
}

export default function ModalAndamento({
  fichaId,
  onClose,
  onAdd,
}: ModalAndamentoProps) {
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!descricao.trim()) return;

    try {
      const res = await axios.post("/andamentos", {
        fichaId,
        descricao,
      });
      onAdd(res.data);
      setDescricao("");
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar andamento", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Novo Andamento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Descreva o andamento"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

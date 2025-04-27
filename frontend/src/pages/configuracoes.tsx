import { useState, useEffect } from "react";
import axios from "@/services/api";
import Layout from "@/components/Layout";
import PrivateRoute from "@/components/PrivateRoute";

interface Usuario {
  nome: string;
  email: string;
  role: string;
}

export default function ConfiguracoesPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  // Exclusivo para cadastro de novos usuários
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenhaUsuario, setNovaSenhaUsuario] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await axios.get("/usuario");
        console.log("Usuário logado:", res.data); // 👀 debug
        setUsuario(res.data);
        setNome(res.data.nome);
        setEmail(res.data.email);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário", error);
      }
    }

    carregarDados();
  }, []);

  async function atualizarPerfil(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.put("/usuario", {
        nome,
        email,
        senhaAtual,
        novaSenha,
      });
      alert("Dados atualizados com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
    } catch (error) {
      alert("Erro ao atualizar dados");
      console.error(error);
    }
  }

  async function cadastrarNovoUsuario(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post("/usuarios", {
        nome: novoNome,
        email: novoEmail,
        senha: novaSenhaUsuario,
      });
      alert("Novo usuário cadastrado com sucesso!");
      setNovoNome("");
      setNovoEmail("");
      setNovaSenhaUsuario("");
    } catch (error) {
      alert("Erro ao cadastrar usuário");
      console.error(error);
    }
  }

  return (
    <PrivateRoute>
      <Layout>
        <div className="max-w-5xl mx-auto py-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Configurações da Conta</h1>

          <form onSubmit={atualizarPerfil} className="space-y-5 mb-10">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nova senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Salvar alterações
            </button>
          </form>

          {usuario && usuario.role?.toUpperCase() === "MASTER" && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Painel Administrativo (MASTER)</h2>

              <form onSubmit={cadastrarNovoUsuario} className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Cadastrar novo usuário</h3>
                <input
                  type="text"
                  placeholder="Nome"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={novaSenhaUsuario}
                  onChange={(e) => setNovaSenhaUsuario(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Cadastrar usuário
                </button>
              </form>

              <p className="text-gray-600 italic">
                🔧 Seções adicionais como produtividade, acessos e histórico virão aqui.
              </p>
            </div>
          )}
        </div>
      </Layout>
    </PrivateRoute>
  );
}

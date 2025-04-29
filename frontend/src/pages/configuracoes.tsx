import { useEffect, useState } from "react";
import axios from "@/services/api";
import Layout from "@/components/Layout";
import PrivateRoute from "@/components/PrivateRoute";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
}

export default function ConfiguracoesPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // << lista de usuários
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenhaUsuario, setNovaSenhaUsuario] = useState("");

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const res = await axios.get("/usuarios/perfil");
        setUsuario(res.data);
        setNome(res.data.nome);
        setEmail(res.data.email);

        if (res.data.role === "MASTER") {
          carregarUsuarios(); // se MASTER, carrega também todos os usuários
        }
      } catch (error) {
        console.error("Erro ao carregar perfil", error);
      }
    }

    carregarPerfil();
  }, []);

  async function carregarUsuarios() {
    try {
      const res = await axios.get("/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
    }
  }

  async function atualizarPerfil(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.put("/usuarios/perfil", {
        nome,
        email,
        senhaAtual,
        novaSenha,
      });
      alert("Perfil atualizado com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
    } catch (error) {
      alert("Erro ao atualizar perfil");
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
        role: "ADVOGADO", // novo usuário sempre será ADVOGADO
      });
      alert("Novo usuário cadastrado com sucesso!");
      setNovoNome("");
      setNovoEmail("");
      setNovaSenhaUsuario("");
      carregarUsuarios(); // recarrega lista
    } catch (error) {
      alert("Erro ao cadastrar usuário");
      console.error(error);
    }
  }

  async function alterarRole(id: number, novoRole: string) {
    try {
      await axios.put(`/usuarios/${id}`, { role: novoRole });
      alert("Role atualizado com sucesso!");
      carregarUsuarios(); // recarrega lista
    } catch (error) {
      alert("Erro ao atualizar role");
      console.error(error);
    }
  }

  return (
    <PrivateRoute>
      <Layout>
        <div className="max-w-6xl mx-auto py-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Configurações da Conta
          </h1>

          {/* Atualizar perfil */}
          <form onSubmit={atualizarPerfil} className="space-y-5 mb-10">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha atual
              </label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nova senha
              </label>
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

          {/* Apenas para usuários MASTER */}
          {usuario?.role === "MASTER" && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-10">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Cadastrar novo usuário
                </h2>

                <form onSubmit={cadastrarNovoUsuario} className="space-y-4">
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
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Usuários cadastrados
                </h2>

                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Nome</th>
                      <th className="text-left p-3">E-mail</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-center p-3">Alterar Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id} className="border-b">
                        <td className="p-3">{u.nome}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">{u.role}</td>
                        <td className="p-3 text-center">
                          <select
                            value={u.role}
                            onChange={(e) => alterarRole(u.id, e.target.value)}
                            className="p-2 border rounded-md"
                          >
                            <option value="MASTER">MASTER</option>
                            <option value="ADVOGADO">ADVOGADO</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </PrivateRoute>
  );
}

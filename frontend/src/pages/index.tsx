import { useState } from "react";
import axios from "@/services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { email, senha });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/home";
    } catch (err) {
      alert("Credenciais inválidas!");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 text-center"
      >
         <img src="/logo.png" alt="Logo" className="h-28 mx-auto mb-2" style={{ maxWidth: "180px" }} />

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

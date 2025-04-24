import express from "express";
import dotenv from "dotenv"; 
import cors from "cors"; // ✅ Importa o pacote CORS
dotenv.config(); 

import usuarioRoutes from "./routes/usuarios";
import clienteRoutes from "./routes/clientes";
import fichaRoutes from "./routes/fichas";
import dashboardRoutes from "./routes/dashboard";
import authRoutes from "./routes/auth"; 

const app = express();

// ✅ Habilita CORS para permitir o front (localhost:5173)
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use(authRoutes); 

// Rotas protegidas
app.use("/usuarios", usuarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/fichas", fichaRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3000, () => {
  console.log("✅ Servidor rodando na porta 3000");
  console.log("🌐 API disponível em: http://localhost:3000");
});

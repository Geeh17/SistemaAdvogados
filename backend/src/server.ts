import express from "express";
import dotenv from "dotenv"; 
dotenv.config(); 

import usuarioRoutes from "./routes/usuarios";
import clienteRoutes from "./routes/clientes";
import fichaRoutes from "./routes/fichas";
import dashboardRoutes from "./routes/dashboard";
import authRoutes from "./routes/auth"; 

const app = express();
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

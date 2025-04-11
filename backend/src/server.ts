import express from "express";
import { prisma } from "./prisma/client";
import usuarioRoutes from "./routes/usuarios";

const app = express();
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.get("/", async (req, res) => {
  res.send("Sistema de Advocacia - API Online 👨‍⚖️");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

import express from "express";
import usuarioRoutes from "./routes/usuarios";

const app = express();
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

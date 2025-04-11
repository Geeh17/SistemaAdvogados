import express from "express";
import usuarioRoutes from "./routes/usuarios";
import clienteRoutes from "./routes/clientes";
import fichaRoutes from "./routes/fichas";



const app = express();
app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/fichas", fichaRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

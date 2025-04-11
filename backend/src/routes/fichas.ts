import { Router } from "express";
import { criarFicha, listarFichasDoCliente } from "../controllers/fichaController";
import { autenticar } from "../middleware/auth";

const router = Router();

router.post("/:clienteId", autenticar, criarFicha);
router.get("/:clienteId", autenticar, listarFichasDoCliente);

export default router;

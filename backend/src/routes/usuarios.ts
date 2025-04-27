import { Router } from "express";
import {
  criarUsuario,
  listarUsuarios,
  obterUsuario
} from "../controllers/usuarioController";
import { authorize } from "../middleware/authorize";
import { autenticar } from "../middleware/auth";

const router = Router();

router.get("/usuario", autenticar, obterUsuario);
router.post("/", criarUsuario);
router.get("/", listarUsuarios);
router.get("/usuarios", autenticar, authorize("MASTER"), listarUsuarios);

export default router;

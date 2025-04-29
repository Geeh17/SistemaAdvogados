import { Router } from "express";
import {
  criarUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  atualizarUsuarioPorId,
  deletarUsuario,
  obterUsuario,
  atualizarUsuario,
} from "../controllers/usuarioController";

import { autenticar } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/perfil", autenticar, obterUsuario);
router.put("/perfil", autenticar, atualizarUsuario);

router.post("/", autenticar, authorize("MASTER"), criarUsuario);
router.get("/", autenticar, authorize("MASTER"), listarUsuarios);
router.get("/:id", autenticar, authorize("MASTER"), obterUsuarioPorId);
router.put("/:id", autenticar, authorize("MASTER"), atualizarUsuarioPorId);
router.delete("/:id", autenticar, authorize("MASTER"), deletarUsuario);

export default router;

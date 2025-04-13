import { Router } from "express";
import { criarUsuario, listarUsuarios } from "../controllers/usuarioController";
import { authorize } from "../middleware/authorize";
import { autenticar } from "../middleware/auth";

const router = Router();

router.post("/", criarUsuario);
router.get("/", listarUsuarios); 
router.get("/usuarios", autenticar, authorize("MASTER"), listarUsuarios); 

export default router;

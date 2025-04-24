import { Router } from "express";
import { autenticar } from "../middleware/auth";
import { getDashboard } from "../controllers/DashboardController";

const router = Router();

router.get("/", autenticar, getDashboard);

export default router;

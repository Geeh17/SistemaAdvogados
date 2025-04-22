import { Router, Request, Response } from "express";
import { prisma } from "../prisma/client";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!usuario || usuario.senha !== senha) {
    res.status(401).json({ message: "Credenciais inválidas" });
    return;
  }

  const token = jwt.sign(
    { id: usuario.id, role: usuario.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;

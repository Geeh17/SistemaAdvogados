import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

router.get('/', autenticar, async (req, res) => {
  try {
    const totalClientes = await prisma.cliente.count();
    const totalFichas = await prisma.ficha.count();

    const fichasPorMes = await prisma.$queryRawUnsafe<any[]>(`
      SELECT MONTH(data) as mes, COUNT(*) as total
      FROM Ficha
      GROUP BY MONTH(data)
      ORDER BY mes DESC
      LIMIT 6
    `);

    res.json({ totalClientes, totalFichas, fichasPorMes });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar dashboard', error });
  }
});

export default router;

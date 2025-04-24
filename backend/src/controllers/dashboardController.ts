import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboard(req: Request, res: Response) {
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

    res.json({
      totalClientes: Number(totalClientes),
      totalFichas: Number(totalFichas),
      fichasPorMes: fichasPorMes.map((item) => ({
        mes: item.mes,
        total: Number(item.total),
      })),
    });
  } catch (error) {
    console.error("Erro no dashboard:", error);
    res.status(500).json({ message: 'Erro ao carregar dashboard', error });
  }
}

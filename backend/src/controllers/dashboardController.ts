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

    const parsedFichasPorMes = fichasPorMes.map((item) => ({
      mes: Number(item.mes),
      total: Number(item.total),
    }));

    res.json({
      totalClientes: Number(totalClientes),
      totalFichas: Number(totalFichas),
      fichasPorMes: parsedFichasPorMes,
    });
  } catch (error) {
    console.error("Erro no dashboard:", error);
    res.status(500).json({ message: "Erro ao carregar dashboard", error });
  }
}

export async function getClientesPorMes(req: Request, res: Response) {
  try {
    const clientesPorMes = await prisma.$queryRawUnsafe<any[]>(`
      SELECT MONTH(createdAt) as mes, COUNT(*) as total
      FROM Cliente
      GROUP BY MONTH(createdAt)
      ORDER BY mes DESC
      LIMIT 6
    `);

    const parsedClientesPorMes = clientesPorMes.map((item) => ({
      mes: Number(item.mes),
      total: Number(item.total),
    }));

    res.json(parsedClientesPorMes);
  } catch (error) {
    console.error("Erro ao buscar clientes por mês:", error);
    res.status(500).json({ message: "Erro ao buscar clientes por mês", error });
  }
}

export async function getRankingAdvogados(req: Request, res: Response) {
  try {
    const ranking = await prisma.cliente.groupBy({
      by: ["usuarioId"],
      _count: { id: true },
      orderBy: {
        _count: { id: "desc" },
      },
    });

    const rankingComNomes = await Promise.all(
      ranking.map(async (item) => {
        const usuario = await prisma.usuario.findUnique({
          where: { id: item.usuarioId },
          select: { nome: true },
        });

        return {
          nome: usuario?.nome || `ID ${item.usuarioId}`,
          total: item._count.id,
        };
      })
    );

    res.json(rankingComNomes);
  } catch (error) {
    console.error("Erro ao buscar ranking de advogados:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar ranking de advogados", error });
  }
}

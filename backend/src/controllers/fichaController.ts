
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarFicha = async (req: Request, res: Response): Promise<void> => {
  try {
    const { descricao } = req.body;
    const clienteId = Number(req.params.clienteId);

    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const cliente = await prisma.cliente.findFirst({
      where: usuario?.role === "MASTER" ? { id: clienteId } : { id: clienteId, usuarioId: req.usuarioId }
    });

    if (!cliente) {
      res.status(404).json({ erro: "Cliente não encontrado ou não pertence a este usuário" });
      return;
    }

    const ficha = await prisma.ficha.create({
      data: {
        descricao,
        clienteId,
      },
    });

    res.status(201).json(ficha);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar ficha", detalhes: error });
  }
};

export const listarFichasDoCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const clienteId = Number(req.params.clienteId);

    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const cliente = await prisma.cliente.findFirst({
      where: usuario?.role === "MASTER" ? { id: clienteId } : { id: clienteId, usuarioId: req.usuarioId }
    });

    if (!cliente) {
      res.status(404).json({ erro: "Cliente não encontrado ou não pertence a este usuário" });
      return;
    }

    const fichas = await prisma.ficha.findMany({
      where: { clienteId },
      orderBy: { data: "desc" },
    });

    res.json(fichas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar fichas", detalhes: error });
  }
};

import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const listarCompromissos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarioId = req.usuarioId;
    if (!usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const compromissos = await prisma.compromisso.findMany({
      where: { usuarioId },
      orderBy: { dataHora: "asc" },
    });

    res.status(200).json(compromissos);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao listar compromissos", detalhes: error });
  }
};

export const criarCompromisso = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarioId = req.usuarioId;
    if (!usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const { titulo, descricao, dataHora, tipo } = req.body;

    const compromisso = await prisma.compromisso.create({
      data: {
        titulo,
        descricao,
        dataHora: new Date(dataHora),
        tipo,
        usuarioId,
      },
    });

    res.status(201).json(compromisso);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao criar compromisso", detalhes: error });
  }
};

export const deletarCompromisso = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.compromisso.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar compromisso", detalhes: error });
  }
};

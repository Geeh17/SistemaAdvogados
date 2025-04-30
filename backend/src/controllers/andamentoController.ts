import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const criarAndamento = async (req: Request, res: Response) => {
  try {
    const { descricao, fichaId } = req.body;

    const andamento = await prisma.andamento.create({
      data: {
        descricao,
        fichaId,
      },
    });

    res.status(201).json(andamento);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar andamento", detalhes: error });
  }
};

export const listarAndamentosPorFicha = async (req: Request, res: Response) => {
  try {
    const fichaId = parseInt(req.params.fichaId);

    const andamentos = await prisma.andamento.findMany({
      where: { fichaId },
      orderBy: { data: "desc" },
    });

    res.status(200).json(andamentos);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao listar andamentos", detalhes: error });
  }
};

export const deletarAndamento = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.andamento.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar andamento", detalhes: error });
  }
};

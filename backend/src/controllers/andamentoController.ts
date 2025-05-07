import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { z } from "zod";
import { logAction } from "../utils/logAction";

const andamentoSchema = z.object({
  descricao: z
    .string()
    .min(5, "Descrição é obrigatória e deve ter no mínimo 5 caracteres"),
  fichaId: z.number().int().positive("ID da ficha deve ser um número positivo"),
});

export const criarAndamento = async (req: Request, res: Response) => {
  try {
    const dados = andamentoSchema.parse({
      descricao: req.body.descricao,
      fichaId: Number(req.body.fichaId),
    });

    const andamento = await prisma.andamento.create({
      data: dados,
    });

    await logAction({
      acao: "CREATE",
      tabela: "Andamento",
      registroId: andamento.id,
      usuarioId: req.usuarioId!,
    });

    res.status(201).json(andamento);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ erro: "Dados inválidos", detalhes: error.errors });
    } else {
      res
        .status(500)
        .json({ erro: "Erro ao criar andamento", detalhes: error });
    }
  }
};

export const listarAndamentosPorFicha = async (req: Request, res: Response) => {
  try {
    const fichaId = Number(req.params.fichaId);

    if (isNaN(fichaId) || fichaId <= 0) {
      res.status(400).json({ erro: "ID da ficha inválido" });
      return;
    }

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
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      res.status(400).json({ erro: "ID inválido" });
      return;
    }

    await prisma.andamento.delete({
      where: { id },
    });

    await logAction({
      acao: "DELETE",
      tabela: "Andamento",
      registroId: id,
      usuarioId: req.usuarioId!,
    });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar andamento", detalhes: error });
  }
};

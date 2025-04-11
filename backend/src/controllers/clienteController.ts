
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, cpf, telefone, endereco } = req.body;
    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const cliente = await prisma.cliente.create({
      data: {
        nome,
        cpf,
        telefone,
        endereco,
        usuarioId: req.usuarioId,
      },
    });

    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar cliente", detalhes: error });
  }
};

export const listarClientes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const clientes = await prisma.cliente.findMany({
      where: usuario?.role === "MASTER" ? {} : { usuarioId: req.usuarioId },
      include: { fichas: true },
    });

    res.json(clientes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar clientes", detalhes: error });
  }
};

export const buscarClientePorId = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const id = Number(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const cliente = await prisma.cliente.findFirst({
      where: usuario?.role === "MASTER" ? { id } : { id, usuarioId: req.usuarioId },
      include: { fichas: true },
    });

    if (!cliente) {
      res.status(404).json({ erro: "Cliente não encontrado" });
      return;
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar cliente", detalhes: error });
  }
};

export const atualizarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const id = Number(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const cliente = await prisma.cliente.findFirst({
      where: usuario?.role === "MASTER" ? { id } : { id, usuarioId: req.usuarioId }
    });

    if (!cliente) {
      res.status(404).json({ erro: "Cliente não encontrado" });
      return;
    }

    const { nome, cpf, telefone, endereco } = req.body;

    const atualizado = await prisma.cliente.update({
      where: { id },
      data: { nome, cpf, telefone, endereco },
    });

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar cliente", detalhes: error });
  }
};

export const deletarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const id = Number(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const cliente = await prisma.cliente.findFirst({
      where: usuario?.role === "MASTER" ? { id } : { id, usuarioId: req.usuarioId }
    });

    if (!cliente) {
      res.status(404).json({ erro: "Cliente não encontrado" });
      return;
    }

    await prisma.cliente.delete({ where: { id } });

    res.json({ mensagem: "Cliente deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar cliente", detalhes: error });
  }
};

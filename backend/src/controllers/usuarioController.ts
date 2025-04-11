import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const criarUsuario = async (req: Request, res: Response) => {
  const { nome, email, senha, role } = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ erro: "Usuário já existe." });
    }

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        role
      }
    });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar usuário." });
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar usuários." });
  }
};

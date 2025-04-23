import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import bcrypt from "bcryptjs";

export async function criarUsuario(req: Request, res: Response): Promise<void> {
  const { nome, email, senha, role } = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });

    if (usuarioExistente) {
      res.status(400).json({ erro: "Usuário já existe." });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, role }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar usuário.", detalhes: error });
  }
}

export async function listarUsuarios(req: Request, res: Response): Promise<void> {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar usuários.", detalhes: error });
  }
}

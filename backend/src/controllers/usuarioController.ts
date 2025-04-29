import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import bcrypt from "bcryptjs";

export async function criarUsuario(req: Request, res: Response): Promise<void> {
  const { nome, email, senha, role } = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      res.status(400).json({ erro: "Usuário já existe." });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, role },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar usuário.", detalhes: error });
  }
}

export async function listarUsuarios(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar usuários.", detalhes: error });
  }
}

export async function obterUsuarioPorId(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
      },
    });

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao obter usuário.", detalhes: error });
  }
}

export async function atualizarUsuarioPorId(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { nome, email, role } = req.body;

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuarioExistente) {
      res.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome, email, role },
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar usuário.", detalhes: error });
  }
}

export async function deletarUsuario(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuarioExistente) {
      res.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    await prisma.usuario.delete({
      where: { id: Number(id) },
    });

    res.json({ mensagem: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar usuário.", detalhes: error });
  }
}

export async function obterUsuario(req: Request, res: Response): Promise<void> {
  try {
    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado." });
      return;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
      },
    });

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao obter usuário logado.", detalhes: error });
  }
}

export async function atualizarUsuario(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { nome, email, senhaAtual, novaSenha } = req.body;

    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado." });
      return;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
    });

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    if (senhaAtual && novaSenha) {
      const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!senhaValida) {
        res.status(401).json({ erro: "Senha atual incorreta." });
        return;
      }

      const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
      await prisma.usuario.update({
        where: { id: req.usuarioId },
        data: { nome, email, senha: novaSenhaHash },
      });
    } else {
      await prisma.usuario.update({
        where: { id: req.usuarioId },
        data: { nome, email },
      });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar perfil.", detalhes: error });
  }
}

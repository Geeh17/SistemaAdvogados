import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const criarUsuarioSchema = z.object({
  nome: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["MASTER", "ADVOGADO"]),
});

const atualizarUsuarioSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  role: z.enum(["MASTER", "ADVOGADO"]),
});

const atualizarPerfilSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senhaAtual: z.string().optional(),
  novaSenha: z.string().optional(),
});

export async function criarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const dados = criarUsuarioSchema.parse(req.body);

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: dados.email },
    });

    if (usuarioExistente) {
      res.status(400).json({ erro: "Usuário já existe." });
      return;
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        senha: senhaHash,
        role: dados.role,
        ativo: true,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ erro: "Dados inválidos", detalhes: error.errors });
    } else {
      res.status(500).json({ erro: "Erro ao criar usuário.", detalhes: error });
    }
  }
}

export async function listarUsuarios(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: { ativo: true },
      select: { id: true, nome: true, email: true, role: true },
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
      select: { id: true, nome: true, email: true, role: true, ativo: true },
    });

    if (!usuario || !usuario.ativo) {
      res.status(404).json({ erro: "Usuário não encontrado ou inativo." });
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
    const dados = atualizarUsuarioSchema.parse(req.body);

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuarioExistente) {
      res.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: dados,
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ erro: "Dados inválidos", detalhes: error.errors });
    } else {
      res
        .status(500)
        .json({ erro: "Erro ao atualizar usuário.", detalhes: error });
    }
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

    await prisma.usuario.delete({ where: { id: Number(id) } });

    res.json({ mensagem: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar usuário.", detalhes: error });
  }
}

export async function inativarUsuario(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    if (!usuario.ativo) {
      res.status(400).json({ erro: "Usuário já está inativo." });
      return;
    }

    await prisma.usuario.update({
      where: { id: Number(id) },
      data: { ativo: false },
    });

    res.json({ mensagem: "Usuário inativado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao inativar usuário.", detalhes: error });
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
      select: { id: true, nome: true, email: true, role: true, ativo: true },
    });

    if (!usuario || !usuario.ativo) {
      res.status(404).json({ erro: "Usuário não encontrado ou inativo." });
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
    const dados = atualizarPerfilSchema.parse(req.body);

    if (!req.usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado." });
      return;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
    });

    if (!usuario || !usuario.ativo) {
      res.status(404).json({ erro: "Usuário não encontrado ou inativo." });
      return;
    }

    if (dados.senhaAtual && dados.novaSenha) {
      const senhaValida = await bcrypt.compare(dados.senhaAtual, usuario.senha);
      if (!senhaValida) {
        res.status(401).json({ erro: "Senha atual incorreta." });
        return;
      }

      const novaSenhaHash = await bcrypt.hash(dados.novaSenha, 10);
      await prisma.usuario.update({
        where: { id: req.usuarioId },
        data: { nome: dados.nome, email: dados.email, senha: novaSenhaHash },
      });
    } else {
      await prisma.usuario.update({
        where: { id: req.usuarioId },
        data: { nome: dados.nome, email: dados.email },
      });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ erro: "Dados inválidos", detalhes: error.errors });
    } else {
      res
        .status(500)
        .json({ erro: "Erro ao atualizar perfil.", detalhes: error });
    }
  }
}

import { prisma } from "../prisma/client";

interface LogParams {
  acao: "CREATE" | "UPDATE" | "DELETE";
  tabela: string;
  registroId: number;
  usuarioId: number;
}

export async function logAction({
  acao,
  tabela,
  registroId,
  usuarioId,
}: LogParams) {
  try {
    await prisma.log.create({
      data: {
        acao,
        tabela,
        registroId,
        usuarioId,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar log:", error);
  }
}

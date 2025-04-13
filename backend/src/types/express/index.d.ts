import { Usuario } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      usuario?: Usuario;
      usuarioId?: number;
    }
  }
}

import { Request, Response, NextFunction } from 'express';

export function authorize(...rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const roleUsuario = req.usuario?.role;

    if (!roleUsuario || !rolesPermitidos.includes(roleUsuario)) {
      res.status(403).json({ message: 'Acesso negado' });
      return; 
    }

    next();
  };
}

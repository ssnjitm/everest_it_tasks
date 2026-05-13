import { Request, Response, NextFunction } from 'express';

export const hasRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user && user.role === role) {
      next();
    } else {
      res.status(403).json({ error: `Requires ${role} role` });
    }
  };
};
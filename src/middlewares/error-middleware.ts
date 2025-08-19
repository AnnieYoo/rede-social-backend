import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("[ERROR]", err.message);

  res.status(400).json({
    success: false,
    message: err.message || "Erro interno do servidor"
  });
}

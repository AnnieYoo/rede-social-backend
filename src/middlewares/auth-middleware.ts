import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface JwtPayload {
  id: string;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).json({message: "Não autorizado"})
    
    const token = authHeader.split(" ")[1]

    if(!token) return res.status(401).json({message: "Token inválido!"})
    
    

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
         throw new Error("JWT_SECRET não definido no .env");
        }

        const decoded = jwt.verify(token, secret) as JwtPayload
        req.user = {id: decoded.id, email: decoded.email }
        next()
    } catch (error) {
         return res.status(401).json({ message: "Token inválido ou expirado" });
    }
}
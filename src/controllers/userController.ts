import { Request, Response } from "express"
import { userModel } from "../models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const userController = {
    async register(req: Request, res: Response){
      try {
       const {name, email, password, avatarUrl, bio} = req.body

       if(typeof name !== "string" || typeof email !== "string" || typeof password !== "string" ) return res.status(400).json({message: "Os campos principais devem ser preenchidos"})
        
        const existingUser = await userModel.findUserByEmail(email);
       if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

       const hashedPassword = await bcrypt.hash(password, 10)
       const newUser = await userModel.register({name, email, password: hashedPassword, avatarUrl, bio})

       
       res.status(201).json({...newUser, password: undefined})
      } catch (error) {
         res.status(500).json({ message: "Erro ao registrar usuário", error});
      }
    },

    async login(req: Request, res: Response){
       try {
        const { email, password} = req.body

       if(typeof email !== "string" || typeof password !== "string") return res.status(400).json({message: "preencha todos os campos!"})

       const user = await userModel.findUserByEmail(email)

       if(!user) return res.status(400).json({message: "Email ou senha incorretos!"})

        const correctPassword = await bcrypt.compare(password, user.password)

        if(!correctPassword) return res.status(400).json({message: "Email ou senha incorretos!"})

        const secret = process.env.JWT_SECRET;
        if (!secret) {
         throw new Error("JWT_SECRET não definido no .env");
        }

      const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

      const safeUser = {...user, password: ""}

        res.status(200).json({safeUser, token})
       } catch (error) {
        res.status(500).json({message: "error interno!", error})
       }
    },

    async profile(req: Request, res: Response){
        const {userId} = req.params as { userId: string };

        const user = await userModel.findUserById(userId)

        if(!user) return res.status(404).json({message: "usuário não encontrado!"})
        
        const {name, bio, createdAt, avatarUrl } = user

        res.status(200).json({user:{name, bio, createdAt, avatarUrl}})
    }
}
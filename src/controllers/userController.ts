import { Request, Response } from "express"
import { userModel } from "../models/userModel"

export const userController = {
    async register(req: Request, res: Response){
        const {name, email, password, avatarUrl, bio} = req.body

       const newUser = await userModel.register({name, email, password, avatarUrl, bio})

       res.status(200).json({message: "Cadastrado com sucesso", newUser})
    },

    async login(req: Request, res: Response){
       const { email, password} = req.body
       const user = await userModel.login({email, password})

       if(!user) return res.status(404).json({message: "Usuário não encontrado!"})


        res.status(200).json({message: "usuário encontrado", user})
    }
}
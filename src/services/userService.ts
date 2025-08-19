import { userModel } from "../models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userService = {
    async createUser(name: string, email: string, password: string, avatarUrl: string = "", bio: string = ""){

         if(typeof name !== "string" || typeof email !== "string" || typeof password !== "string" )  throw new Error("Os campos principais devem ser preenchidos")
                
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser){  throw new Error("E-mail já cadastrado!")}
        
               const hashedPassword = await bcrypt.hash(password, 10)
               return await userModel.register({name, email, password: hashedPassword, avatarUrl, bio})
        
    },

    async login(email: string, password: string){

        
               if(typeof email !== "string" || typeof password !== "string") throw new Error("preencha todos os campos!")
        
               const user = await userModel.findUserByEmail(email)
        
               if(!user) throw new Error("Email ou senha incorretos!")
        
                const correctPassword = await bcrypt.compare(password, user.password)
        
                if(!correctPassword) throw new Error("Email ou senha incorretos!")
        
                const secret = process.env.JWT_SECRET;
                if (!secret) {
                 throw new Error("JWT_SECRET não definido no .env");
                }
        
              const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

              return {user, token}

    },

    async userProfile(userId: string){

        if(typeof userId !== "string") throw new Error("Id inválido")

        const user = await userModel.findUserById(userId)
        if(!user) throw new Error("usuário não encontrado!")
        return user
    }
}
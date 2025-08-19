import { Request, Response } from "express"
import { userService } from "../services/userService"


export const userController = {
    async register(req: Request, res: Response){
      try {
       const {name, email, password, avatarUrl, bio} = req.body

      const newUser = await userService.createUser(name, email, password, avatarUrl, bio)
       
       res.status(201).json({...newUser, password: undefined})
      } catch (error:any) {
         res.status(500).json(error.message);
      }
    },

    async login(req: Request, res: Response){
       try {
        const { email, password} = req.body
        const {user, token} = await userService.login(email, password)
        const safeUser = {...user, password: ""}
        res.status(200).json({safeUser, token})
       } catch (error: any) {
        res.status(500).json(error.message)
       }
    },

    async profile(req: Request, res: Response){
      const {userId} = req.params as { userId: string };
      const user = await userService.userProfile(userId)  
      const {name, bio, createdAt, avatarUrl } = user
      res.status(200).json({user:{name, bio, createdAt, avatarUrl}})
    }
}
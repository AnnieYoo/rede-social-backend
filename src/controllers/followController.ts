import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import { followModel } from "../models/followModel";

export const followController = {
    async create(req: Request, res: Response){
        const {followerId, followingId} = req.body

        if(followerId === followingId) return res.status(400).json({message: "você não pode seguir você mesmo!"})

        const followExists = await followModel.findFollowerById(followerId, followingId)

        if(followExists) return res.status(400).json({message: "Você já segue esse usuário!"})

        const follow = await followModel.follow(followerId, followingId)

        res.status(201).json({message: "você está seguindo!", follow})    
    },

    async delete(req: Request, res: Response){
        const {followerId, followingId} = req.body

        if(followerId === followingId) return res.status(400).json({message: "você não pode parar de seguir você mesmo!"})

        const followExists = await followModel.findFollowerById(followerId, followingId)

        if(!followExists) return res.status(404).json({message: "Você não segue esse usuário!"})

       await followModel.unfollow(followerId, followingId)

       res.status(200).json({message: "você deixou de seguir"})
    }
}
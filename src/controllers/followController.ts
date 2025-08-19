import { Request, Response } from "express";
import { followService } from "../services/followService";

export const followController = {
    async createFollow(req: Request, res: Response){
        const {followerId, followingId} = req.body
        const follow = await followService.create(followerId, followingId)
        res.status(201).json({message: "você está seguindo!", follow})    
    },

    async deleteFollow(req: Request, res: Response){
        const {followerId, followingId} = req.body
        followService.delete(followerId, followingId)
       res.status(200).json({message: "você deixou de seguir"})
    }
}
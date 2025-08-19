import { Request, Response } from "express";
import { postsService } from "../services/postsService";

export const postController = {
    async createPost(req: Request, res: Response){
        const {content, imageUrl, userId} = req.body
        const newPost = await postsService.create(content, userId, imageUrl)
        res.status(200).json({message: "post criado", newPost})
    },

    async findAllPosts(req: Request, res: Response){
        const {userId} = req.params as { userId: string };
        
        const posts = await postsService.findAll(userId)

        res.status(200).json({posts})
    },

    async deletePost(req: Request, res: Response){
        const { postId } = req.params as { postId: string };
        const userId = req.user?.id 

        if (!userId) return res.status(400).json({ message: 'usuário não autenticado.' });
        
        const deletedPost = await postsService.delete(postId, userId)

        res.status(200).json({message: "post deletado!", deletedPost})
    }


}
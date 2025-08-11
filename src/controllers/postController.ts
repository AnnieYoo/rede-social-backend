import { Request, Response } from "express";
import { postModel } from "../models/postModel";

export const postController = {
    async createPost(req: Request, res: Response){
        const {content, imageUrl, userId} = req.body

        if(!content || !userId) return res.status(400).json({message: "Informe as informações necessárias"})

            const newPost = await postModel.createPost({content, imageUrl, userId})

            res.status(200).json({message: "post criado", newPost})
    },

    async findAllPosts(req: Request, res: Response){
        const {userId} = req.body
        if(!userId) return res.status(404).json({message: "Usuário não encontrado"})

            const posts = await postModel.findAllPosts(userId)

            res.status(200).json({posts})
    },

    async deletePost(req: Request, res: Response){
        const {userId, postId} = req.body

        const post = await postModel.findPostById(postId)

        if(post?.userId !== userId) return res.status(404).json({message: "esse post não pertece a esse usuário"})

        const deletedPost = await postModel.deletePost(postId)

        res.status(200).json({message: "post deletado!", deletedPost})
    }


}
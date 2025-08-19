import { postModel } from "../models/postModel"

export const postsService = {
    async create(content: string, userId: string, imageUrl: string){
       if(!content || !userId) throw new Error("Informe as informações necessárias")
       const newPost = await postModel.createPost({content, imageUrl, userId})
       return newPost
    },

    async findAll(userId: string){
        if(!userId) throw new Error( "Usuário não encontrado")
        const posts = await postModel.findAllPosts(userId)
        return posts
    },

    async delete(postId: string, userId: string){
        if(typeof postId !== "string" || typeof userId !== "string") throw new Error("Post inválido!")
          const post = await postModel.findPostById(postId)
          if(post?.userId !== userId) throw new Error("Esse post não pertece a esse usuário")
          return await postModel.deletePost(postId)
    }
}
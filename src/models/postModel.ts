import { prisma } from "../database"

interface createPostInput{
    content: string
    imageUrl?:string
    userId: string
}

export class postModel{
    

    static async createPost(data: createPostInput){

        return await prisma.post.create({data})
    }

    static async findPostById(postId: string){
        return await prisma.post.findUnique({where: {id: postId}})
    }

    static async findAllPosts(userId: string){
        return await prisma.post.findMany({where: {userId: userId}})
    }

    static async deletePost(postId: string){
        return await prisma.post.delete({where: {id: postId}})
    }
}
import { prisma } from "../database";

export class followModel{
      static async follow(followerId: string, followingId: string){
        return await prisma.follow.create({data: {followerId, followingId}})
    }

    static async findFollowerById(followerId: string, followingId: string){
        return prisma.follow.findUnique({where: {followerId_followingId: {followerId, followingId}}})
    }

     static async unfollow(followerId: string, followingId: string){
        return prisma.follow.delete({where: {followerId_followingId: {followerId, followingId}}})
    }
}
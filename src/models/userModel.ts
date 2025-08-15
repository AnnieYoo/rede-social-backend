import { prisma } from "../database";

interface CreateUserInput{
    name: string
    email: string
    password: string
    avatarUrl?: string
    bio?: string
}

export class userModel{
    static async register(data: CreateUserInput){
    return await prisma.user.create({data})
    }

    static async findUserByEmail(email: string){
        return await prisma.user.findUnique({where:{ email: email}})
    }

    static async findUserById(userId: string){
        return prisma.user.findUnique({where: {id: userId}})
    }
}
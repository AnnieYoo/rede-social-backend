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

    static async login(data: Omit<CreateUserInput, "name" | "avatarUrl" | "bio">){
        return await prisma.user.findUnique({where:{ email: data.email}})
    }
}
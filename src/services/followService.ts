import { followModel } from "../models/followModel"

export const followService = {
    async create(followerId: string, followingId: string){
      if(followerId === followingId) throw new Error("você não pode seguir você mesmo!")
        
        const followExists = await followModel.findFollowerById(followerId, followingId)
        
        if(followExists) throw new Error("Você já segue esse usuário!")
        
        return await followModel.follow(followerId, followingId)     
    },

    async delete(followerId: string, followingId: string){
        
        if(followerId === followingId) throw new Error("você não pode parar de seguir você mesmo!")

        const followExists = await followModel.findFollowerById(followerId, followingId)

        if(!followExists) throw new Error("Você não segue esse usuário!")

        await followModel.unfollow(followerId, followingId)
    }
}
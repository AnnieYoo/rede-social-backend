import { Router } from "express";
import { userController } from "./controllers/userController";
import { postController } from "./controllers/postController";

export const router = Router()
//Rotas do user
router.post("/register", userController.register)
router.get("/login", userController.login)

//Rotas do post
router.post("/posts", postController.createPost)
router.get("/posts", postController.findAllPosts)
router.delete("/posts", postController.deletePost)

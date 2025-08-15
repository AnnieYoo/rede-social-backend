import { Router } from "express";
import { userController } from "./controllers/userController";
import { postController } from "./controllers/postController";
import { authMiddleware } from "./middlewares/auth-middleware";

export const router = Router()
//Rotas do user
router.post("/register", userController.register)
router.post("/login", userController.login)

//Rotas do post
router.post("/posts",authMiddleware, postController.createPost)
router.get("/posts", postController.findAllPosts)
router.delete("/posts",authMiddleware, postController.deletePost)

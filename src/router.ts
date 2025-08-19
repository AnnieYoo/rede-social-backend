import { Router } from "express";
import { userController } from "./controllers/userController";
import { postController } from "./controllers/postController";
import { authMiddleware } from "./middlewares/auth-middleware";
import { followController } from "./controllers/followController";

export const router = Router()
//Rotas do user
router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/user/:userId", userController.profile)

//Rotas do post
router.post("/posts",authMiddleware, postController.createPost)
router.get("/posts/:userId", postController.findAllPosts)
router.delete("/posts",authMiddleware, postController.deletePost)

//Rotas do follow
router.post("/follow",authMiddleware, followController.createFollow)
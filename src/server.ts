import express from "express"
import {router} from "./router"
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error-middleware"

dotenv.config()
const app = express()


app.use(express.json())
app.use(router)

app.use(errorMiddleware)


const PORT = process.env.PORT || 2000
app.listen(PORT, ()=>{
    console.log("Server funcionando!")
})
import express from "express"
import { Login, Register } from "../Controllers/userControllers.js"


const userRouter = express()

userRouter.post("/login",Login)
userRouter.post("/register",Register)

export default userRouter
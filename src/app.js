import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import { errorHandler } from "./Midllewares/ErrorMinddlewarre.js";
import userRouter from "./Routers/RouterUser.js";
import CourseRouter from "./Routers/RouterCourse.js";
import path from "path"
import { fileURLToPath } from 'url'
import upload from "./Muler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const URL = "mongodb+srv://Ngiad:Ngiad001@cluster0.2ts8aja.mongodb.net"

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use("/api/user",userRouter)
app.use("/api/course",CourseRouter)

app.use((req,res,next) => {
    try {
        throw new Error("Not found!")
    } catch (error) {
        next(error)
    }
})

app.use('/image', express.static(path.join(__dirname, 'image')))

app.post("/single",upload.single("image"),(req,res) =>{
    const url =  req.protocol + '://' + req.get('host')
    res.json({success : true,img : url + '/image/' + req.file.filename })
})

app.use(errorHandler)

export const start = function start(){
    mongoose.set('strictQuery', true);
    mongoose.connect(URL)
    .then(() =>{
        app.listen(5000,() => {
            console.log("server is running on PORT ",5000)
        })
    })
    .catch((e) =>{
        console.log("connect mongodb Fales  : ",e)
    })
}


export default app
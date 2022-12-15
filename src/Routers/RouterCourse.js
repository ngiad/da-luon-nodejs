import express from "express"
import { CreateCourse, DeleteCourse, GetAllCourse, SearchCourse, UpdateCourse } from "../Controllers/CourseControllers.js"
import { protect } from "../Midllewares/AuthenMiddlleware.js"

const CourseRouter = express()
CourseRouter.use(protect)

CourseRouter.get("/",GetAllCourse)
CourseRouter.get("/search",SearchCourse)
CourseRouter.post("/create",CreateCourse)
CourseRouter.put("/update",UpdateCourse)
CourseRouter.delete("/delete",DeleteCourse)


export default CourseRouter
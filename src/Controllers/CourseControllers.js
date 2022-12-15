import courseModel from "../Models/course.js";

export const GetAllCourse = async (req,res,next) => {
    try {
        const courses = await courseModel.find()
        res.status(200).json(courses)
    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const SearchCourse = async(req,res,next) => {
    try {
        const {sreach} = req.query

        const courses = await courseModel.find({namecourse : {$regex : sreach}})
        res.status(200).json(courses)
    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const CreateCourse = async(req,res,next) => {
    try {
        await courseModel.create(req.body)
        const courses = await courseModel.find()
        res.status(201).json(courses)
    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const UpdateCourse = async(req,res,next) => {
    try {
        const UpdateCourse = req.body

        const CourseUpdate = await courseModel.findByIdAndUpdate({_id : UpdateCourse._id},UpdateCourse,{new : true})
        await CourseUpdate.save()

        const course = await courseModel.find()
        res.status(200).json(course)
    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const DeleteCourse = async(req,res,next) => {
    const {_id} = req.body
    try {
        const RemoveCourse = await courseModel.findById(_id)
        await RemoveCourse.remove()

        const course = await courseModel.find()
        res.status(200).json(course)
        
    } catch (error) {
        res.status(400)
        next(error)
    }
}
import mongoose from "mongoose";



const courseShema = mongoose.Schema({
    imagecourse : {
        type : String,
        require : true
    },
    namecourse : {
        type : String,
        require : true
    },
    tuition :{
        type : String,
        require : true
    },
    studytime : {
        type : String,
        require : true
    },
    numberofstudents : {
        type :  String,
        default : 15
    },
    numberofsubjects : {
        type : String,
        default : "user"
    },
    coursetype : {
        type :  String,
        default : "partime"
    },
    contentCourse : {
        type : String
    },
    aboutCourse : {
        type : String
    }
},{
    timestamps :  true
})



export default mongoose.model("course",courseShema)
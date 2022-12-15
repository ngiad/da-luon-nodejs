import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userShema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    password : {
        type :  String,
        require : true,
    },
    decentralization : {
        type : String,
        default : "user",
    },
    course : []
},{
    timestamps :  true
})

// Encrypt password

userShema.pre("save",async function(next){

    if(!this.isModified("password")){
        return next()
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

export default mongoose.model("lotususer",userShema)
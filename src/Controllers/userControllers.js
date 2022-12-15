import userModel from "../Models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



const generateToken = (username) => {
  return jwt.sign({ username },"qqno", {
    expiresIn: "1d",
  });
};


export const Login = async (req,res,next) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            res.status(400);
            throw new Error("Please add username and pasword!");
        }

        const user = await userModel.findOne({ username });

        if(!user){
            res.status(400);
            throw new Error("User Not Found!");
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password);

        if(user && passwordIsCorrect){
            
            const token = generateToken(user.username);
            const {name,course,decentralization} = user
            res.status(200).json({
                token,
                name,
                course,
                decentralization
            })
        }else{
            res.status(400)
            throw new Error("Invalid user data")
        }

    } catch (error) {
        res.status(400)
        next(error)
    }
} 


export const Register = async (req,res,next) =>{
    try {
        const {name,username,password} = req.body

        if (!name || !username || !password) {
            res.status(400);
            throw new Error("Please fill in all required fields");
        }

        if(password.length < 6){
            res.status(400);
            throw new Error("Password must be up to 6 characters");
        }

        const userExits = await userModel.findOne({ username: username });

        if (userExits) {
          res.status(400);
          throw new Error("UserName has already been registered");
        }

        const user = await userModel.create({
            name,
            username,
            password
        });

        if(user){
            const token = generateToken(username);
            const {name,course,decentralization} = user
            res.status(201).json({
                token,
                name,
                course,
                decentralization
            })
        }else{
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400)
        next(error)
    }
}
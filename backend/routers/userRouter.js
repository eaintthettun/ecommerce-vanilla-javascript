import express from 'express';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler'
import config from '../config.js';
import generateToken from '../utils.js';
import { sign } from 'jsonwebtoken';
const userRouter=express.Router();

userRouter.get("/createadmin",
    expressAsyncHandler(async(req,res)=>{
    console.log('user router loaded');
    try{
        //create a user instance
        const user=new User({
            name:"admin",
            email:"admin@gmail.com",
            password:"admin123",
            isAdmin:true
        });
        const createdUser=await user.save();
        res.send(createdUser);
    }catch(error){
        res.status(500).send({message:error.message});
    }
    })
);
userRouter.post('/signin',
    expressAsyncHandler(async (req,res)=>{
    const signinUser=await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    console.log('frontend is trying to signin with:',signinUser.email,',',signinUser.password);
    if(!signinUser){
        res.status(401).send({
            message:"Invalid email or password"
        });
    }
    else{
        res.status(200).send(
            {
            _id:signinUser._id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            token:generateToken(signinUser) //return json web token string
            }
        )
    }
    })
);
export default userRouter;
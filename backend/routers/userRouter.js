import express from 'express';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler'
import config from '../config.js';
import generateToken from '../utils.js';
const userRouter=express.Router();

userRouter.get("/createadmin",
    expressAsyncHandler(async(req,res)=>{
    console.log('user router loaded');
    try{
        //create a user instance
        const user=new User({
            name:"admin",
            email:"admin@example.com",
            password:"jsamazona",
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
    console.log(req.body);
    const signinUser=await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(!signinUser){
        res.status(401).send({
            message:"Invalid email or password"
        });
    }
    else{
        res.status(400).send(
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
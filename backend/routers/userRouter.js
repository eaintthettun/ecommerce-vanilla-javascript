import express from 'express';
import User from '../models/UserModel.js';
const userRouter=express.Router();

userRouter.get("/createadmin",async(req,res)=>{
    console.log('user router loader');
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
});
export default userRouter;
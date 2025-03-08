import mongoose from "mongoose";

//create user schema
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,index:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false}
});

//create new user
const User=mongoose.model('User',userSchema);
export default User;

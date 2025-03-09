import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import bodyParser from 'body-parser';


mongoose.connect(config.MONGODB_URL,{
        useNewUrlParser:true,
    })
    .then(()=>{
        console.log('Connected to mongoDB message');
    })
    .catch((error)=>{
        console.log(error.message);
    });
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/users",userRouter);

app.get("/api/products",(req,res)=>{//request and response
    res.send(data.products); //send to client  
});
app.get('/api/products/:id',(req,res)=>{
    const product=data.products.find((x)=> x._id===req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:'Product not found'});
    }
    res.send();
});

//to handle all errors in express
app.use((err,req,res,next)=>{
    const status=err.name && err.name==='ValidationError'?400:500;
    res.status(status).send({message:err.message});
});
app.listen(5000,()=>{
    console.log("serve at http://localhost:5000");
});

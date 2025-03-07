import express from 'express';
import cors from 'cors';
import data from './data.js';

const app=express();
app.use(cors());
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
app.listen(5000,()=>{
    console.log("serve at http://localhost:5000");
});

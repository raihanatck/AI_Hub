import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use((req,res,next)=>{
    console.log("HTTP method - " + req.method + " , URL - " + req.url);
    next();
})
// app.use('/category',);



const PORT = process.env.PORT;
mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('Mongodb is connected');
    app.listen(PORT,()=>{
        console.log('Server connected to this ' + PORT +' PORT');        
    })
}).catch((error)=>{
    console.log(error);
})
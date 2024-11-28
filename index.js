const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const categoryRouter = require('./routers/categoryRouter');
const app = express();
app.use(cors());
require('dotenv').config();

app.use(express.json());
app.use((req,res,next)=>{
    console.log("HTTP method - " + req.method + " , URL - " + req.url);
    next();
});

app.use('/category',categoryRouter);

const PORT = process.env.PORT;
mongoose.connect(
  process.env.DB_CONNECTION
  
).then(()=>{
    
    console.log("MongoDB is connected");
    app.listen(PORT, () => {
        console.log("Server started on this port 5000");
    });

}).catch((error)=>{
    console.log("DB error:",error);
})

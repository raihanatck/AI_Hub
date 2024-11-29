const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const categoryRouter = require('./routes/categoryRouter');
const aiRouter = require('./routes/aiRouter');
const app = express();
app.use(cors());
require('dotenv').config();

app.use(express.json());
app.use((req,res,next)=>{
    console.log("HTTP method - " + req.method + " , URL - " + req.url);
    next();
});

// app.get('/home',(req,res)=>{
//     res.send("Welcome");
// })

app.use('/category',categoryRouter);
app.use('/aitools',aiRouter);

const PORT = process.env.PORT;
mongoose.connect(
  process.env.DB_CONNECTION
  
).then(()=>{
    
    console.log("MongoDB is connected");
    app.listen(PORT, () => {
        console.log("Server started on this port 5050");
    });

}).catch((error)=>{
    console.log("DB error:",error);
})

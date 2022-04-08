require("dotenv").config();

//connect DB
const{connectDB}=require('./configs/db')

connectDB();

const express = require('express');

const cors = require('cors');
//import Route
const authRoute =require('./routes/authRoute');
const postRoute=require('./routes/postRoute');
//import error handler
const {errorHandler}= require("./middlewares/errorHandler");

const {register} =require('./controllers/authController');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/posts',postRoute);

//unhandle route
app.all("*",(req,res,next)=>{
    const err = new Error('The route can not be found');
    err.statusCode = 404;
    next(err);
})
app.use(errorHandler);

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

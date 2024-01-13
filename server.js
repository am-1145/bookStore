const express=require('express')
const dotenv=require('dotenv')
dotenv.config();
const connectDB=require("./config/db")
const app=express();

connectDB();
app.use(express.json());



// Routes
app.use('/api/Author',require("./routes/AuthorRoutes"))




app.listen(2000,()=>{
    console.log('Server is running on port 2000');
})
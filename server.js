const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
// const dotenv=require("dotenv").config();
const dotenv=require("dotenv").config();


connectDb();

const app=express();

const port=5000;


app.use(express.json())
app.use("/api/contacts",require("./routes/contactroutes"));
app.use("/api/users",require("./routes/userroutes"));
app.use(errorHandler)   //middleware
app.listen(port,()=>
{
    console.log(`App running on port ${port}`);
});
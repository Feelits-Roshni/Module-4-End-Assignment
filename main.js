const express=require("express");
const dbConnection = require("./config/dbConnection");
const userRouter = require("./router/user.router");
const productRouter = require("./router/product.router");
const app=express();
app.use(express.json());
app.use("/auth", userRouter);
app.use("/products", productRouter);
require("dotenv").config();
dbConnection();
app.listen(process.env.port,()=>{
    console.log(`server is running in port number ${process.env.port}`);
});
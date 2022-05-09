const express=require("express")
const app=express();
require("./connection/conn")
app.use(express.json())
app.use(require('./apis/auth'))
app.listen(5000,()=>{
    console.log(`server is running at port 5000`);
})
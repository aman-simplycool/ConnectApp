require("dotenv").config({ path: "env/.env" })
const cookieParser = require("cookie-parser");
const express = require("express")
require("./connection/conn")
// app
const app = express();
const PORT=process.env.PORT||5000
// Middlewares
app.use(cookieParser());
app.use(express.json())
app.use(express.static("storage"))
app.use(require("cors")())
app.use(require('./apis/auth'))

if(process.env.NODE_ENV=="production"){
   app.use(express.static("frontend/connect/build")) 
}

// Listen the server
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})
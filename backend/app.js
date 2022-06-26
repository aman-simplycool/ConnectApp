require("dotenv").config({ path: "env/.env" })
const cookieParser = require("cookie-parser");
const express = require("express")
require("./connection/conn")
// app
const app = express();
// Middlewares
app.use(cookieParser());
app.use(express.json())
app.use(express.static("storage"))
app.use(require("cors")())
app.use(require('./apis/auth'))

// Listen the server
app.listen(5000, () => {
    console.log(`server is running at port 5000`);
})
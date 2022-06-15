const mongoose=require("mongoose")
const db="mongodb+srv://aman:atlaskicycle@cluster0.as0ic.mongodb.net/akgData?retryWrites=true&w=majority";
mongoose.connect(db).then(
console.log("connection successful")
).catch((err)=>{
console.log(err);
})
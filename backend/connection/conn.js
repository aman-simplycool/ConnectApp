const mongoose=require("mongoose")
<<<<<<< HEAD
const db=process.env.DB;
=======
const db=process.env.DB
>>>>>>> e2adb427d380d47f669c7cbcd95c5a43038ff535
mongoose.connect(db).then(
console.log("connection successful")
).catch((err)=>{
console.log(err);
})
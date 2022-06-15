const mongoose=require("mongoose")
const schema=new mongoose.Schema({
 email:{
type:String
 },
 img:{
    data: Buffer,
    contentType: String 
 }
})
const imgData=new mongoose.model('imgData',schema);
module.exports=imgData; 
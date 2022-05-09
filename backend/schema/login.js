const mongoose=require("mongoose")
const express=require("express")
const schema = new mongoose.Schema({
email:{
type:String
},
password:{
type:String
}
})
const loginData=new mongoose.model('loginData',schema);
module.exports=loginData;
const mongoose=require("mongoose")
const express=require("express")
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")
const schema= new mongoose.Schema({
name:{
type:String,
required:true

},
gender:{
type:String,
required:true
},
email:{
type:String,
required:true
},
password:{
type:String
},
cpassword:{
type:String
},
imageurl:{
type:String,
 }
 })
schema.pre('save',async function(next){
  try {
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(this.password,salt);
    this.password=hashedPassword
    this.cpassword=hashedPassword; 
  next(); 
  } catch (error) {
    next(err)
  }
})

const regData=new mongoose.model('regData',schema)
module.exports=regData;
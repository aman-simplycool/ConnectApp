const mongoose=require("mongoose")
const express=require("express")
const bcrypt =require("bcrypt")
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
type:String,
required:true
},
cpassword:{
type:String,
required:true
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

schema.methods = {
  "verifyPassword": function(password){
    try {
      return bcrypt.compare(password,this.password);
    } catch (error) {
      console.log(error);
      return false;
    }
    
  }
}

const regData=new mongoose.model('regData',schema)
module.exports=regData;
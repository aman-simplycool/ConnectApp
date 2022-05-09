const express = require('express');
const app = express();
const router = express.Router();
const regData = require('../schema/register')
const bcrypt = require("bcrypt")
const mongoose = require('mongoose')


//////////////////////////////registration starts///////////////////////////////////
router.post('/register', (req, res) => {
  const { name, gender, email, password, cpassword } = req.body;
  if (password != cpassword) {
    return res.status(400).send("password dont match");
  }
  if (!name || !gender || !email || !password || !cpassword) {
    return res.status(400).send({ json: "fill all the details asked" })
  }
  regData.findOne({ email: email })
    .then((userexist) => {
      if (userexist) { return res.status(401).json({ "msg": "user already registered" }) }
      const user = new regData({ name, gender, email, password, cpassword });

      user.save().then(() => {
        console.log(req.body);
        return res.status(200).send({ message: "succefully registered" })
      }).catch((err) => {
        console.log(err);
        return res.status(400).send({ message: "registration unsucessful" });
      })
    }).catch((err) => {
      console.log(err);
      return res.status(402).send("some err occured")
    })
})
///////////////////////////////registration api ends here//////////////////////////////////////////////
///////////////////////////////login api ///////////////////////////////////
router.post('/login', async (req, res) => {
  try {
    // const { email, password } = req.body;
    const userexist = regData.findOne({ email: req.body.email })
  
    if (userexist!=null) {
      console.log(userexist.gender);
    //  const result= await bcrypt.compareSync(password,userexist.password)
     if(!result){
      return res.status(400).send("invalid credentials") 
     }
     else{
     return res.status(200).send("sucessful login");
     }
    }
    else {
      return res.status(400).send("first register yourself")
    }
  }
  catch (err) {
    console.log(err);
    return res.status(400).send("error occured")
  }
})

module.exports = router
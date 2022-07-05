const router = require('express').Router();
const regData = require('../schema/register')
const bcrypt = require("bcrypt")
const multer = require('multer')
const jwt = require("jsonwebtoken")
const cookie = require("cookie");


// ->Check whether the use is signedIn
async function isSignedIn(req, res, next) {
  if(!req.headers.cookie) {
    return res.status(401).json({error: "Unauthorized"})
  }
  const authToken = cookie.parse(req.headers.cookie).jwtToken;
  console.log(authToken);
  jwt.verify(authToken, process.env.SECRET_KEY, (error, decode) => {
    if (error) {
      console.log("unauthorized error");
      return res.status(401).json({ "error": "Unauthorized" })
    } else {
      if (decode.email) {
        regData.findOne({ email: decode.email }, (err, doc) => {
          if (err) {
            return res.status(401).json({ "error": "Unauthorized" })
          }
          if (!doc) {
            return res.status(401).json({ "error": "Unauthorized" })
          }
          else{
            console.log('verification sucess from middleware');
            next() 
          }
          
        })
      }
    }
  });
};


router.get('/isverified', isSignedIn, (req, res) => {
  console.log("user is verified");
  return res.status(200).json({ msg: "Success" })
})

//->REGISTER API STARTS FROM HERE 
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
   

//->LOGIN API STARTS FROM HERE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = await regData.findOne({ email });
  console.log(query);
  if (!query) { return res.status(400).send({ msg: "user not registered" }) }
  else if (query) {
    const passwordMaches = await bcrypt.compare(password, query.password);
    if (passwordMaches) {
      // console.log("hello");
      const authToken = jwt.sign({ email: query.email }, process.env.SECRET_KEY,{expiresIn:"60000"});
      res.cookie("jwtToken", authToken);
      return res.status(200).send({ msg: "sucess login", authToken })
    }
    else if (!passwordMaches) { return res.status(402).send({ msg: "password does not match" }) }
  }
});

//->getting data from data route

router.get('/data', isSignedIn, async (req, res) => {
  regData.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json({ "err": "some error occured" })
    }
    else {
      res.status(200).json(docs);
    }
  })
})
//->DATA API END HERE

//->logout functionality implemented here//

router.get('/logout',async(req,res)=>{
res.clearCookie('jwtToken');

return res.status(200).json("user logout");

})



module.exports = router
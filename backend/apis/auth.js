const router = require('express').Router();
const regData = require('../schema/register')
const bcrypt = require("bcrypt")
const multer = require('multer')
const jwt = require("jsonwebtoken")
const cookie = require("cookie");
const { Router } = require('express');


// Check whether the use is signedIn
async function isSignedIn(req, res, next) {
  if(!req.headers.cookie) {
    return res.status(401).json({error: "Unauthorized"})
  }
  const authToken = cookie.parse(req.headers.cookie).jwtToken;
  console.log(authToken);
  jwt.verify(authToken, process.env.SECRET_KEY, (error, decode) => {
    if (error) {
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
          next()
        })
      }
    }
  });
};


router.get('/isverified', isSignedIn, (req, res) => {
  return res.status(200).json({ msg: "Success" })
})

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
  const { email, password } = req.body;

  const query = await regData.findOne({ email });
  console.log(query);
  if (!query) { return res.status(400).send({ msg: "user not registered" }) }
  else if (query) {
    const passwordMaches = await bcrypt.compare(password, query.password);
    if (passwordMaches) {
      // console.log("hello");
      const authToken = jwt.sign({ email: query.email }, process.env.SECRET_KEY,{expiresIn:'600'});
      res.cookie("jwtToken", authToken);
      return res.status(200).send({ msg: "sucess login", authToken ,expires:""})
    }
    else if (!passwordMaches) { return res.status(402).send({ msg: "password does not match" }) }
  }
});
//////////////////////////////////////////////////////////////////////
//getting the data from db////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////data api ends/////////////

//->logout functionality implemented here//

router.get('/logout',async(req,res)=>{
res.clearCookie('jwtToken');
console.log("logout called");
return res.status(200).json("user logout");

})

/////////////////////////////////////////////////////////////image storing api////////
const fileStorage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, "./storage");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '--' + file.originalname);
    }
  })


const upload = multer({ storage: fileStorage })


router.post('/imgpost', upload.single("image"), async (req, res) => {
  var query = { 'email': req.body.email };
  regData.findOneAndUpdate(query, { imageurl: req.file.filename }, { upsert: true }, function (err, doc) {
    if (err) {
      return res.status(500).json(err);
    }
    else if (!err) {
      console.log("hello insider2")
      return res.status(200).json("sucessfully saved")
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////
module.exports = router
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// R E G I S T E R 
router.post("/register", async (req, res) => {// creer l'url
  try {    //destructure
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
});







// L O G I N
router.post("/login",async (req,res)=>{
  try{
      const user=await User.findOne({email:req.body.email})
     
      if(!user){
          return res.status(404).json("User not found!")
      }
      const match=await bcrypt.compare(req.body.password,user.password)
      
      if(!match){
          return res.status(401).json("Wrong credentials!")
      }
      const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
      const {password,...info}=user._doc
      res.cookie("token",token).status(200).json(info)

  }
  catch(err){
      res.status(500).json(err)
  }
})





// L O G O UT
router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("user est déconnecté");
  } catch (error) {
    res.status(500).json(error);
  }
});



//après login de l'user, dès que je rafraichit la page, l'user est déconnecté: il faut trouver une solution avec refetch afin que l'user soit login
// R E F E T C H USER
router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});



module.exports = router;

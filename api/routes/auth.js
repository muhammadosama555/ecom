const router=require("express").Router();
const User = require("../models/User");
const CryptoJs=require("crypto-js")






//REGISTER
router.post("/register",async(req,res)=>{
      const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
      })
      try {
        const savedUser= await newUser.save();
        res.status(200).json(savedUser)
      } catch (err) {
        res.status(500).json(err)
      }
})


//LOGIN
 router.post("/login", async (req,res)=>{
     try {
      const user = await User.findOne({username:req.body.username})
      if(!user) return res.status(401).json("wrong credentials")

      const hashedPass= await CryptoJs.AES.decrypt( 
        user.password,
        process.env.PASS_SEC
      )
      const password= await hashedPass.toString(CryptoJs.enc.Utf8)
      if(password !==req.body.password) return res.status(401).json("wrong credentials")

      res.status(200).json(user)
      
     } catch (err) {
      res.status(500).json(err)
      
     }
 })



module.exports=router;
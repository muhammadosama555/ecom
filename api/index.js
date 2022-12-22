const express = require("express")
const mongoose = require("mongoose")
const authRoute=require("./routes/auth.js")




const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>{
    console.log(err)
})
const app=express()
app.use(express.json())



app.use("/api/auth",authRoute)







app.listen(4555,()=>{
    console.log("backend running")
})
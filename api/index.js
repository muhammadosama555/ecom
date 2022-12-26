const express = require("express")
const mongoose = require("mongoose")
const authRoute=require("./routes/auth.js")
const userRoute=require("./routes/user.js")
const productRoute=require("./routes/product.js")
const orderRoute=require("./routes/order.js")
const cartRoute=require("./routes/cart.js")




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
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/orders",orderRoute)
app.use("/api/carts",cartRoute)







app.listen(4555,()=>{
    console.log("backend running")
})
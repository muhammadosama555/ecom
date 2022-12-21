const mongoose=require("mongoose")
const { boolean } = require("webidl-conversions")

const userSchema= new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type: boolean, default:false}
},{timestamps:true})
const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    password:String,
    email:String,
    firstName:String,
    lastName:String,
    country:String
})
module.exports=mongoose.model("users",userSchema)

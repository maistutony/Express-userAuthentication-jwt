const jwt = require("jsonwebtoken");
require("dotenv").config();

//check if user is loged-in by verifying the jwt token
const authUser=async(req,res,next)=>{
    let token = req.headers["auth-token"]
    try{
      if(token==null){
        res.json("Not authorized")
      }else{
        const verified= await jwt.verify(token,process.env.SECRET_KEY);
        if(verified){
          req.userId=verified.userId;
        }
        next();
      }
    }catch(error){
      res.json(error)
    }
}
module.exports=authUser;
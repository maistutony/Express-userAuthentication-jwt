const userModel=require("../model/usersModel");
const bcrypt=require("bcrypt")
const {generated}=require("../controllers/generateToken")

//register new user
const registerUser=async(req,res)=>{
    const{email,password,firstName,lastName,country}=req.body;
    try{
        if(!email || !password) res.json("please enter password and email")
        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({ error: 'User already exists' });
        }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=userModel.create({
             password:hashedPassword,
             email,
             firstName,
             lastName,
             country
           });
           res.json(generated(newUser._id));
     
    }catch(error){
        res.json(error.message)
    }
}

//Verify logged in details
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        if(!email || !password) res.json("email or password cannot be empty")
        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            const decoded=await bcrypt.compare(password,existingUser.password)
            if(decoded){
                res.header("auth-token",generated(existingUser._id)).json(generated(existingUser._id));
            }else{
                res.json("Enter a valid password")
            }
        }else{
            res.json("user not found");
        }
 
    }catch(error){
        res.json(error)
    }
}

//getting all users
const getUsers= async(req,res)=>{
    try{
 const users=await userModel.find({});
 res.json(users);
    }catch(err){
        res.json(err)
    }
}

const getUser=async(req,res)=>{
    try{
        const user=req.params.id;
        if(user===req.userId){
        const userLogged=await userModel.findOne({_id:user});
        res.json(userLogged);
        }else{
            res.json("user not authorised")
        }
    }catch(error){
        res.json(error);
    }

}
// Creating a new user
const createUser= async(req,res)=>{
    const {firstName,lastName,country,password,email}=req.body
try{
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=await userModel.create({
    password:hashedPassword,
    email,
    firstName,
    lastName,
    country
  });
  res.header["authorization"] = "Token " + token(user._id);
res.json(user);
}catch(err){
 res.json(err);
}
 }

 //Deleting existing user
 const deleteUser=async(req,res)=>{
    const{firstName}=req.body;
    try{
        const deleted=await userModel.deleteOne({firstName:firstName});
        res.json(deleted);
    }catch(err){
        res.json(err);
    }

 }
 module.exports={getUsers,createUser,deleteUser,registerUser,loginUser,getUser}
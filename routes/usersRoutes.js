const express=require('express')
const {registerUser,loginUser,getUser,getUsers,deleteUser} =require("../controllers/usersControlers")
const authUser=require("../middlewares/authUser")
const usersRoutes=express.Router()

//middlewares
usersRoutes.post("/register",registerUser);
usersRoutes.post("/login",loginUser);
usersRoutes.get("/users",getUsers);
usersRoutes.get("/users/:id",authUser,getUser);
usersRoutes.delete("/users/delete",deleteUser);


module.exports=usersRoutes;
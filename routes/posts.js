const express=require('express');
const {createPost,getPosts,deletePost}=require("../controllers/postsControlers")
const authUser=require("../middlewares/authUser")
const routes=express.Router()

routes.get("/posts",getPosts);
routes.post("/posts",authUser,createPost)
routes.delete("/posts/:id",deletePost)

//export the routes instance for post routes
module.exports=routes;
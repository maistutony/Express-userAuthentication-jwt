const posts=require("../model/postModel")

const createPost=async(req,res)=>{
     const{title,content}=req.body;
     try{
        if(!title && content) res.json("supply a title");
        const post=await posts.create({
           title,
           content
        })
        res.json(post);
     }
     catch(error){
        console.log(error);
     }
}
const getPosts=async(req,res)=>{
    try{
    const allPosts=await posts.find({})
    res.json(allPosts);
    }catch(error){
        res.json(error);
    }
}
const deletePost=async(req,res)=>{
    const id=req.params;
try{
 const deleted=await posts.findOneAndDelete(id)
 res.json(deleted);
}catch(error){
    res.json(error);
}
}

module.exports={getPosts,deletePost,createPost}
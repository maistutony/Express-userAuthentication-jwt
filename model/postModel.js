const mongoose= require("mongoose");

const PostSchema=mongoose.Schema(
    {
        title:String,
        content:String,
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
          }
    }
);

//create the athiBlog model instance then export it to routes folder
module.exports=mongoose.model("posts",PostSchema);
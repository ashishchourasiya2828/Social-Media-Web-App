const postModel = require('../models/post.model');
const commentModel = require("../models/comment.model")

module.exports.createPost = async ({userId,content,media}) => {
    // console.log(userId,content,media);
    
    if(!userId || !content || !media){
        throw new Error("userId,content and media fields are required")
    }

    const newPost = await postModel.create({
        userId,
        content,
        media
    })

   return newPost; 
}

module.exports.deletePost = async ({postId,userId}) => {
    if(!postId || !userId){
        throw new Error("postId and userId fields are required")
    }

    try{
        const post = await postModel.findById(postId);

        if(!post){
            return res.status(404).json({error:"Post not found"})
        }

        if(post.userId.toString() !== userId.toString()){
            return res.status(401).json({error:"Unauthorized"})
        }

        const deletedPost = await postModel.findByIdAndDelete(postId);

        if(!deletedPost){
            return res.status(500).json({error:"Failed to delete post"})
        }

        return true;
    }catch(err){
        console.log(err);
        throw new Error("Server error")
    }
}

module.exports.likePost = async ({postId,userId})=>{
    if(!postId){
        throw new Error("postId field is required")
    }

    const post = await postModel.findById(postId);

    if(!post){
        res.status(404).json({error:"Post not found"})
    }

    const liked = post.likes.includes(userId);

    if(liked){
        await postModel.findByIdAndUpdate(postId,{$pull:{likes:userId}})
    }
    else{
        await postModel.findByIdAndUpdate(postId,{$push:{likes:userId}})
        
    }

    return liked ? "unliked" : "liked";

}

module.exports.commentOnPost = async ({postId,userId,content})=>{
    if(!postId || !userId || !content){
        throw new Error("postId,userId and content fields are required")
    }

    const comment = await commentModel.create({
        postId,
        userId,
        content
    })

    if(!comment){
        throw new Error("Failed to create comment")
    }

    const post = await postModel.findByIdAndUpdate(postId,{$push:{comments:comment._id}})
    if(!post){
        throw new Error("Failed to update post")
    }

    return comment;
}
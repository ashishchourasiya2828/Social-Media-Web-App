const mongoose = require("mongoose")
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
    }).then((p) => p.populate('userId', 'username profilePicture'));

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

        const comments = await commentModel.find({postId}).select("_id");

        if(comments.length > 0){
            await commentModel.deleteMany({postId});

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
       return res.status(404).json({error:"Post not found"})
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

module.exports.commentOnPost = async ({postId,userId,content,parentCommentId})=>{
    if(!postId || !userId || !content){
        throw new Error("postId,userId and content fields are required")
    }
    
    try{

        const post = await postModel.findById(postId);

        if(!post){
            throw new Error("Post not found")
        }


        const comment = await commentModel
        .create({ postId, userId, content,parentCommentId : parentCommentId || null })

        if(!comment){
            throw new Error("Failed to create comment")
        }

        const aggregatedComment = await commentModel.aggregate([
            {
              $match: { _id: comment._id } // Find the created comment
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                pipeline: [
                  { $project: { _id: 1, username: 1, profilePicture: 1 } }
                ],
                as: "userData"
              }
            },
            { $unwind: "$userData" } // Convert userId array into an object
          ]);


if (!aggregatedComment.length) {
    throw new Error("Failed to fetch comment with user details");
  }

  const finalComment = aggregatedComment[0]; // Extract the single result

        
        
        const updatedPost = await postModel.findByIdAndUpdate(postId,
            { $push: { comments: comment._id }},
            { new: true }
    );
        
        
        if(!updatedPost){
            throw new Error("Failed to update post")
        }
        
        return finalComment;
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: "Server error" });    }

}

module.exports.deleteComment = async ({commentId,userId})=>{
    if(!commentId || !userId){
        throw new Error("userId or PostId required");
    }

    const comment = await commentModel.findById(commentId);

    if(!comment){
        return res.status(404).json({error:"comment not found"})
    }

    if(comment.userId.toString() !== userId.toString())
    {
        return res.status(403).json({error:"Unauthorized Action userId id is not match "})
    }

    await commentModel.findByIdAndDelete(commentId);

    await postModel.findByIdAndUpdate(comment.postId,{
        $pull:{comments:commentId}
    })

    return true;


}
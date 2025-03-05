const postModel = require('../models/post.model');
const { validationResult } = require('express-validator');
const postService = require("../services/post.service")
const userModel = require("../models/user.model");
const commentModel = require('../models/comment.model');
const { default: mongoose, Types } = require('mongoose');

module.exports.createPost = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    if(!req.file){
        return res.status(400).json({error:"Media is required"});
    }

    const media = req.file.path;
    const {content} = req.body;
    const userId = req.user._id;
    // console.log(userId);
    
    

 try{
    const post = await postService.createPost({userId, content, media})

    if(!post){
        return res.status(500).json({error:"Post not created"})
    }

   const updatedResult =  await userModel.findByIdAndUpdate(userId, {
        $push: { posts: post._id }
    });

    if(!updatedResult){
        return res.status(500).json({error:"failed to update user post "});
    }

    return res.status(201).json(post);

 }catch(err){
     console.log(err);
    return res.status(500).json({error:"Server error"})
 }

}

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'username profilePicture')
        .populate('likes', 'username profilePicture')
        .populate({
            path: 'comments',
            populate: {
                path: 'userId',
                select: 'username profilePicture content'
            }
        });
       return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }

}

module.exports.getPostsByUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { id } = req.params;
        const posts = await postModel.find({userId:id}).sort({createdAt:-1});
        if(posts.length === 0){
            return res.status(404).json({error:"No posts found for this user"})
        }

        return res.status(200).json(posts);


    }catch(err){
              console.log(err);
              return res.status(500).json({error:"Server error"})
    }
}

module.exports.deletePost = async (req, res) => {
    try {

        const postId = req.params.id;
        const userId = req.user._id;

        

        await postService.deletePost({postId,userId});

        const updatedResult = await userModel.findByIdAndUpdate(userId, {
            $pull: { posts: postId }
        });

        if(!updatedResult){
            return res.status(500).json({error:"Failed to update user posts"})
        }

        return res.status(200).json({message:"Post deleted"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports.likePost = async (req,res)=>{
    try{

        const postId = req.params.id;
        const userId = req.user._id


      const liked =  await postService.likePost({postId,userId});

      return res.status(200).json({message:liked});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"})
    }   
}

module.exports.commentOnPost = async (req,res)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const postId = req.params.id;
        const userId = req.user._id;
        const {content,parentCommentId} = req.body;
        
        
       const comment =  await postService.commentOnPost({postId,userId,content,parentCommentId});

         return res.status(201).json(comment);
    }catch(err){
        return res.status(500).json({error:" internal Server error"})
    }

}

module.exports.getComments = async (req,res)=>{
    try{
        const postId = req.params.id;

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

       const comments = await commentModel.aggregate([
        {
             $match: { postId: new mongoose.Types.ObjectId(postId),parentCommentId:null }
        },
        {
            $lookup: {
              from: "users",  // Jis collection se join karna hai
              localField: "userId",  // Jo field match karni hai (comments.userId)
              foreignField: "_id",  // Us collection mein jo primary key hai (users._id)
              pipeline: [
                { $project: { _id: 1, username: 1, profilePicture: 1 } }  // **Only required fields**
            ],
              as: "userData"  // Jo result array milega uska naam
            }
          },
          { $unwind: "$userData" },
       
        {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "parentCommentId",
              as: "replies"
            }
          },
          {
            $lookup: {
                from: "users",
                localField: "replies.userId",
                foreignField: "_id",
                pipeline: [
                    { $project: { _id: 1, username: 1, profilePicture: 1 } }  // **Only required fields**
                ],
                as: "repliesUserData"
            }
        },

        {
            $addFields: {
                "replies": {
                    $map: {
                        input: "$replies",
                        as: "reply",
                        in: {
                            $mergeObjects: [
                                "$$reply",
                                {
                                    userData: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$repliesUserData",
                                                    as: "user",
                                                    cond: { $eq: ["$$user._id", "$$reply.userId"] }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        { $unset: "repliesUserData" }

    
        //   { $sort: { createdAt: -1 } } 

       ])

        // const comments = await commentModel.find({postId}).populate('userId','username profilePicture');
        
        return res.status(200).json(comments);
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"})
    }
}

module.exports.deleteComment = async (req,res)=>{
    try{
    const commentId = req.params.id;
    const userId = req.user._id;

    await postService.deleteComment({commentId,userId});
   
    return res.status(200).json({message:"Comment Deleted Successfully"})

    }catch(err){
        res.status(500).json({error:"internal one server error"});
    }
}
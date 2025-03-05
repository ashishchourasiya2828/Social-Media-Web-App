const mongoose  = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    parentCommentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment",
        default:null
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("comment",commentSchema);
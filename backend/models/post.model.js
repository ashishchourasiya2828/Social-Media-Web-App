const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content:{
        type: String,
        required: true,
    },
    media:{
        type: String,
        default: null,
        // required: true
        
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
})

module.exports = mongoose.model('post', PostSchema);

  
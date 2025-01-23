const { body,param,query } = require('express-validator');

exports.createPostValidator = [
    body('content').isString().isLength({min:3,max:150}).withMessage("Content must be 3 to 150 characters long"),
    // body('media').isString().withMessage("Media must be a string")
]

exports.updatePostValidator = [
    param('postId').isMongoId().withMessage("Invalid post id"),
    body('content').isString().isLength({min:3,max:150}).withMessage("Content must be 3 to 150 characters long"),
    body('media').isString().withMessage("Media must be a string")
]

exports.getPostByUserValidator = [
    param('id').isMongoId().withMessage("Invalid user id")
]
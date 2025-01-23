const {body,param} = require('express-validator');

exports.createCommentValidator = [
    body('content').isString().withMessage("Content must be a string").isLength({min:1,max:150}).withMessage("Content is required and min length is 1 and max length is 150"),
    param("id").isMongoId().withMessage("Post id is required")
]
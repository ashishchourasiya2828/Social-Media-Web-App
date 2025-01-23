const {body,query,param} = require("express-validator")

exports.registerUserValidator = 
[
    body('username').isLength({min: 3,max:20}).withMessage("username must be at least 3 characters long and at most 20 characters long"),
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min: 6,max:15}).withMessage("Password must be at least 6 characters long and at most 15 characters long"),
]

exports.loginUserValidator = [
        body('email').isEmail().withMessage("Please enter a valid email"),
        body('password').isLength({min: 6,max:15}).withMessage("Password must be at least 6 characters long and at most 15 characters long"),
]

exports.resetPasswordEmailValidator = [
        body('email').isEmail().withMessage("Please enter a valid email"),
    
]

exports.resetPasswordValidator = [
    query('token').isString().withMessage("Invalid token"),
    body('password').isLength({min: 6,max:15}).withMessage("Password must be at least 6 characters and at most 15 characters long"),
  ]

exports.followUserValidator = [
    param('id').isMongoId().withMessage("Invalid user id")
]

exports.updateProfilePictureValidator = [
    body('profilePicture').isURL().withMessage("Please enter a valid URL")
];
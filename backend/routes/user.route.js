const express = require('express');
const router = express.Router();
const {body,query,param} = require("express-validator")
const controller = require("../controllers/user.controller");
const { authUser } = require('../middleware/auth.middleware');
const { registerUserValidator, loginUserValidator, resetPasswordEmailValidator, followUserValidator } = require('../middleware/userValidator.middleware');
const {uploadProfilePicture} = require('../services/multer');

router.post('/register',registerUserValidator, controller.registerUser)

router.post('/login',loginUserValidator,  controller.loginUser)

router.get('/logout',authUser, controller.logoutUser)

router.get('/:id/profile',authUser, controller.userProfile)

router.put('/:id/update',authUser,controller.updateProfile)

router.post('/reset-password',resetPasswordEmailValidator, controller.sendResetPasswordMail);

router.post('/reset-password/:token',  controller.resetPassword);

router.post('/:id/follow',followUserValidator,authUser,controller.followUser)

router.post('/:id/profile-picture', authUser, uploadProfilePicture.single('profilePicture'), controller.updateProfilePicture);


module.exports = router;
const express = require('express');
const router = express.Router();

const { authUser } = require('../middleware/auth.middleware');
const postController = require('../controllers/post.controller');
const { createPostValidator, getPostByUserValidator } = require('../middleware/postValidator.middleware');
const {uploadPostMedia} = require('../services/multer');
const { createCommentValidator } = require('../middleware/commentValidator.middleware');

router.post('/create',uploadPostMedia.single('media'),createPostValidator,authUser,postController.createPost); 

router.get('/all-posts',authUser,postController.getAllPosts);

router.get("/user/:id",getPostByUserValidator,authUser,postController.getPostsByUser);

router.post("/:id/delete",authUser,postController.deletePost);

router.post("/:id/like",authUser,postController.likePost);

router.post("/:id/comment",createCommentValidator,authUser,postController.commentOnPost);

router.get("/:id/comments",authUser,postController.getComments);

module.exports = router;
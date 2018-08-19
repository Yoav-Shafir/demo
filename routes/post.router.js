const express = require('express');

const postRouter = express.Router();
const PostController = require('../controllers/Post.controller');
const verifyToken = require('../middlewares/verifyToken.middleware');

postRouter.post('/', verifyToken, PostController.create);

module.exports = postRouter;

const mongoose = require('mongoose');
require('../models/Post.model');

const PostModel = mongoose.model('post');

class PostService {
}

module.exports = new PostService();

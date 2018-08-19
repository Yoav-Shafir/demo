const AuthService = require('../services/Auth.service');

class PostController {
  static async create(req, res) {
    try {
      const authData = await AuthService.verify(req.token);
      return res.json({
        message: 'Post created...', // Simulating Post creation.
        authData
      });
    } catch (err) {
      return res.sendStatus(303);
    }
  }
}

module.exports = PostController;

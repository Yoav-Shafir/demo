const UserService = require('../services/User.service');

class UserController {
  static async register(req, res) {
    try {
      const user = await UserService.register(req);
      return res.send(user);
    } catch (err) {
      return res.status(404).send(err);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body.email;
    try {
      const token = await UserService.login(email, password);
      return res.send(token);
    } catch (err) {
      return res.status(404).send(err);
    }
  }
}

module.exports = UserController;

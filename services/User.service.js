
const mongoose = require('mongoose');
const AuthService = require('./Auth.service');

// Ref to the Schema registration/definition.
require('../models/User.model');

// Create an instance of the model.
const User = mongoose.model('user');

class UserService {
  static register(req) {
    return new Promise((resolve, reject) => {
      // Create new User object.
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdAt: req.body.date
      };

      (async () => {
        try {
          // Hash password.
          const hash = await AuthService.hash(req.body.password);
          newUser.password = hash;
          // Save User to db.
          const user = await new User(newUser).save();
          resolve(user);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  static async login(email, password) {
    // Get User from db.
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    try {
      // Make sure password match the encrypted passworod.
      const isValidPassword = await AuthService.isValidPassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      // Sign the user data with the secret key and generate new token
      // for future requests.
      const token = await AuthService.sign(user);
      return token;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;

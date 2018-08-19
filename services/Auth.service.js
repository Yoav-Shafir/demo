const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class AuthService {
  static isValidPassword(password1, password2) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password1, password2, (err, res) => {
        res ? resolve() : reject(err);
      });
    });
  }

  static hash(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err1, salt) => {
        if (err1) return reject(err1);
        return bcrypt.hash(password, salt, (err2, hash) => {
          if (err2) return reject(err2);
          return resolve(hash);
        });
      });
    });
  }

  static sign(user) {
    return new Promise((resolve, reject) => {
      jwt.sign({ user }, config.auth.secret, { expiresIn: config.auth.expiresIn }, (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      });
    });
  }

  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.auth.secret, (err, authData) => {
        if (err) return reject(err);
        return resolve(authData);
      });
    });
  }
}

module.exports = AuthService;

const express = require('express');

const userRouter = express.Router();
const UserController = require('../controllers/User.controller');

// Register/Create new User.
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);

module.exports = userRouter;

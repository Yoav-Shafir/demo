const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const chalk = require('chalk');
const debug = require('debug')('app:main');
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const config = require('./config/config');

const app = express();

// Set routes
const userRouter = require('./routes/user.router');
const blockchainRouter = require('./routes/blockchain.router');
const postRouter = require('./routes/post.router');

(async () => {
  try {
    await mongoose.connect(config.mongodb.connection, {
      useNewUrlParser: true,
    });
    debug('MongoDB Connected...');
  } catch (err) {
    debug(chalk.red(err));
  }
})();

// Logger middleware for all HTTP requests.
app.use(morgan('tiny'));

// Custom middlware.
app.use((req, res, next) => {
  debug(chalk.blue(moment().format('YYYY-MM-DD hh:mm:ss a')));
  next();
});
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/blockchain', blockchainRouter);
app.use('/posts', postRouter);

const port = 5000;
app.listen(port, () => debug(`Server started on port ${chalk.blue(port)}`));

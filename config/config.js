const config = {
  auth: {
    expiresIn: '1h',
    secret: 'secret'
  },
  mongodb: {
    connection: 'mongodb://localhost:27017/demo'
  },
  hash: {
    secret: 'secret'
  }
};

module.exports = config;

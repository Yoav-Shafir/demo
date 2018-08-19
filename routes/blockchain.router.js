const express = require('express');

const blockchainRouter = express.Router();
const BlockchainController = require('../controllers/Blockchain.controller');

blockchainRouter.get('/verify', BlockchainController.verify);
blockchainRouter.get('/:limit', BlockchainController.get);
blockchainRouter.post('/', BlockchainController.create);

module.exports = blockchainRouter;

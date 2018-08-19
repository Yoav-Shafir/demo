const BlockchainService = require('../services/Blockchain.service');

class BlockchainController {
  static async create(req, res) {
    try {
      const block = await BlockchainService.create(req);
      return res.send(block);
    } catch (err) {
      return res.status(404).send(err);
    }
  }

  static async get(req, res) {
    try {
      const block = await BlockchainService.get(req.query.limit);
      return res.send(block);
    } catch (err) {
      return res.status(404).send(err);
    }
  }

  static async verify(req, res) {
    try {
      const result = await BlockchainService.verify();
      return res.send(result);
    } catch (err) {
      return res.status(404).send(err);
    }
  }
}

module.exports = BlockchainController;

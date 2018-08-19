
const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');
const config = require('../config/config');

// Ref to the Schema registration/definition.
require('../models/Block.model');

// Create an instance of the model.
const Block = mongoose.model('block');

class BlockchainService {
  static create(req) {
    return new Promise((resolve, reject) => {
      // Extract Block data from request object.
      const { data } = req.body;
      const newBlock = {
        data,
        createdAt: moment().format('YYYY-MM-DD hh:mm:ss a'),
        nonce: 0
      };

      (async () => {
        // Get last block.
        const result = await BlockchainService.get(1);
        // Set newBlock previousHash.
        newBlock.previousHash = !result.length ? '0' : result[0].hash;
        newBlock.hash = BlockchainService.mine(newBlock);
        try {
          // Save Block to db.
          const block = await new Block(newBlock).save();
          resolve(block);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  // Proof of work.
  static mine(block) {
    let { nonce } = block;
    let hash;
    while (!/^00/.test(hash)) {
      hash = BlockchainService.hash(block, ++nonce);
    }
    return hash;
  }

  static hash(block, nonce) {
    const hash = crypto.createHmac('sha256', config.hash.secret)
      .update(JSON.stringify(block.data) + block.createdAt + block.previousHash + nonce)
      .digest('hex');
    return hash;
  }

  static get(limit = 10) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const block = await Block.find({}).sort('-createdAt').limit(limit);
          resolve(block);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  static verify() {
    return new Promise((resolve, reject) => {
      (async () => {
        // Get all blocks.
        const blocks = await BlockchainService.get();
        blocks.reverse();
        let isValid = true;

        // Compare hashes.
        for (let i = 1; i < blocks.length; i++) {
          const currentBlock = blocks[i];
          const prevBlock = blocks[i - 1];

          if (currentBlock.previousHash !== prevBlock.hash) {
            isValid = false;
            break;
          }

          isValid ? resolve('ok') : reject(new Error('Blockchain invalid'));
        }
      })();
    });
  }
}

module.exports = BlockchainService;

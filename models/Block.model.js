const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlockSchema = new Schema({
  data: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  previousHash: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});

mongoose.model('block', BlockSchema);

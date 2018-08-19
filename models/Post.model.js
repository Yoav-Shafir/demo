const mongoose = require('mongoose');

const { Schema } = mongoose;

// Post Schema Definition.
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('post', PostSchema);

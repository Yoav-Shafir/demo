const mongoose = require('mongoose');

const { Schema } = mongoose;

// User Schema Definition.
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('user', UserSchema);

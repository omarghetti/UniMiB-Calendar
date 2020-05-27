const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);

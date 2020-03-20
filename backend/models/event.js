const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  timeStart: {
    type: Date,
    required: true,
    default: Date.now
  },
  timeEnd: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);

const mongoose = require('mongoose');
const EventType = require('./eventType');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: false,
  },
  type: {
    type: EventType.schema,
    required: false,
  },
  start: {
    type: Date,
    required: false,
    default: Date.now,
  },
  end: {
    type: Date,
    required: false,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  allDay: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model('Event', eventSchema);

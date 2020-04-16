const mongoose = require('mongoose');

const ONE_HOUR = 60 * 60 * 1000;

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: false,
    maxlength: 16,
  },
  type: {
    type: String,
    enum: ['GENERIC_MEETING', 'PROJECT_REVIEW', 'THESIS_REVIEW', 'LESSON_CLARIFICATIONS'],
    required: false,
    default: 'GENERIC_MEETING',
  },
  start: {
    type: Date,
    required: false,
    default: Date.now,
  },
  end: {
    type: Date,
    required: false,
    default: () => Date.now() + ONE_HOUR,
  },
  allDay: {
    type: Boolean,
    required: false,
    default: false,
  },
  participants: {
    type: [String],
    required: false,
    default: [],
  },
  location: {
    type: String,
    required: false,
    default: '',
    maxlength: 50,
  },
  attachments: {
    type: [String],
    required: false,
    default: [],
  },
  notes: {
    type: String,
    required: false,
    default: '',
    maxlength: 50,
  },
});

module.exports = mongoose.model('Event', eventSchema);

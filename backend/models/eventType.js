const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
  key: {
    type: String,
    enum: ['genericMeeting', 'projectReview', 'thesisReview', 'lessonClarification'],
    required: true,
    default: 'genericMeeting',
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('EventType', eventTypeSchema);

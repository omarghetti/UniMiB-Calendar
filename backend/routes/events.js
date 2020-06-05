const express = require('express');

const router = express.Router();
const Event = require('../models/event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ participants: req.user.email }).select(
      '_id title start end allDay type participants place notes',
    );
    res.json(events);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get all event types
router.get('/types', async (req, res) => {
  try {
    const types = Event.schema.path('type').enumValues;
    res.json(types);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get one event by id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ participants: req.user.email, _id: req.params.id });
    if (!event) {
      res.status(404).json({
        message: 'Not found.',
      });
    } else {
      res.json(event);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Create one event
router.post('/', async (req, res) => {
  const event = new Event({
    ...req.body,
  });

  // add event creator to participants if not already present
  if (!event.participants.includes(req.user.email)) {
    event.participants.push(req.user.email);
  }

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// Delete all events
router.delete('/', async (req, res) => {
  try {
    const result = await Event.deleteMany({});
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;

const express = require('express');

const router = express.Router();
const Event = require('../models/event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().select('_id title start end allDay type');
    res.json(events);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get one event by id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
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

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;

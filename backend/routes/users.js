const express = require('express');

const router = express.Router();
const User = require('../models/user');

// Get all mails
router.get('/emails', async (req, res) => {
  try {
    const users = await User.find().select('email');
    const emails = users.map(u => u.email);
    res.json(emails);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;

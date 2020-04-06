/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

console.info('DB URL', process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', err => {
  console.error('Error connecting to DB.!', err);
});
db.once('open', () => {
  console.info('Connectet to DB.');
});

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'ui')));

const eventsRouter = require('./routes/events');

app.use('/api/events', eventsRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.listen(PORT, HOST);
console.info(`Listening on ${HOST}:${PORT}`);

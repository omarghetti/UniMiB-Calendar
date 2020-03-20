'use strict';

require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const eventsRouter = require('./routes/events')
app.use('/events', eventsRouter)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

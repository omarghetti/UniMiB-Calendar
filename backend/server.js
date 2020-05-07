/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
require('./config/passport.js')(passport);
const bodyParser = require('body-parser');

console.info('DB URL', process.env.DATABASE_URL);

const session = require('express-session');
const { isLoggedIn } = require('./middlewares/authMiddleware');

// db connection
const db = mongoose.connection;
db.on('error', err => {
  console.error('Error connecting to DB!', err);
});
db.once('open', () => {
  console.info('Connectet to DB.');
});

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'ui')));
app.use(
  cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
  }),
);

// passport setup
app.use(express.static('public'));
app.use(session({ secret: 'cats' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventsRouter = require('./routes/events');

app.get('/api/user', (req, res) => {
  res.send(req.user);
});

// route for logging out
app.get('/api/logout', (req, res) => {
  console.info('Logged out bye bye');
  req.logout();
  res.send({ redirectUrl: '/login' });
});

// =====================================
// MOCK ROUTES =======================
// =====================================
app.get(
  '/api/auth/mock',
  passport.authenticate('mock', {
    successRedirect: '/api/user',
    failureRedirect: '/login',
    failureFlash: 'Invalid mock credentials.',
  }),
);

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/user',
    failureRedirect: '/login',
    failureFlash: 'Invalid Google credentials.',
  }),
);

// Twitter Routes
app.get('/api/auth/twitter', passport.authenticate('twitter'));
app.get(
  'api/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/api/user',
    failureRedirect: '/login',
    failureFlash: 'twitter credentials invalid',
  }),
);

// Facebook Routes
app.get('/api/auth/facebook', passport.authenticate('facebook'));
app.get(
  'api/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/user',
    failureRedirect: '/login',
    failureFlash: 'facebook credentials invalid',
  }),
);

app.use('/api/events', isLoggedIn, eventsRouter);

app.get('/*', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.listen(PORT, HOST);
console.info(`Listening on ${HOST}:${PORT}`);

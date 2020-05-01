/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/user', (req, res) => {
  console.info('user', req.user);
  res.send(req.user);
});

// route for login form
// route for processing the login form
// route for signup form
// route for processing the signup form

// route for showing the profile page
app.get('/profile', isLoggedIn, (req, res) => {
  console.info('Logged in hello', req.user);
  res.send(req.user);
});

// route for logging out
app.get('/logout', (req, res) => {
  console.info('Logged out bye bye');
  req.logout();
  res.send({ redirectUrl: '/login' });
});

// facebook routes
// twitter routes

// =====================================
// MOCK ROUTES =======================
// =====================================
app.get(
  '/auth/mock',
  passport.authenticate('mock', {
    successRedirect: '/profile',
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
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: 'Invalid Google credentials.',
  }),
);

app.use('/api/events', eventsRouter);

app.get('/aa', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.listen(PORT, HOST);
console.info(`Listening on ${HOST}:${PORT}`);

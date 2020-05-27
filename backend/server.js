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

app.use(
  cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
  }),
);

// passport setup
app.use(express.static('static'));
app.use(express.static(path.join(__dirname, 'ui', 'login')));
app.use(express.static(path.join(__dirname, 'ui', 'app')));
app.use(session({ secret: 'cats' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');

app.get('/api/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'login', 'index.html'));
});

app.get('/api/user', (req, res) => {
  res.send(req.user);
});

// route for logging out
app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/api/login');
  console.info('Logged out bye bye');
});

// =====================================
// MOCK ROUTES =======================
// =====================================
app.get(
  '/api/auth/mock',
  passport.authenticate('mock', {
    successRedirect: '/app',
    failureRedirect: '/api/login',
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

// e callback after google has authenticated the user
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/api/login',
    failureFlash: 'Invalid Google credentials.',
  }),
);

// Twitter Routes
app.get('/api/auth/twitter', passport.authenticate('twitter'));
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/app',
    failureRedirect: '/api/login',
    failureFlash: 'twitter credentials invalid',
  }),
);

// Facebook Routes
app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/app',
    failureRedirect: '/api/login',
    failureFlash: 'facebook credentials invalid',
  }),
);

app.use('/api/events', isLoggedIn, eventsRouter);
app.use('/api/users', isLoggedIn, usersRouter);

app.get('/app', isLoggedIn, (req, res) => {
  console.info('serve app');
  res.sendFile(path.join(__dirname, 'ui', 'app', 'index.html'));
});

app.listen(PORT, HOST);
console.info(`Listening on ${HOST}:${PORT}`);

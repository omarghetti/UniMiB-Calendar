/* eslint-disable no-console */
/* eslint-disable func-names */

// config/passport.js

// load all the things we need
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const MockStrategy = require('passport-mock-strategy');

// load up the user model
const User = require('../models/user');

// load the auth letiables
const configAuth = require('./auth');

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.info('serialize', user.id);
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.info('deserialize');

    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // code for login (use('local-login', new LocalStategy))
  // code for signup (use('local-signup', new LocalStategy))
  // code for facebook (use('facebook', new FacebookStrategy))
  // code for twitter (use('twitter', new TwitterStrategy))

  // =========================================================================
  // MOCK ==================================================================
  // =========================================================================

  passport.use(
    new MockStrategy(
      {
        name: 'mock',
        user: {
          id: 'fake-user',
        },
        callbackURL: 'http://localhost:8080/auth/mock/callback',
      },
      (profile, done) => {
        // Perform actions on user, call done once finished

        User.findOne({ profileId: profile.id }, function(err, user) {
          if (err) return done(err);

          if (user) {
            // if a user is found, log them in
            return done(null, user);
          }
          // if the user isnt in our database, create a new user
          const newUser = new User();
          // set all of the relevant information
          newUser.profileId = 'fake-user';
          newUser.token = 'fake-token';
          newUser.name = 'fake-name';
          newUser.email = 'fake-email';
          newUser.avatar = 'http://www.nretnil.com/avatar/LawrenceEzekielAmos.png';

          console.info('new user', newUser);

          // save the user
          newUser.save(function(e) {
            if (e) {
              console.info('error saving user');
            }
            return done(null, newUser);
          });

          return null;
        });
      },
    ),
  );

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(
    new GoogleStrategy(
      {
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
      },
      function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
          // try to find the user based on their google id
          User.findOne({ email: profile.emails[0].value }, function(
            err,
            user,
          ) {
            if (err) return done(err);

            if (user) {
              // if a user is found, log them in
              return done(null, user);
            }
            // if the user isnt in our database, create a new user
            const newUser = new User();
            // set all of the relevant information
            newUser.profileId = profile.id;
            newUser.token = token;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value; // pull the first email
            newUser.avatar = profile.photos[0].value;

            console.info('new user', newUser);

            // save the user
            newUser.save(function(e) {
              if (e) {
                console.info('error saving user');
              }
              return done(null, newUser);
            });

            return null;
          });
        });
      },
    ),
  );

  //= ==============================================================
  // TWITTER =======================================================
  //= ==============================================================

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        userProfileURL:
          'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
        callbackURL: configAuth.twitterAuth.callbackURL,
      },
      function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
          User.findOne({ email: profile.emails[0].value }, function(
            err,
            user,
          ) {
            if (err) {
              return done(err);
            }

            if (user) {
              return done(null, user);
            }

            const newUser = new User();

            newUser.profileId = profile.id;
            newUser.token = token;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.avatar = profile.photos[0].value;

            console.info('newUser', newUser);

            newUser.save(function(e) {
              if (e) {
                console.info('error saving user', e);
              }
              return done(null, newUser);
            });
            return null;
          });
        });
      },
    ),
  );

  //= =======================================================================
  // FACEBOOK ===============================================================
  //= =======================================================================
  passport.use(
    new FacebookStrategy(
      {
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['emails', 'displayName', 'photos'],
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
          User.findOne({ email: profile.emails[0].value }, function(
            err,
            user,
          ) {
            if (err) {
              return done(err);
            }

            if (user) {
              return done(null, user);
            }

            const newUser = new User();

            newUser.profileId = profile.id;
            newUser.email = profile.emails[0].value;
            newUser.name = profile.displayName;
            newUser.token = accessToken;
            newUser.avatar = profile.photos[0].value;

            console.info('newUser', newUser);

            newUser.save(function(e) {
              if (e) {
                console.info('error saving user', e);
              }
              return done(null, newUser);
            });
            return null;
          });
        });
      },
    ),
  );
};

// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  facebookAuth: {
    clientID: 'yourClientID', // your App ID
    clientSecret: 'yourClientSecret', // your App Secret
    callbackURL: '/auth/facebook/callback',
  },
  twitterAuth: {
    consumerKey: 'yourConsumerKey',
    consumerSecret: 'yourConsumerSecret',
    callbackURL: '/auth/twitter/callback',
  },
  googleAuth: {
    clientID: 'yourGoogleKey',
    clientSecret: 'yourgoogleSecret',
    callbackURL: '/auth/google/callback',
  },
};

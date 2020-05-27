// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  facebookAuth: {
    clientID: '479167046124926', // your App ID
    clientSecret: '3889b44c6247f4188c0349da6d260964', // your App Secret
    callbackURL: '/auth/facebook/callback',
  },
  twitterAuth: {
    consumerKey: 'Ud5cBs7Q9iFUnt1RDM7Nh4pU8',
    consumerSecret: 'eOnbdwdADC7irzdaF7tJUniQ7aBs0E29y6ucpEtCwePfv9kayt',
    callbackURL: '/auth/twitter/callback',
  },
  googleAuth: {
    clientID: '645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com',
    clientSecret: 'sTHEWR4LJBcMk3JKrbxz5pSl',
    callbackURL: '/auth/google/callback',
  },
};

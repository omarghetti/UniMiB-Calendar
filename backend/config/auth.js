// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  facebookAuth: {
    clientID: 'your-secret-clientID-here', // your App ID
    clientSecret: 'your-client-secret-here', // your App Secret
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
  },

  twitterAuth: {
    consumerKey: 'your-consumer-key-here',
    consumerSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:8080/auth/twitter/callback',
  },

  googleAuth: {
    clientID: '645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com',
    clientSecret: 'sTHEWR4LJBcMk3JKrbxz5pSl',
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
};

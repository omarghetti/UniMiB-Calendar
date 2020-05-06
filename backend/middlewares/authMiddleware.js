/* eslint-disable no-console */

// route middleware to make sure a user is logged in

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.info('Ok pass through', req.isAuthenticated());
    return next();
  }

  // if they aren't redirect them to the home page
  console.info('You cannot pass');

  return res.status(401).json({
    message: 'Unauthorized',
  });
}

module.exports = {
  isLoggedIn,
};

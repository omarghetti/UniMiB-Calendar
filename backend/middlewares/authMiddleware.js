// route middleware to make sure a user is logged in
/* eslint-disable no-console */

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.info('Ok pass through', req.isAuthenticated());
    return next();
  }

  // if they aren't redirect them to the home page
  console.info('You cannot pass');

  return res.redirect('/');
}

module.exports = {
  isLoggedIn,
};

const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

async function verifyAuth(req, res, next) {
  const tokenId = req.headers.authorization;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    req.userEmail = payload.email;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Unauthorized.',
    });
  }
}

module.exports = { verifyAuth };

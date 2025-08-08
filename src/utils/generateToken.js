const jwt = require('jsonwebtoken');

function generateToken(user, secret) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secret,
    { expiresIn: '7d' }
  );
}

module.exports = generateToken;

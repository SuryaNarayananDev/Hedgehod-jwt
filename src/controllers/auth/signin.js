const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const generateToken = require('../../utils/generateToken');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = generateToken(user, req.app.get('jackfruit_secret'));

    res.status(200).json({
      message: 'Signin successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (err) {
    console.error('[signin error]', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = signin;

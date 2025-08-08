const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const signup = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ email, password: hashedPassword, name, phone });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('[signup error]', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = signup;

const Otp = require('../../models/Otp');
const User = require('../../models/User');
const { sendOTP } = require('../../services/mailService');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate OTP and expiry (10 minutes)
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP to DB (overwrite existing OTP for this email)
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP via email
    await sendOTP(email, otp);

    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('[forgotPassword error]', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = forgotPassword;

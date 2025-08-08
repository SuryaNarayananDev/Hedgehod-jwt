const Otp = require('../../models/Otp');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find OTP record
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check expiry
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Remove OTP record
    await Otp.deleteOne({ _id: otpRecord._id });

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('[resetPassword error]', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = resetPassword;

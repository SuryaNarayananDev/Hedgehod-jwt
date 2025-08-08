const admin = require('firebase-admin');
const getOtpSubject = require('./templates/otpSubject');
const getOtpContent = require('./templates/otpContent');

let initialized = false;

function initFirebase(firebaseConfig) {
  if (!initialized && firebaseConfig) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
    initialized = true;
  }
}

async function sendOTP(email, otp) {
  if (!initialized) {
    console.error('[jackfruit] Firebase not initialized.');
    return;
  }

  const mailOptions = {
    to: email,
    message: {
      subject: getOtpSubject(),
      text: getOtpContent(otp),
    },
  };

  try {
    await admin.messaging().send(mailOptions);
    console.log(`[jackfruit] OTP sent to ${email}`);
  } catch (error) {
    console.error('[jackfruit] OTP email failed:', error.message);
  }
}

module.exports = { initFirebase, sendOTP };

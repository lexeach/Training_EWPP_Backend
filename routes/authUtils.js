// backend/routes/authUtils.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { google } = require('googleapis');

const User = mongoose.models.User || mongoose.models.user || mongoose.model('User');
const otpCache = new Map();

// 🚀 Google OAuth2 Client Setup
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

// Mail Transporter generate karne ka dynamic function (Jo Timeout nahi hone dega)
async function createTransporter() {
  try {
    // Refresh token se fresh access token nikalna
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken
      },
      // Render network timeouts ko bypass karne ke liye important settings
      tls: {
        rejectUnauthorized: false
      }
    });

    return transporter;
  } catch (error) {
    console.error("Transporter Creation Error:", error);
    throw error;
  }
}

// 🎯 1. Signup ke liye OTP bhejna
router.post('/send-signup-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: "ईमेल पहले से रजिस्टर्ड है।" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpCache.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EWPP Portal - ईमेल वेरिफिकेशन OTP',
      html: `<h3>EWPP ट्रेनिंग पोर्टल में आपका स्वागत है</h3>
             <p>साइनअप पूरा करने के लिए आपका OTP नीचे दिया गया है:</p>
             <h2 style="color: #0284c7; letter-spacing: 2px;">${otp}</h2>`
    };

    const sendEmailTransporter = await createTransporter();
    await sendEmailTransporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'OTP ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    console.error("OAuth2 Signup OTP Error:", error);
    res.status(500).json({ success: false, message: 'ईमेल भेजने में सर्वर एरर: ' + error.message });
  }
});

// 🎯 2. Signup OTP verify karna
router.post('/verify-signup-otp', (req, res) => {
  const { email, otp } = req.body;
  const data = otpCache.get(email);

  if (!data) return res.status(400).json({ success: false, message: 'OTP एक्सपायर हो गया है।' });
  if (data.otp !== otp) return res.status(400).json({ success: false, message: 'गलत OTP, कृपया दोबारा जांचें।' });

  otpCache.delete(email);
  res.status(200).json({ success: true, message: 'ईमेल सफलतापूर्वक वेरीफाई हो गई।' });
});

// 🎯 3. Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'यह ईमेल हमारे रिकॉर्ड में नहीं है।' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; 
    await user.save();

    const resetUrl = `https://training-ewpp-frontend.onrender.com/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EWPP Portal - पासवर्ड रीसेट रिक्वेस्ट',
      html: `<p>आपने पासवर्ड रीसेट करने का अनुरोध किया है। नीचे दिए गए लिंक पर क्लिक करके अपना पासवर्ड बदलें:</p>
             <a href="${resetUrl}" style="background:#0284c7; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px; display:inline-block;">पासवर्ड रीसेट करें</a>`
    };

    const sendEmailTransporter = await createTransporter();
    await sendEmailTransporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'पासवर्ड रीसेट लिंक आपकी ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    console.error("OAuth2 Forgot Password Error:", error);
    res.status(500).json({ success: false, message: 'सर्वर एरर: ' + error.message });
  }
});

// 🎯 4. Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ success: false, message: 'टोकन अमान्य है या एक्सपायर हो चुका है।' });

    user.password = password; 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'पासवर्ड सफलतापूर्वक बदल गया है!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'पासवर्ड बदलने में एरर।' });
  }
});

module.exports = router;
// backend/routes/authUtils.js
const express = require('express');
const router = express.Router();
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
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

// 📧 Nodemailer हटाकर सीधे Gmail API से HTTP के ज़रिए मेल भेजने का फंक्शन
async function sendGmailViaAPI(toEmail, subject, htmlBody) {
  console.log("[GMAIL API] sendGmailViaAPI() call hua. Mail bhejne ki taiyari...");
  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // ईमेल का सही फॉर्मेट (MIME) तैयार करना
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `From: ${process.env.EMAIL_USER}`,
      `To: ${toEmail}`,
      `Content-Type: text/html; charset=utf-8`,
      `MIME-Version: 1.0`,
      `Subject: ${utf8Subject}`,
      ``,
      htmlBody
    ];
    const message = messageParts.join('\n');

    // बेस64 सेफ यूआरएल एनकोडिंग (Gmail API की जरूरत)
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log("[GMAIL API] HTTP Request sent to Google...");
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("[GMAIL API SUCCESS] Mail sent successfully! ID:", res.data.id);
    return res.data;
  } catch (error) {
    console.error("[GMAIL API CRITICAL ERROR] API se mail nahi gayi:", error.message);
    throw error;
  }
}

// 🎯 1. साइनअप के लिए OTP भेजना
router.post('/send-signup-otp', async (req, res) => {
  const { email } = req.body;
  console.log(`\n--- [ROUTE START] /send-signup-otp for ${email} ---`);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: "ईमेल पहले से रजिस्टर्ड है।" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpCache.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

    const subject = 'EWPP Portal - ईमेल वेरिफिकेशन OTP';
    const htmlBody = `<h3>EWPP ट्रेनिंग पोर्टल में आपका स्वागत है</h3>
                      <p>साइनअप पूरा करने के लिए आपका OTP नीचे दिया गया है:</p>
                      <h2 style="color: #0284c7; letter-spacing: 2px;">${otp}</h2>`;

    // 🚀 Nodemailer की जगह नया API फंक्शन कॉल
    await sendGmailViaAPI(email, subject, htmlBody);
    
    res.status(200).json({ success: true, message: 'OTP ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'ईमेल भेजने में सर्वर एरर: ' + error.message });
  }
});

// 🎯 2. Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(`\n--- [ROUTE START] /forgot-password for ${email} ---`);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'यह ईमेल हमारे रिकॉर्ड में नहीं है।' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; 
    await user.save();

    // 🎯 2. Forgot Password (backend/routes/authUtils.js के अंदर ढूंढें)
// पुरानी resetUrl लाइन को हटाकर इसे लिखें:
    const resetUrl = `https://training-ewpp-frontend.onrender.com/?resetToken=${resetToken}`;
    const subject = 'EWPP Portal - पासवर्ड रीसेट रिक्वेस्ट';
    const htmlBody = `<p>आपने पासवर्ड रीसेट करने का अनुरोध किया है। नीचे दिए गए लिंक पर क्लिक करके अपना पासवर्ड बदलें:</p>
                      <a href="${resetUrl}" style="background:#0284c7; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px; display:inline-block;">पासवर्ड रीसेट करें</a>`;

    // 🚀 Nodemailer की जगह नया API फंक्शन कॉल
    await sendGmailViaAPI(email, subject, htmlBody);

    res.status(200).json({ success: true, message: 'पासवर्ड रीसेट लिंक आपकी ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'सर्वर एरर: ' + error.message });
  }
});

// 🎯 3. Signup OTP verify karna
router.post('/verify-signup-otp', (req, res) => {
  const { email, otp } = req.body;
  const data = otpCache.get(email);
  if (!data) return res.status(400).json({ success: false, message: 'OTP एक्सपायर हो गया है।' });
  if (data.otp !== otp) return res.status(400).json({ success: false, message: 'गलत OTP, कृपया दोबारा जांचें।' });
  otpCache.delete(email);
  res.status(200).json({ success: true, message: 'ईमेल सफलतापूर्वक वेरीफाई हो गई।' });
});

// 🎯 4. Reset Password Action
// 🎯 4. Reset Password Action (backend/routes/authUtils.js के सबसे नीचे)
const bcrypt = require('bcryptjs'); // या require('bcrypt'); जो भी आपके प्रोजेक्ट में पहले से इंस्टॉल हो

router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  console.log("[RESET ACTION] Naya password update karne ki request aayi hai...");
  
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log("[RESET ACTION FAIL] Token invalid ya expire ho chuka hai.");
      return res.status(400).json({ success: false, message: 'टोकन अमान्य है या एक्सपायर हो चुका है।' });
    }

    // 🚀 गड़बड़ यहीं थी! पासवर्ड को डेटाबेस में सेव करने से पहले हैश करना ज़रूरी है
    console.log("[RESET ACTION] Passwords ko encrypt/hash kiya ja raha hai...");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); 
    
    // टोकन का काम खत्म, इन्हें हटा दें
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    console.log("[RESET ACTION SUCCESS] DB me encrypted password successfully save ho gaya!");

    res.status(200).json({ success: true, message: 'पासवर्ड सफलतापूर्वक बदल गया है!' });
  } catch (error) {
    console.error("[RESET ACTION ERROR] Password badalne me error:", error.message);
    res.status(500).json({ success: false, message: 'पासवर्ड बदलने में एरर।' });
  }
});
// 🎯 5. लाइव पेमेंट स्टेटस/प्रोफाइल चेक करने का राउट (authUtils.js के अंदर सबसे नीचे module.exports से पहले जोड़ें)
router.post('/get-profile', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'यूजर नहीं मिला' });
    }
    // पूरा यूजर ऑब्जेक्ट भेजें जिसमें ताज़ा isPaid: true हो
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
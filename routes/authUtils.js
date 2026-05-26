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
console.log("[INIT] Google OAuth2 Client initialize ho raha hai...");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});
console.log("[INIT] OAuth2 Client credentials set kar diye gaye hain.");

// Dynamic Transporter with heavy logging
async function createTransporter() {
  console.log("[OAUTH2] createTransporter() function call hua.");
  try {
    console.log("[OAUTH2] Google se naya Access Token maanga ja raha hai...");
    
    // 💡 यहाँ टाइमआउट हैंडलर लगा रहे हैं ताकि अगर गूगल रिस्पॉन्ड न करे तो कोड अनंत काल तक न अटका रहे
    const accessToken = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Google OAuth API ne token dene me bohot time lagaya (Timeout)")), 8000);
      
      oauth2Client.getAccessToken((err, token) => {
        clearTimeout(timeout);
        if (err) {
          console.error("[OAUTH2 ERROR] Google se token lene me gaddbadd:", err);
          reject(err);
        }
        resolve(token);
      });
    });

    console.log("[OAUTH2 SUCCESS] Fresh Access Token mil gaya hai!");

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
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("[OAUTH2] Nodemailer Transporter object successfully taiyar.");
    return transporter;
  } catch (error) {
    console.error("[CRITICAL OAUTH2 ERROR] Transporter creation fail hua:", error.message);
    throw error;
  }
}

// 🎯 1. साइनअप के लिए OTP भेजना
router.post('/send-signup-otp', async (req, res) => {
  const { email } = req.body;
  console.log(`\n--- [ROUTE START] /send-signup-otp for Email: ${email} ---`);
  try {
    console.log("[STEP 1] Database me check kar rahe hain ki user pehle se hai ya nahi...");
    const userExists = await User.findOne({ email });
    console.log("[STEP 1 SUCCESS] Database check complete. User exists?", !!userExists);
    
    if (userExists) {
      return res.status(400).json({ success: false, message: "ईमेल पहले से रजिस्टर्ड है।" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpCache.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });
    console.log(`[STEP 2] Cache me OTP save kiya: ${otp}`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EWPP Portal - ईमेल वेरिफिकेशन OTP',
      html: `<h3>EWPP ट्रेनिंग पोर्टल में आपका स्वागत है</h3>
             <p>साइनअप पूरा करने के लिए आपका OTP नीचे दिया गया है:</p>
             <h2 style="color: #0284c7; letter-spacing: 2px;">${otp}</h2>`
    };

    console.log("[STEP 3] createTransporter() ko call kar rahe hain...");
    const sendEmailTransporter = await createTransporter();
    
    console.log("[STEP 4] sendMail() trigger kar rahe hain. Mail ja rahi hai...");
    await sendEmailTransporter.sendMail(mailOptions);
    console.log("[STEP 4 SUCCESS] Mail successfully sent without timeout!");
    
    res.status(200).json({ success: true, message: 'OTP ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    console.error("[ROUTE ERROR] /send-signup-otp me gaddbadd aayi:", error.message);
    res.status(500).json({ success: false, message: 'ईमेल भेजने में सर्वर एरर: ' + error.message });
  } finally {
    console.log(`--- [ROUTE END] /send-signup-otp process khatam ---\n`);
  }
});

// 🎯 2. Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(`\n--- [ROUTE START] /forgot-password for Email: ${email} ---`);
  try {
    console.log("[STEP 1] Database me user search kar rahe hain...");
    const user = await User.findOne({ email });
    console.log("[STEP 1 SUCCESS] User search complete. User found?", !!user);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'यह ईमेल हमारे रिकॉर्ड में नहीं है।' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; 
    
    console.log("[STEP 2] Database me token save karne ja rahe hain...");
    await user.save();
    console.log("[STEP 2 SUCCESS] Token DB me successfully save ho gaya.");

    const resetUrl = `https://training-ewpp-frontend.onrender.com/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EWPP Portal - पासवर्ड रीसेट रिक्वेस्ट',
      html: `<p>आपने पासवर्ड रीसेट करने का अनुरोध किया है। नीचे दिए गए लिंक पर क्लिक करके अपना पासवर्ड बदलें:</p>
             <a href="${resetUrl}" style="background:#0284c7; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px; display:inline-block;">पासवर्ड रीसेट करें</a>`
    };

    console.log("[STEP 3] createTransporter() ko call kar rahe hain...");
    const sendEmailTransporter = await createTransporter();
    
    console.log("[STEP 4] sendMail() trigger kar rahe hain. Reset link ja raha hai...");
    await sendEmailTransporter.sendMail(mailOptions);
    console.log("[STEP 4 SUCCESS] Reset Mail successfully sent!");

    res.status(200).json({ success: true, message: 'पासवर्ड रीसेट लिंक आपकी ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    console.error("[ROUTE ERROR] /forgot-password me gaddbadd aayi:", error.message);
    res.status(500).json({ success: false, message: 'सर्वर एरर: ' + error.message });
  } finally {
    console.log(`--- [ROUTE END] /forgot-password process khatam ---\n`);
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
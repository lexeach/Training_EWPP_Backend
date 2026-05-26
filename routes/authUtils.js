// backend/routes/authUtils.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // या जो भी आप पासवर्ड हैश करने के लिए यूज़ कर रहे हैं

const User = mongoose.model('User');

// अस्थायी रूप से OTP स्टोर करने के लिए (लाइव ऐप में इसे डेटाबेस या रेडिस में रखना चाहिए, पर डायरेक्ट रेंडर के लिए यह तुरंत काम करेगा)
const otpCache = new Map();

// Nodemailer ट्रांसपोर्टर सेटअप (यह Render के Environment Variables से ईमेल उठाएगा)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // यह आपका Gmail का App Password होगा
  }
});

// 🎯 1. साइनअप के लिए OTP भेजना
router.post('/send-signup-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: "ईमेल पहले से रजिस्टर्ड है।" });

    // 6 डिजिट का OTP जनरेट करें
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 10 मिनट के लिए कैशे में सेव करें
    otpCache.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EWPP Portal - ईमेल वेरिफिकेशन OTP',
      html: `<h3>EWPP ट्रेनिंग पोर्टल में आपका स्वागत है</h3>
             <p>साइनअप पूरा करने के लिए आपका OTP नीचे दिया गया है। यह 10 मिनट के लिए वैध है:</p>
             <h2 style="color: #0284c7; letter-spacing: 2px;">${otp}</h2>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'OTP ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'ईमेल भेजने में सर्वर एरर।' });
  }
});

// 🎯 2. साइनअप OTP वेरीफाई करना
router.post('/verify-signup-otp', (req, res) => {
  const { email, otp } = req.body;
  const data = otpCache.get(email);

  if (!data) return res.status(400).json({ success: false, message: 'OTP एक्सपायर हो गया है या भेजा नहीं गया।' });
  if (data.expires < Date.now()) {
    otpCache.delete(email);
    return res.status(400).json({ success: false, message: 'OTP की समय सीमा समाप्त हो गई है।' });
  }
  if (data.otp !== otp) return res.status(400).json({ success: false, message: 'गलत OTP, कृपया दोबारा जांचें।' });

  otpCache.delete(email); // वेरिफिकेशन के बाद डिलीट करें
  res.status(200).json({ success: true, message: 'ईमेल सफलतापूर्वक वेरीफाई हो गई।' });
});

// 🎯 3. Forgot Password - रीसेट लिंक या OTP भेजना
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'यह ईमेल हमारे रिकॉर्ड में नहीं है।' });

    // रीसेट टोकन जनरेट करें
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 मिनट वैलिड
    await user.save();

    const resetUrl = `https://training-ewpp-frontend.onrender.com/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EWPP Portal - पासवर्ड रीसेट रिक्वेस्ट',
      html: `<p>आपने पासवर्ड रीसेट करने का अनुरोध किया है। नीचे दिए गए लिंक पर क्लिक करके अपना पासवर्ड बदलें:</p>
             <a href="${resetUrl}" style="background:#0284c7; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px; display:inline-block;">पासवर्ड रीसेट करें</a>
             <p>अगर आपने यह अनुरोध नहीं किया है, तो इस ईमेल को अनदेखा करें।</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'पासवर्ड रीसेट लिंक आपकी ईमेल पर भेज दिया गया है।' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'सर्वर एरर।' });
  }
});

// 🎯 4. Reset Password - नया पासवर्ड सेट करना
router.post('/reset-password/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ success: false, message: 'टोकन अमान्य है या एक्सपायर हो चुका है।' });

    // नया पासवर्ड हैश करें (अगर आपका मॉडल ऑटो-हैश नहीं करता है)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'पासवर्ड सफलतापूर्वक बदल गया है! अब आप लॉगिन कर सकते हैं।' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'पासवर्ड रीसेट करने में एरर।' });
  }
});

module.exports = router;
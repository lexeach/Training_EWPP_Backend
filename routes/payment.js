const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const User = mongoose.model('User'); 

// 🟢 OAuth2 सेटअप (ईमेल भेजने के लिए)
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Welcome to EWPP Training Portal! 🎉",
      html: `<h2>Welcome, ${userName}!</h2><p>Your payment is successful and your account is now active.</p>`
    });
  } catch (err) {
    console.error("Email error:", err);
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get('/key', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

router.post('/order', async (req, res) => {
  const { amount, userId } = req.body;
  try {
    const options = { amount: amount * 100, currency: "INR", receipt: `rcpt_${Date.now()}`, notes: { userId: userId.toString() } };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;
  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");

    if (expectedSign === razorpay_signature) {
      let finalUserId = userId || (await razorpay.orders.fetch(razorpay_order_id))?.notes?.userId;
      const updatedUser = await User.findByIdAndUpdate(finalUserId, { isPaid: true }, { new: true });
      
      // 🟢 वेलकम ईमेल ट्रिगर
      if (updatedUser) sendWelcomeEmail(updatedUser.email, updatedUser.name);

      return res.status(200).json({ success: true, message: "Paid Successfully", user: updatedUser });
    }
    return res.status(400).json({ success: false, message: "Invalid Signature" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification Server Error" });
  }
});

module.exports = router;

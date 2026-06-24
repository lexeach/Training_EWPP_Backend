// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const User = mongoose.model('User'); 

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🟢 OAuth2 ईमेल क्लाइंट सेटअप
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

// 📧 ईमेल भेजने का फंक्शन
const sendEmail = async (to, subject, html) => {
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
  return transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};

router.get('/key', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

router.post('/order', async (req, res) => {
  const { amount, userId } = req.body;
  try {
    if (!userId) return res.status(400).json({ message: "userId is required" });
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `rcpt_${Date.now()}`, 
      notes: { userId: userId.toString() }
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error during order generation" });
  }
});

// 🎯 पेमेंट वेरीफाई और वेलकम ईमेल एंडपॉइंट
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;
  
  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      let finalUserId = userId || (await razorpay.orders.fetch(razorpay_order_id))?.notes?.userId;

      const updatedUser = await User.findByIdAndUpdate(
        finalUserId,
        { isPaid: true },
        { new: true }
      );
      
      if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

      // 🟢 पेमेंट के बाद वेलकम ईमेल भेजें
      // पेमेंट वेरिफिकेशन के अंदर का हिस्सा ऐसे अपडेट करें:
try {
  const welcomeHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0284c7;">Welcome aboard, ${updatedUser.name}!</h2>
      <p>Your payment has been successfully received, and your training access is now <b>activated</b>.</p>
      <p>You can now log in to your dashboard to start learning.</p>
      <br>
      <p>Happy Learning!<br><b>The EWPP Team</b></p>
    </div>
  `;
  
  // 🟢 यहाँ 'sendEmail' का इस्तेमाल करें जो आपने OAuth2 के साथ बनाया है
  await sendEmail(updatedUser.email, 'Welcome to EWPP Training Portal! 🎉', welcomeHtml);
  
  console.log(`[SUCCESS] Welcome email sent via OAuth2 to ${updatedUser.email}`);
} catch (emailErr) {
  console.error("Welcome email failed:", emailErr);
}

      return res.status(200).json({ success: true, message: "Paid Successfully", user: updatedUser });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Verification Server Error" });
  }
});

module.exports = router;

// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');

// पाथ एरर से बचने के लिए सीधे mongoose से रजिस्टर्ड 'User' MD Model को उठाना
const User = mongoose.model('User'); 

// Razorpay इनिशियलाइज करें (Render के Environment Variables से कीज उठाएगा)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🎯 1. ऑर्डर क्रिएट करने का एंडपॉइंट
router.post('/order', async (req, res) => {
  const { amount, userId } = req.body;
  try {
    const options = {
      amount: amount * 100, // ₹999 को पैसे में बदलने के लिए
      currency: "INR",
      // 💡 फिक्स: रसीद की लंबाई 40 कैरेक्टर से कम रखने के लिए इसे छोटा किया गया है
      receipt: `rcpt_${Date.now()}`, 
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).json({ message: "Order creation failed" });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error during order generation" });
  }
});

// 🎯 2. पेमेंट वेरीफाई करने का एंडपॉइंट
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;
  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // डेटाबेस में यूजर को 'isPaid: true' मार्क करें
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isPaid: true },
        { new: true }
      );
      return res.status(200).json({ success: true, user: updatedUser });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Verification Server Error" });
  }
});

module.exports = router;
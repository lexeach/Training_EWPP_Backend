// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');

// सीधे मोंगूज से रजिस्टर्ड मॉडल को उठाना
const User = mongoose.model('User'); 

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🎯 फ्रंटएंड को Key ID देने के लिए एंडपॉइंट (ताकि फ्रंटएंड में गलत की डलने का चांस खत्म हो जाए)
router.get('/key', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

// 🎯 1. ऑर्डर क्रिएट करने का एंडपॉइंट
router.post('/order', async (req, res) => {
  const { amount, userId } = req.body;
  try {
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `rcpt_${Date.now()}`, 
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).json({ message: "Order creation failed" });

    res.status(200).json(order);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Server Error during order generation" });
  }
});

// 🎯 2. पेमेंट वेरीफाई करने का एंडपॉइंट
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;
  try {
    // सिग्नेचर वेरीफाई करना
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // 💡 अपडेट: बिना रिलेटिव पाथ की एरर के सीधे डेटाबेस में यूजर को अपडेट करना
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isPaid: true },
        { new: true }
      );
      
      return res.status(200).json({ success: true, message: "Paid Successfully", user: updatedUser });
    } else {
      console.log("Signature Mismatch!");
      return res.status(400).json({ success: false, message: "Invalid Signature Match" });
    }
  } catch (error) {
    console.error("Verification Catch Error:", error);
    res.status(500).json({ success: false, message: "Verification Server Error" });
  }
});

module.exports = router;
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

// फ्रंटएंड को Key ID देने के लिए एंडपॉइंट
router.get('/key', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

// 🎯 1. ऑर्डर क्रिएट करने का एंडपॉइंट
router.post('/order', async (req, res) => {
  const { amount, userId } = req.body;
  console.log("=========================================");
  console.log("[BACKEND LOG] /order हिट हुआ। Received userId:", userId, "Amount:", amount);
  console.log("=========================================");
  
  try {
    if (!userId) {
      console.error("[BACKEND ERROR] /order में userId गायब है!");
      return res.status(400).json({ message: "userId is required to create an order" });
    }

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `rcpt_${Date.now()}`, 
      notes: {
        userId: userId.toString()
      }
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      console.error("[BACKEND ERROR] Razorpay order object नहीं बन पाया");
      return res.status(500).json({ message: "Order creation failed" });
    }

    console.log("[BACKEND LOG] Razorpay Order सफलतापूर्वक बना:", order.id);
    res.status(200).json(order);
  } catch (error) {
    console.error("[BACKEND CATCH ERROR] Order Generation Exception:", error);
    res.status(500).json({ message: "Server Error during order generation" });
  }
});

// 🎯 2. पेमेंट वेरीफाई करने का एंडपॉइंट (TRACKING LOGS ENABLED)
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;
  
  console.log("=== 📥 BACKEND VERIFY STEP 1: REQUEST RECEIVED ===");
  console.log("razorpay_order_id:", razorpay_order_id);
  console.log("razorpay_payment_id:", razorpay_payment_id);
  console.log("Frontend se aaya userId:", userId);
  console.log("=================================================");

  try {
    // सिग्नेचर वेरीफाई करना
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      console.log("=== ✅ BACKEND VERIFY STEP 2: SIGNATURE MATCHED ===");
      
      let finalUserId = userId;
      
      // बैकअप: अगर फ्रंटएंड से userId नहीं आया, तो रेजरपे नोट्स से निकालो
      if (!finalUserId) {
        console.log("[BACKEND LOG] req.body में userId नहीं मिला, Razorpay से ऑर्डर फेच कर रहे हैं...");
        const orderDetails = await razorpay.orders.fetch(razorpay_order_id);
        finalUserId = orderDetails?.notes?.userId;
        console.log("[BACKEND LOG] Razorpay notes से निकाला गया finalUserId:", finalUserId);
      }

      if (!finalUserId) {
        console.error("[BACKEND ERROR] ❌ किसी भी तरीके से userId नहीं मिल पाया!");
        return res.status(400).json({ success: false, message: "User Identification Failed" });
      }

      console.log(`=== 🗄️ BACKEND VERIFY STEP 3: DB UPDATE START ===`);
      console.log(`Targeting Database Document with _id: "${finalUserId}"`);

      // 💡 यहाँ सबसे कड़क लॉगिंग है: पुराना डेटा क्या था और नया क्या हुआ
      const oldUserDoc = await User.findById(finalUserId);
      console.log("[DB QUERY] अपडेट से ठीक पहले पुराना isPaid स्टेटस:", oldUserDoc ? oldUserDoc.isPaid : "User Not Found");

      // अब अपडेट मारते हैं
      const updatedUser = await User.findByIdAndUpdate(
        finalUserId,
        { isPaid: true },
        { new: true } // true देने से यह मोंगोडीबी का लेटेस्ट अपडेटेड डॉक्यूमेंट लौटाता है
      );
      
      if (!updatedUser) {
        console.error(`[BACKEND ERROR] ❌ User ID: ${finalUserId} डेटाबेस में अपडेट नहीं हो सका (शायद ID गलत है)!`);
        return res.status(404).json({ success: false, message: "User not found in database" });
      }

      console.log(`=== 🎉 BACKEND VERIFY STEP 4: DB UPDATE SUCCESS ===`);
      console.log("डेटाबेस से लौटकर आया ताज़ा 'updatedUser' ऑब्जेक्ट:");
      console.log("ID:", updatedUser._id);
      console.log("Email:", updatedUser.email);
      console.log("Actual isPaid state in DB now:", updatedUser.isPaid);
      console.log("=================================================");

      return res.status(200).json({ 
        success: true, 
        message: "Paid Successfully", 
        user: updatedUser 
      });
      
    } else {
      console.error("=== ❌ BACKEND VERIFY ERROR: SIGNATURE MISMATCH ===");
      return res.status(400).json({ success: false, message: "Invalid Signature Match" });
    }
  } catch (error) {
    console.error("=== 💥 BACKEND VERIFY CATCH EXCEPTION ===");
    console.error(error);
    res.status(500).json({ success: false, message: "Verification Server Error" });
  }
});

module.exports = router;

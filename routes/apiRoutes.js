// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//const { User } = require('../models/Schemas');
const { registerUser, loginUser, manualApproveUser, getAllUsers } = require('../controllers/authController');
// 🎯controllers से इम्पोर्ट्स
const { getModules, updateProgress, submitQuiz } = require('../controllers/trainingController');
const { User, Module } = require('../models/Schemas');

// --- AUTH MIDDLEWARE (टोकन वेरीफाई करने के लिए) ---
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'ऑथराइजेशन फेल, टोकन गलत है।' });
    }
  }
  if (!token) return res.status(401).json({ message: 'कोई टोकन नहीं मिला, एक्सेस डिनाइड।' });
};

// --- ROUTES ---

// [FREEMIUM LOGIC] वीडियो एक्सेस चेक करने का रूट

router.get('/video-access/:videoId', protect, async (req, res) => {
  const { videoId } = req.params;
  const user = req.user; // protect मिडलवेयर से मिला

  // अगर पेड है, तो सब एक्सेस दें
  if (user.isPaid) return res.json({ access: true });

  // अगर पेड नहीं है, तो चेक करें कि क्या यह शुरुआती 5 फ्री वीडियो में से है
  // आप अपने डेटाबेस के हिसाब से IDs यहाँ रखें
  const freeVideoIds = ["v1", "v2", "v3", "v4", "v5"]; 
  
  if (freeVideoIds.includes(videoId)) {
    return res.json({ access: true });
  }

  res.status(403).json({ access: false, message: "कृपया पूरा कोर्स एक्सेस करने के लिए पेमेंट करें।" });
});

// 🔐 Auth & Admin Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/admin/approve', manualApproveUser);
router.post('/admin/users', getAllUsers);

// 📚 Training Content Routes
router.get('/modules', protect, getModules); 

// 📈 Progress Update Routes (स्मार्ट सिंक: दोनों राउट्स को सपोर्ट करेगा)
router.post('/update-progress', protect, updateProgress); // ✨ फ्रंटएंड का नया राउट
router.post('/progress/update', protect, updateProgress); // 🔄 पुराना बैकअप राउट ताकि कहीं भी 404 न आए

// 🎯 Quiz / Assessment Submission Routes (404 एरर को हमेशा के लिए खत्म करने के लिए 🚀)
router.post('/submit-quiz', protect, submitQuiz); // ✨ फ्रंटएंड का मुख्य राउट फिक्स
router.post('/quiz/submit', protect, submitQuiz); // 🔄 पुराना बैकअप राउट

// 🔄 [मास्टर फिक्स] करंट लॉगिन यूज़र का डेटाबेस रिकॉर्ड लाइव फेच करने का रूट (हार्ड रिफ्रेश के लिए)
router.get('/auth/me', protect, async (req, res) => {
  try {
    const freshUser = await User.findById(req.user.id).select('-password');
    if (!freshUser) {
      return res.status(404).json({ success: false, message: 'यूज़र नहीं मिला' });
    }
    res.json({ success: true, user: freshUser });
  } catch (error) {
    console.error("Error in /auth/me API:", error);
    res.status(500).json({ success: false, message: 'सर्वर एरर' });
  }
});

module.exports = router;

// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/Schemas');
const { registerUser, loginUser, manualApproveUser, getAllUsers } = require('../controllers/authController');
// 🎯controllers से इम्पोर्ट्स
const { getModules, updateProgress, submitQuiz } = require('../controllers/trainingController');

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

module.exports = router;

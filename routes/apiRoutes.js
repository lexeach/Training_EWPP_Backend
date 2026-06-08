// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/Schemas');
const { registerUser, loginUser, manualApproveUser, getAllUsers } = require('../controllers/authController');
// 🎯 फिक्स: controllers से submitQuiz को भी इम्पोर्ट किया
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

// 📚 Training Content & Assessment Routes
router.get('/modules', protect, getModules); // 🔒 सुरक्षा सुधार: इसे भी प्रोटेक्टेड कर दिया ताकि बिना लॉगिन कोई डेटा न देख पाए
router.post('/progress/update', protect, updateProgress); // प्रोग्रेस अपडेट करने के लिए

// 🎯 नया रूट: वीडियो का ऑनलाइन असेसमेंट (टेस्ट) सबमिट करने के लिए
router.post('/quiz/submit', protect, submitQuiz);

module.exports = router;

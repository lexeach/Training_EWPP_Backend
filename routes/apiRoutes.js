// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/Schemas');
const { registerUser, loginUser, manualApproveUser } = require('../controllers/authController');
const { getModules, updateProgress } = require('../controllers/trainingController');

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
      res.status(401).json({ message: 'ऑथराइजेशन फेल, टोकन गलत है।' });
    }
  }
  if (!token) return res.status(401).json({ message: 'कोई टोकन नहीं मिला, एक्सेस डिनाइड।' });
};

// --- ROUTES ---

// Auth Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/admin/approve', manualApproveUser);

// Training Content Routes
router.get('/modules', getModules); // सभी मॉड्यूल्स देखने के लिए
router.post('/progress/update', protect, updateProgress); // प्रोग्रेस अपडेट करने के लिए (प्रोटेक्टेड)

module.exports = router;
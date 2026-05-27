// backend/controllers/authController.js
const { User } = require('../models/Schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. नए चैनल पार्टनर का रजिस्ट्रेशन (Admin के लिए या डायरेक्ट साइनअप)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'यह ईमेल पहले से रजिस्टर्ड है।' });

    // पासवर्ड को सिक्योर (Hash) करना
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // नया यूजर बनाते समय स्कीमा के अनुसार default isPaid: false अपने आप सेट हो जाएगा
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'चैनल पार्टनर का अकाउंट बन गया है।' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. लॉगिन कंट्रोलर
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // JWT Token जनरेट करना
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // 💡 मास्टर फिक्स: रिस्पॉन्स में 'isPaid' को जोड़ दिया गया है 
      // ताकि लॉगिन करते ही फ्रंटएंड को डेटाबेस का लाइव स्टेटस (true/false) मिल सके
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isPaid: user.isPaid || false, // डेटाबेस से लाइव वैल्यू भेजेगा
        completedVideos: user.completedVideos,
        currentUnlockedVideo: user.currentUnlockedVideo,
        token
      });
    } else {
      res.status(401).json({ message: 'गलत ईमेल या पासवर्ड।' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
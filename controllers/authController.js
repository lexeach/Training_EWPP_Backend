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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'चैनल पार्टनर का ACCOUNT बन गया है।' });
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isPaid: user.isPaid || false, 
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

// 🎯 3. एडमिन द्वारा ईमेल आईडी से मैनुअल अप्रूवल (NEW FEATURE)
// 🎯 3. एडमिन द्वारा ईमेल आईडी से मैनुअल अप्रूवल (UPDATED WITH SECRET KEY)
const manualApproveUser = async (req, res) => {
  try {
    const { email, secretKey } = req.body;

    // 💡 सुरक्षा जाँच: अगर फ्रंटएंड से आई सीक्रेट की आपके क्रेडेंशियल से मैच नहीं करती
    // आप "myAdminMegaSecret123" की जगह जो चाहें रख सकते हैं या इसे process.env.ADMIN_SECRET से बदल सकते हैं
    const MASTER_SECRET_KEY = "myAdminMegaSecret123"; 

    if (!secretKey || secretKey !== MASTER_SECRET_KEY) {
      return res.status(403).json({ message: '❌ अमान्य एड敏 सीक्रेट की! आप अधिकृत नहीं हैं।' });
    }

    if (!email) {
      return res.status(400).json({ message: 'कृपया ईमेल आईडी प्रदान करें।' });
    }

    const targetEmail = email.trim().toLowerCase();

    const updatedUser = await User.findOneAndUpdate(
      { email: targetEmail },
      { isPaid: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'इस ईमेल आईडी से कोई यूज़र नहीं मिला।' });
    }

    res.status(200).json({
      success: true,
      message: `🎉 यूज़र ${updatedUser.name} (${updatedUser.email}) को सफलतापूर्वक एक्टिवेट कर दिया गया है!`,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isPaid: updatedUser.isPaid
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// manualApproveUser को एक्सपोर्ट में शामिल करना न भूलें
module.exports = { registerUser, loginUser, manualApproveUser };
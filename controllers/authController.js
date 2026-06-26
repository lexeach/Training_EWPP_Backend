// backend/controllers/authController.js
const { User } = require('../models/Schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// मास्टर सीक्रेट की - फ्रंटएंड और बैकएंड दोनों में सेम होनी चाहिए
const MASTER_SECRET_KEY = "myAdminMegaSecret123"; 

// 1. नए चैनल पार्टनर का रजिस्ट्रेशन
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
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

// 🎯 3. एडमिन द्वारा ईमेल आईडी से मैनुअल अप्रूवल (With Activation Date)
const manualApproveUser = async (req, res) => {
  try {
    const { email, secretKey } = req.body;

    if (!secretKey || secretKey !== MASTER_SECRET_KEY) {
      return res.status(403).json({ message: '❌ अमान्य एडमिन सीक्रेट की! आप अधिकृत नहीं हैं।' });
    }

    if (!email) {
      return res.status(400).json({ message: 'कृपया ईमेल आईडी प्रदान करें।' });
    }

    const targetEmail = email.trim().toLowerCase();

    // यूज़र को ढूंढें और 'isPaid: true' के साथ 'activatedAt' में वर्तमान समय दर्ज करें
    const updatedUser = await User.findOneAndUpdate(
      { email: targetEmail },
      { 
        isPaid: true,
        activatedAt: new Date() // 📅 करंट डेट और टाइम सेव होगा
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'इस ईमेल आईडी से कोई यूज़र नहीं मिला।' });
    }

    console.log(`[ADMIN ACTION] User ${updatedUser.email} को मैनुअली एक्टिवेट कर दिया गया है।`);

    res.status(200).json({
      success: true,
      message: `🎉 यूज़र ${updatedUser.name} (${updatedUser.email}) को सफलतापूर्वक एक्टिवेट कर दिया गया है!`,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isPaid: updatedUser.isPaid,
        activatedAt: updatedUser.activatedAt
      }
    });

  } catch (error) {
    console.error("[ADMIN APPROVE ERROR]", error);
    res.status(500).json({ message: error.message });
  }
};

// 🎯 4. सभी रजिस्टर्ड यूज़र्स की लिस्ट लाना (With Safety Guard)
const getAllUsers = async (req, res) => {
  try {
    const { secretKey } = req.body;

    if (!secretKey || secretKey !== MASTER_SECRET_KEY) {
      return res.status(403).json({ message: '❌ अमान्य एडमिन सीक्रेट की!' });
    }

    // पासवर्ड छोड़कर बाकी पूरा डेटा निकालेंगे और नए यूज़र्स को सबसे ऊपर दिखाएंगे (sort by createdAt)
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("[ADMIN GET USERS ERROR]", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, manualApproveUser, getAllUsers };

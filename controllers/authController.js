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
    if (userExists) return res.status(400).json({ message: 'Email is already registered.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🟢 यहाँ 'phone' को डेटाबेस में सेव किया जा रहा है
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      phone // सुनिश्चित करें कि आपके User Model में 'phone' फील्ड है
    });

    res.status(201).json({ message: 'Channel partner account created successfully.' });
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
        phone: user.phone, // लॉगिन रिस्पॉन्स में भी फोन भेज दिया है
        isPaid: user.isPaid || false, 
        completedVideos: user.completedVideos,
        currentUnlockedVideo: user.currentUnlockedVideo,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
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
      return res.status(403).json({ message: 'Invalid admin secret key!' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email ID.' });
    }

    const targetEmail = email.trim().toLowerCase();

    // यूज़र को ढूंढें और 'isPaid: true' के साथ 'activatedAt' में वर्तमान समय दर्ज करें
    const updatedUser = await User.findOneAndUpdate(
      { email: targetEmail },
      { 
        isPaid: true,
        activatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this email ID.' });
    }

    console.log(`[ADMIN ACTION] User ${updatedUser.email} has been manually activated.`);

    res.status(200).json({
      success: true,
      message: `User ${updatedUser.name} (${updatedUser.email}) activated successfully!`,
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
      return res.status(403).json({ message: 'Invalid admin secret key!' });
    }

    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("[ADMIN GET USERS ERROR]", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, manualApproveUser, getAllUsers };

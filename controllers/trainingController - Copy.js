// backend/controllers/trainingController.js
const { Module, User } = require('../models/Schemas');

// 1. सभी मॉड्यूल्स और उनके वीडियो की लिस्ट लाना
const getModules = async (req, res) => {
  try {
    const modules = await Module.find().sort({ moduleId: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. वीडियो पूरा होने पर प्रोग्रेस अपडेट करना (Unlock Next Video Logic)
const updateProgress = async (req, res) => {
  try {
    const { videoId } = req.body; // जो वीडियो अभी खत्म हुआ है
    const userId = req.user.id;   // Auth Middleware से यूजर की ID मिलेगी

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'यूजर नहीं मिला' });

    // अगर वीडियो पहले से कम्प्लीटेड लिस्ट में नहीं है, तो ऐड करें
    if (!user.completedVideos.includes(videoId)) {
      user.completedVideos.push(videoId);
    }

    // अब डेटाबेस से सभी मॉड्यूल्स निकालकर अगले वीडियो (Next Video) का पता लगाएंगे
    const allModules = await Module.find().sort({ moduleId: 1 });
    let flatVideos = [];
    allModules.forEach(mod => {
      flatVideos.push(...mod.videos);
    });

    // करंट वीडियो का इंडेक्स ढूंढें
    const currentIndex = flatVideos.findIndex(v => v.videoId === videoId);

    // अगर अगला वीडियो लिस्ट में मौजूद है, तो उसे 'currentUnlockedVideo' बना दें
    if (currentIndex !== -1 && currentIndex + 1 < flatVideos.length) {
      user.currentUnlockedVideo = flatVideos[currentIndex + 1].videoId;
    } else {
      user.currentUnlockedVideo = "COMPLETED_ALL"; // सभी वीडियो खत्म हो चुके हैं
    }

    await user.save();
    
    res.json({
      message: "प्रोग्रेस अपडेट हो गई है।",
      completedVideos: user.completedVideos,
      currentUnlockedVideo: user.currentUnlockedVideo
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getModules, updateProgress };
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

// 2. वीडियो पूरा होने पर प्रोग्रेस अपडेट करना (Unlock Next Video Logic - FIXED)
const updateProgress = async (req, res) => {
  try {
    const { videoId } = req.body; // जो वीडियो अभी खत्म हुआ है (उदा: "m1-v3")
    const userId = req.user.id;   // Auth Middleware से यूजर की ID मिलेगी

    console.log("=========================================");
    console.log(`[PROGRESS LOG] /update-progress हिट हुआ। UserID: ${userId}, Completed VideoId: ${videoId}`);
    console.log("=========================================");

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'यूजर नहीं मिला' });

    // अगर वीडियो पहले से कम्पलीटेड लिस्ट में नहीं है, तो ऐड करें
    if (!user.completedVideos.includes(videoId)) {
      user.completedVideos.push(videoId);
    }

    // 1. डेटाबेस से सभी मॉड्यूल्स को moduleId के क्रम में निकालें
    const allModules = await Module.find().sort({ moduleId: 1 });
    
    // 2. 💡 मास्टर फिक्स: सभी वीडियोस को उनके sequenceOrder के अनुसार बिल्कुल सटीक सॉर्ट करके फ्लैट लिस्ट बनाना
    let flatVideos = [];
    allModules.forEach(mod => {
      // हर मॉड्यूल के अंदर की वीडियोस को पहले sequenceOrder (1, 2, 3...) के हिसाब से सॉर्ट करें
      const sortedVideosInModule = mod.videos.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
      // उसके बाद ही मास्टर लिस्ट में जोड़ें
      flatVideos.push(...sortedVideosInModule);
    });

    // 3. फ्लैट लिस्ट में वर्तमान वीडियो का इंडेक्स (Index) ढूंढें
    const currentIndex = flatVideos.findIndex(v => v.videoId === videoId);
    console.log(`[PROGRESS LOG] मास्टर वीडियो लिस्ट में करंट वीडियो का इंडेक्स: ${currentIndex} (Total Videos: ${flatVideos.length})`);

    // 4. अगर अगला वीडियो लिस्ट में मौजूद है, तो उसे 'currentUnlockedVideo' बना दें
    if (currentIndex !== -1 && currentIndex + 1 < flatVideos.length) {
      const nextVideoObj = flatVideos[currentIndex + 1];
      user.currentUnlockedVideo = nextVideoObj.videoId;
      console.log(`[PROGRESS LOG] ✅ सफलता! अगली वीडियो अनलॉक की गई: "${user.currentUnlockedVideo}"`);
    } else {
      user.currentUnlockedVideo = "COMPLETED_ALL"; // सभी मॉड्यूल्स के सभी वीडियो खत्म हो चुके हैं
      console.log(`[PROGRESS LOG] 🎉 बधाई हो! यूजर ने सारे मॉड्यूल्स समाप्त कर लिए हैं।`);
    }

    // 5. डेटाबेस में प्रोग्रेस सुरक्षित सेव करना
    await user.save();
    console.log(`[PROGRESS LOG] डेटाबेस में यूजर का नया currentUnlockedVideo सफलता से सेव हुआ: "${user.currentUnlockedVideo}"`);
    console.log("=========================================");
    
    res.json({
      message: "प्रोग्रेस अपडेट हो गई है।",
      completedVideos: user.completedVideos,
      currentUnlockedVideo: user.currentUnlockedVideo
    });

  } catch (error) {
    console.error("[PROGRESS CATCH ERROR]", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getModules, updateProgress };
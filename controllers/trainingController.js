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

// 2. वीडियो पूरा होने पर प्रोग्रेस अपडेट करना (Unlock Next Video Logic - 3-Tier FIXXED)
const updateProgress = async (req, res) => {
  try {
    const { videoId } = req.body; // जो वीडियो अभी खत्म हुआ है (उदा: "m1s1-v1")
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
    
    // 2.  मास्टर फिक्स: 3-Tier स्ट्रक्चर (Module -> subModules -> videos) से डेटा फ्लैट करना
    let flatVideos = [];
    allModules.forEach(mod => {
      if (mod.subModules && Array.isArray(mod.subModules) && mod.subModules.length > 0) {
        // सब-मॉड्यूल्स को भी उनके subModuleId के हिसाब से सॉर्ट कर लें (सुरक्षा के लिए)
        mod.subModules.sort((a, b) => a.subModuleId - b.subModuleId);
        
        mod.subModules.forEach(subMod => {
          if (subMod.videos && Array.isArray(subMod.videos)) {
            // सब-मॉड्यूल के अंदर के वीडियोस को sequenceOrder के हिसाब से सॉर्ट करना
            const sortedVids = subMod.videos.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
            flatVideos.push(...sortedVids);
          }
        });
      } else if (mod.videos && Array.isArray(mod.videos)) {
        // फॉलबैक: अगर किसी मॉड्यूल में डायरेक्ट वीडियो हो
        const sortedVids = mod.videos.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
        flatVideos.push(...sortedVids);
      }
    });

    // पूरी मास्टर लिस्ट को एक बार और ग्लोबल लेवल पर sequenceOrder के हिसाब से री-सॉर्ट करें ताकि क्रम न टूटे
    flatVideos.sort((a, b) => a.sequenceOrder - b.sequenceOrder);

    // 3. फ्लैट लिस्ट में वर्तमान वीडियो का इंडेक्स (Index) ढूंढें
    const currentIndex = flatVideos.findIndex(v => v.videoId === videoId);
    console.log(`[PROGRESS LOG] मास्टर वीडियो लिस्ट में करंट वीडियो का इंडेक्स: ${currentIndex} (Total Videos: ${flatVideos.length})`);

    // 4. अगर अगला वीडियो लिस्ट में मौजूद है, तो उसे 'currentUnlockedVideo' बना दें
    if (currentIndex !== -1 && currentIndex + 1 < flatVideos.length) {
      const nextVideoObj = flatVideos[currentIndex + 1];
      
      // प्रोग्रेस को पीछे ओवरराइड होने से बचाने का सेफगार्ड लॉजिक
      const currentUnlockedIndex = flatVideos.findIndex(v => v.videoId === user.currentUnlockedVideo);
      if (currentIndex >= currentUnlockedIndex - 1) {
        user.currentUnlockedVideo = nextVideoObj.videoId;
        console.log(`[PROGRESS LOG] ✅ सफलता! अगली वीडियो अनलॉक की गई: "${user.currentUnlockedVideo}"`);
      } else {
        console.log(`[PROGRESS LOG] ℹ️ यूजर पुराना वीडियो देख रहा था, अनलॉक प्रोग्रेस यथावत रही: "${user.currentUnlockedVideo}"`);
      }
    } else {
      user.currentUnlockedVideo = "COMPLETED_ALL"; // सभी मॉड्यूल्स के सभी वीडियो खत्म हो चुके हैं
      console.log(`[PROGRESS LOG] 🎉 बधाई हो! यूजर ने सारे मॉड्यूल्स समाप्त कर लिए हैं।`);
    }

    // 5. डेटाबेस में प्रोग्रेस सुरक्षित सेव करना
    await user.save();
    console.log(`[PROGRESS LOG] मोंगोडीबी में नया currentUnlockedVideo सफलता से सेव हुआ: "${user.currentUnlockedVideo}"`);
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

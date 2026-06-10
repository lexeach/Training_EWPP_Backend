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
    
    // 2.  マスター फिक्स: 3-Tier स्ट्रक्चर (Module -> subModules -> videos) से डेटा फ्लैट करना
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

    // पूरी मास्टर लिस्ट को एक बार और ग्लोबल LEVEL पर sequenceOrder के हिसाब से री-सॉर्ट करें ताकि क्रम न टूटे
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

    // 🌟 Mongoose को बताएं कि Arrays और Strings में बदलाव हुए हैं ताकि वो MongoDB में सेव होना मिस न करे
    user.markModified('completedVideos');
    user.markModified('currentUnlockedVideo');

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

// 3. क्विज़ सबमिट करने और रिजल्ट जांचने का लॉजिक
const submitQuiz = async (req, res) => {
  try {
    const { videoId, answers } = req.body; // answers = [0, 2, 1, 3] (यूजर के चुने विकल्प)
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'यूजर नहीं मिला' });

    // डेटाबेस से वर्तमान वीडियो का क्विज़ निकालें
    const allModules = await Module.find();
    let currentVideoObj = null;
    let flatVideos = [];

    // मास्टर लिस्ट फ्लैट करना (आपके पुराने लॉजिक के अनुसार)
    allModules.forEach(mod => {
      if (mod.subModules && mod.subModules.length > 0) {
        mod.subModules.forEach(subMod => {
          if (subMod.videos) flatVideos.push(...subMod.videos);
        });
      } else if (mod.videos) {
        flatVideos.push(...mod.videos);
      }
    });
    flatVideos.sort((a, b) => a.sequenceOrder - b.sequenceOrder);

    currentVideoObj = flatVideos.find(v => v.videoId === videoId);
    if (!currentVideoObj || !currentVideoObj.quiz || currentVideoObj.quiz.length === 0) {
      return res.status(404).json({ message: 'इस वीडियो के लिए कोई क्विज़ नहीं मिला।' });
    }

    // स्कोर कैलकुलेट करें
    let score = 0;
    const totalQuestions = currentVideoObj.quiz.length;

    currentVideoObj.quiz.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });

    // पास होने के लिए कम से कम 80% नंबर ज़रूरी हैं
    const passed = (score / totalQuestions) >= 0.8;

    // रिजल्ट को यूजर प्रोफाइल में अपडेट या ऐड करें (सुरक्षित तरीके से स्ट्रिंग ट्रिम करके मैच कर रहे हैं)
    const existingResultIndex = user.quizResults.findIndex(
      r => String(r.videoId).trim() === String(videoId).trim()
    );
    
    const newResult = { videoId, score, totalQuestions, passed, attemptedAt: new Date() };

    if (existingResultIndex !== -1) {
      user.quizResults[existingResultIndex] = newResult;
    } else {
      user.quizResults.push(newResult);
    }

    // 🏆 अगर पास हो गया है, तो ही अगला वीडियो अनलॉक करें!
    if (passed) {
      if (!user.completedVideos.includes(videoId)) {
        user.completedVideos.push(videoId);
      }

      const currentIndex = flatVideos.findIndex(v => v.videoId === videoId);
      if (currentIndex !== -1 && currentIndex + 1 < flatVideos.length) {
        const nextVideoObj = flatVideos[currentIndex + 1];
        
        const currentUnlockedIndex = flatVideos.findIndex(v => v.videoId === user.currentUnlockedVideo);
        if (currentIndex >= currentUnlockedIndex - 1) {
          user.currentUnlockedVideo = nextVideoObj.videoId;
        }
      } else {
        user.currentUnlockedVideo = "COMPLETED_ALL";
      }
    }

    // 🌟 सुपर फिक्स: मोंगोडीबी को फोर्स करें कि उसे इन एरे/ऑब्जेक्ट्स के बदलावों को हर हाल में सेव करना है!
    user.markModified('quizResults');
    user.markModified('completedVideos');
    user.markModified('currentUnlockedVideo');

    // फाइनल डेटाबेस सेव
    await user.save();

    res.json({
      passed,
      score,
      totalQuestions,
      completedVideos: user.completedVideos,
      currentUnlockedVideo: user.currentUnlockedVideo,
      quizResults: user.quizResults
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// इसे module.exports में ऐड करना न भूलें
module.exports = { getModules, updateProgress, submitQuiz };

// backend/models/Schemas.js
const mongoose = require('mongoose');

// --- 1. VIDEO SCHEMA ---
const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true }, // 🟢 ध्यान दें: यहाँ से unique: true हटा दिया है
  title: { type: String, required: true },
  url: { type: String, required: true },
  sequenceOrder: { type: Number, required: true }, // वीडियो का आर्डर (1, 2, 3...)
  quiz: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }], // 4 विकल्प
      correctAnswer: { type: Number, required: true } // सही विकल्प का इंडेक्स (0, 1, 2, या 3)
    }
  ]
});

// --- 2. SUB-MODULE SCHEMA (नया Tier जोड़ा गया है) ---
const SubModuleSchema = new mongoose.Schema({
  subModuleId: { type: String, required: true }, // जैसे: "m1-s1", "m3-s2"
  title: { type: String, required: true },
  videos: [VideoSchema] // सब-मॉड्यूल के अंदर वीडियोस की एरे
});

// --- 3. MODULE SCHEMA (अपडेटेड) ---
const ModuleSchema = new mongoose.Schema({
  moduleId: { type: Number, required: true, unique: true }, // जैसे: 1, 2, 3
  title: { type: String, required: true },
  subModules: [SubModuleSchema] // 🟢 पुराना 'videos: [VideoSchema]' हटाकर अब यहाँ 'subModules' कर दिया है
});

// --- 4. USER / PARTNER SCHEMA (सभी पुराने फ़ील्ड्स को सुरक्षित रखते हुए अपडेटेड) ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // हैश किया हुआ पासवर्ड
  role: { type: String, default: 'channel_partner' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  
  // मास्टर फिक्स: मोंगूज को बताएं कि 'isPaid' एकै वैलिड फ़ील्ड है और डिफ़ॉल्ट रूप से false रहेगा
  isPaid: { type: Boolean, default: false },
  activatedAt: { type: Date, default: null },
  
  // प्रोग्रेस ट्रैकिंग: यूजर ने कौन-कौन से वीडियो देख लिए हैं, उनकी IDs यहाँ सेव होंगी
  completedVideos: [{ type: String }], 
  
  // वर्तमान में यूजर किस वीडियो तक पहुँचा है (जो अनलॉक्ड है पर अभी देखा नहीं)
  currentUnlockedVideo: { type: String, default: "m1s1-v1" },
  
  // 🎯 [BULETPROOF FIX]: क्विज़ रिजल्ट्स का स्ट्रक्चर पूरी तरह वैलिडेटेड और सिंक करने के लिए तैयार है
  quizResults: [
    {
      videoId: { type: String, required: true },
      score: { type: Number, required: true },
      totalQuestions: { type: Number, required: true },
      passed: { type: Boolean, required: true },
      attemptedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const Module = mongoose.model('Module', ModuleSchema);
const User = mongoose.model('User', UserSchema);

export { Module, User };

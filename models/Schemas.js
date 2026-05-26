// backend/models/Schemas.js
const mongoose = require('mongoose');

// --- 1. VIDEO SCHEMA ---
const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true }, // जैसे: "m1-v1"
  title: { type: String, required: true },
  url: { type: String, required: true },
  sequenceOrder: { type: Number, required: true } // वीडियो का आर्डर (1, 2, 3...)
});

// --- 2. MODULE SCHEMA ---
const ModuleSchema = new mongoose.Schema({
  moduleId: { type: Number, required: true, unique: true }, // जैसे: 1, 2, 3
  title: { type: String, required: true },
  videos: [VideoSchema] // एक मॉड्यूल के अंदर कई वीडियोस हो सकते हैं
});

// --- 3. USER / PARTNER SCHEMA ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // हैश किया हुआ पासवर्ड
  role: { type: String, default: 'channel_partner' },
  
  // प्रोग्रेस ट्रैकिंग: यूजर ने कौन-कौन से वीडियो देख लिए हैं, उनकी IDs यहाँ सेव होंगी
  completedVideos: [{ type: String }], 
  
  // वर्तमान में यूजर किस वीडियो तक पहुँचा है (जो अनलॉक्ड है पर अभी देखा नहीं)
  currentUnlockedVideo: { type: String, default: "m1-v1" } 
}, { timestamps: true });

const Module = mongoose.model('Module', ModuleSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Module, User };
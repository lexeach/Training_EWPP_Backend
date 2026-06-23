import mongoose from 'mongoose';

// --- 1. VIDEO SCHEMA ---
const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  sequenceOrder: { type: Number, required: true },
  quiz: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true }
    }
  ]
});

// --- 2. SUB-MODULE SCHEMA ---
const SubModuleSchema = new mongoose.Schema({
  subModuleId: { type: String, required: true },
  title: { type: String, required: true },
  videos: [VideoSchema]
});

// --- 3. MODULE SCHEMA ---
const ModuleSchema = new mongoose.Schema({
  moduleId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  subModules: [SubModuleSchema]
});

// --- 4. USER / PARTNER SCHEMA ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'channel_partner' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  
  isPaid: { type: Boolean, default: false },
  activatedAt: { type: Date, default: null },
  
  completedVideos: [{ type: String }], 
  currentUnlockedVideo: { type: String, default: "m1s1-v1" },
  
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

// --- 5. EXPORT (ES MODULE SYTAX) ---
export { Module, User };

// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Module } = require('./models/Schemas');

dotenv.config();

// 🟢 फिक्स: डेटा को 3-Tier Structure (subModules -> videos) में बदल दिया गया है
const modulesData = [
  {
    moduleId: 1,
    title: "Module 1 → Introduction",
    subModules: [
      {
        subModuleId: "m1-s1",
        title: "Welcome & Overview",
        videos: [
          { videoId: "m1-v1", title: "Welcome to Exowa Women Partner Program", url: "https://all-exowa-training-video.netlify.app/output.mp4", sequenceOrder: 1 },
          { videoId: "m1-v2", title: "Why This Opportunity is Special for Women", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 2 },
          { videoId: "m1-v3", title: "Success Mindset for Women Partners", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 3 },
          { videoId: "m1-v4", title: "Exowa Mission & Vision", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 4 }
        ]
      }
    ]
  },
  {
    moduleId: 2,
    title: "Module 2 → Product Knowledge",
    subModules: [
      {
        subModuleId: "m2-s1",
        title: "Product Deep Dive",
        videos: [
          { videoId: "m2-v1", title: "Exowa Product Introduction", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 5 },
          { videoId: "m2-v2", title: "Exowa Parents के लिए क्यों जरूरी है?", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 6 },
          { videoId: "m2-v3", title: "Exowa Students की कैसे मदद करता है?", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 7 },
          { videoId: "m2-v4", title: "Exowa के Features Explained", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 8 },
          { videoId: "m2-v5", title: "Exowa Subscription Plans Explained", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 9 },
          { videoId: "m2-v6", title: "Common Questions Parents Ask (FAQ)", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 10 }
        ]
      }
    ]
  },
  {
    moduleId: 3,
    title: "Module 3 → Communication Skills",
    subModules: [
      {
        subModuleId: "m3-s1",
        title: "Processes & Pitching",
        videos: [
          { videoId: "m3-v1", title: "How Exowa Women Partner Program Works", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 11 },
          { videoId: "m3-v2", title: "Daily Work Process of a Partner", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 12 },
          { videoId: "m3-v3", title: "How to Use WhatsApp for Business", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 13 },
          { videoId: "m3-v4", title: "Lead Management Basics", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 14 },
          { videoId: "m3-v5", title: "Using Google Forms & CRM Basics", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 15 },
          { videoId: "m3-v6", title: "Basic Communication Skills", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 16 },
          { videoId: "m3-v7", title: "Phone Call Confidence Training", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 17 },
          { videoId: "m3-v8", title: "How to Talk to Parents Professionally", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 18 },
          { videoId: "m3-v9", title: "Hindi Script Practice Session", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 19 },
          { videoId: "m3-v10", title: "Body Language & Video Call Etiquette", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 20 }
        ]
      }
    ]
  },
  {
    moduleId: 4,
    title: "Module 4 → Lead Generation",
    subModules: [
      {
        subModuleId: "m4-s1",
        title: "Marketing Strategies",
        videos: [
          { videoId: "m4-v1", title: "Where to Find Parents Leads", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 21 },
          { videoId: "m4-v2", title: "Social Media Lead Generation", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 22 },
          { videoId: "m4-v3", title: "WhatsApp Status Marketing Strategy", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 23 },
          { videoId: "m4-v4", title: "Referral System Training", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 24 }
        ]
      }
    ]
  },
  {
    moduleId: 5,
    title: "Module 5 → Sales Training",
    subModules: [
      {
        subModuleId: "m5-s1",
        title: "Sales Mastery",
        videos: [
          { videoId: "m5-v1", title: "Complete Sales Funnel Explained", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 25 },
          { videoId: "m5-v2", title: "First Parent Call Script", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 26 },
          { videoId: "m5-v3", title: "Demo Booking Training", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 27 },
          { videoId: "m5-v4", title: "How to Give Product Demo", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 28 },
          { videoId: "m5-v5", title: "Emotional Selling Technique", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 29 },
          { videoId: "m5-v6", title: "Objection Handling Masterclass", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 30 },
          { videoId: "m5-v7", title: "Closing the Sale Professionally", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 31 },
          { videoId: "m5-v8", title: "Payment Collection Process", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 32 }
        ]
      }
    ]
  },
  {
    moduleId: 6,
    title: "Module 6 → Advanced Growth",
    subModules: [
      {
        subModuleId: "m6-s1",
        title: "Growth & Productivity",
        videos: [
          { videoId: "m6-v1", title: "Follow-Up Mastery", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 33 },
          { videoId: "m6-v2", title: "How Top Partners Earn More", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 34 },
          { videoId: "m6-v3", title: "Building Personal Brand as Exowa Partner", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 35 },
          { videoId: "m6-v4", title: "Team Building Basics", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 36 },
          { videoId: "m6-v5", title: "Time Management for Housewives", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 37 },
          { videoId: "m6-v6", title: "Motivation & Consistency Training", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 38 }
        ]
      }
    ]
  },
  {
    moduleId: 7,
    title: "Module 7 → Certification",
    subModules: [
      {
        subModuleId: "m7-s1",
        title: "Final Roadmap & Bonuses",
        videos: [
          { videoId: "m7-v1", title: "Complete Sales Roleplay Practice", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 39 },
          { videoId: "m7-v2", title: "Final Assessment & Certification Guide", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 40 },
          { videoId: "m7-v3", title: "Bonus 1: Top Mistakes New Partners Make", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 41 },
          { videoId: "m7-v4", title: "Bonus 2: Real Success Stories of Women Partners", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 42 },
          { videoId: "m7-v5", title: "Bonus 3: Daily Routine of Successful Partner", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 43 },
          { videoId: "m7-v6", title: "Bonus 4: Advanced WhatsApp Closing Tricks", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 44 },
          { videoId: "m7-v7", title: "Bonus 5: How to Earn Consistent Monthly Income", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 45 }
        ]
      }
    ]
  }
];

// Database operations function
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding 3-tier structure...");

    // स्टेप 1: पुराना डेटा डिलीट करें
    await Module.deleteMany();
    console.log("Old modules deleted.");

    // स्टेप 2: पुराना यूनिक इंडेक्स ड्रॉप करें
    try {
      await Module.collection.dropIndexes();
      console.log("Old indexes dropped successfully.");
    } catch (indexError) {
      console.log("No old indexes to drop or already cleared.");
    }

    // स्टेप 3: नया कनवर्टेड डेटा इंसर्ट करें
    await Module.insertMany(modulesData);
    console.log("🎉 All Modules, Sub-Modules, and Videos seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--run') {
    seedDatabase();
}

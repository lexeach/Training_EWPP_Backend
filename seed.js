// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Module } = require('./models/Schemas');

dotenv.config();

// 🟢 फिक्स: डेटा को 3-Tier Structure (subModules -> videos) में बदल दिया गया है
// backend/seed.js के अंदर का पूरा और फाइनल 'modulesData'
const modulesData = [
  {
    moduleId: 1,
    title: "Module 1 — WELCOME & MINDSET BUILDING",
    subModules: [
      {
        subModuleId: "m1-s1",
        title: "SubModule 1A: Welcome to Exowa Women Partner Program",
        videos: [
          { videoId: "m1s1-v1", title: "Exowa क्या है?", url: "https://all-exowa-training-video.netlify.app/output.mp4", sequenceOrder: 1 },
          { videoId: "m1s1-v2", title: "Program का उद्देश्य", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 2 },
          { videoId: "m1s1-v3", title: "Women empowerment vision", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 3 },
          { videoId: "m1s1-v4", title: "घर से काम कैसे होगा?", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 4 }
        ]
      },
      {
        subModuleId: "m1-s2",
        title: "SubModule 1B: Why This Opportunity is Special for Women",
        videos: [
          { videoId: "m1s2-v1", title: "Work from home", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 5 },
          { videoId: "m1s2-v2", title: "सम्मान + income", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 6 },
          { videoId: "m1s2-v3", title: "बिना investment business mindset", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 7 },
          { videoId: "m1s2-v4", title: "Housewives भी क्यों सफल हो सकती हैं", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 8 }
        ]
      },
      {
        subModuleId: "m1-s3",
        title: "SubModule 1C: Success Mindset for Women Partners",
        videos: [
          { videoId: "m1s3-v1", title: "डर कैसे हटाएं", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 9 },
          { videoId: "m1s3-v2", title: "Communication confidence", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 10 },
          { videoId: "m1s3-v3", title: "“मैं नहीं कर पाऊंगी” mindset खत्म करना", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 11 },
          { videoId: "m1s3-v4", title: "Daily discipline", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 12 }
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
        title: "SubModule 2A: Exowa Product Core Concepts",
        videos: [
          { videoId: "m2s1-v1", title: "Exowa Product Introduction", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 13 },
          { videoId: "m2s1-v2", title: "Exowa Parents के लिए क्यों जरूरी है?", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 14 },
          { videoId: "m2s1-v3", title: "Exowa Students की कैसे मदद करता है?", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 15 }
        ]
      },
      {
        subModuleId: "m2-s2",
        title: "SubModule 2B: Features & Plan Pricing",
        videos: [
          { videoId: "m2s2-v1", title: "Exowa के Features Explained", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 16 },
          { videoId: "m2s2-v2", title: "Exowa Subscription Plans Explained", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 17 },
          { videoId: "m2s2-v3", title: "Common Questions Parents Ask (FAQ)", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 18 }
        ]
      }
    ]
  },
  {
    moduleId: 3,
    title: "Module 3 → Communication Skills & Workflow",
    subModules: [
      {
        subModuleId: "m3-s1",
        title: "SubModule 3A: Partner Working Systems",
        videos: [
          { videoId: "m3s1-v1", title: "How Exowa Women Partner Program Works", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 19 },
          { videoId: "m3s1-v2", title: "Daily Work Process of a Partner", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 20 },
          { videoId: "m3s1-v3", title: "How to Use WhatsApp for Business", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 21 },
          { videoId: "m3s1-v4", title: "Lead Management Basics", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 22 },
          { videoId: "m3s1-v5", title: "Using Google Forms & CRM Basics", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 23 }
        ]
      },
      {
        subModuleId: "m3-s2",
        title: "SubModule 3B: Professional Call Practices",
        videos: [
          { videoId: "m3s2-v1", title: "Basic Communication Skills", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 24 },
          { videoId: "m3s2-v2", title: "Phone Call Confidence Training", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 25 },
          { videoId: "m3s2-v3", title: "How to Talk to Parents Professionally", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 26 },
          { videoId: "m3s2-v4", title: "Hindi Script Practice Session", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 27 },
          { videoId: "m3s2-v5", title: "Body Language & Video Call Etiquette", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 28 }
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
        title: "SubModule 4A: Finding Your Audience",
        videos: [
          { videoId: "m4s1-v1", title: "Where to Find Parents Leads", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 29 },
          { videoId: "m4s1-v2", title: "Social Media Lead Generation", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 30 },
          { videoId: "m4s1-v3", title: "WhatsApp Status Marketing Strategy", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 31 },
          { videoId: "m4s1-v4", title: "Referral System Training", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 32 }
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
        title: "SubModule 5A: Pitching & Objection Handling",
        videos: [
          { videoId: "m5s1-v1", title: "Complete Sales Funnel Explained", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 33 },
          { videoId: "m5s1-v2", title: "First Parent Call Script", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 34 },
          { videoId: "m5s1-v3", title: "Demo Booking Training", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 35 },
          { videoId: "m5s1-v4", title: "How to Give Product Demo", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 36 }
        ]
      },
      {
        subModuleId: "m5-s2",
        title: "SubModule 5B: Closing Techniques",
        videos: [
          { videoId: "m5s2-v1", title: "Emotional Selling Technique", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 37 },
          { videoId: "m5s2-v2", title: "Objection Handling Masterclass", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 38 },
          { videoId: "m5s2-v3", title: "Closing the Sale Professionally", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 39 },
          { videoId: "m5s2-v4", title: "Payment Collection Process", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 40 }
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
        title: "SubModule 6A: Branding & Scaling",
        videos: [
          { videoId: "m6s1-v1", title: "Follow-Up Mastery", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 41 },
          { videoId: "m6s1-v2", title: "How Top Partners Earn More", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 42 },
          { videoId: "m6s1-v3", title: "Building Personal Brand as Exowa Partner", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 43 },
          { videoId: "m6s1-v4", title: "Team Building Basics", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 44 },
          { videoId: "m6s1-v5", title: "Time Management for Housewives", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 45 },
          { videoId: "m6s1-v6", title: "Motivation & Consistency Training", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 46 }
        ]
      }
    ]
  },
  {
    moduleId: 7,
    title: "Module 7 → Certification & Bonuses",
    subModules: [
      {
        subModuleId: "m7-s1",
        title: "SubModule 7A: Final Roadmap & Real Examples",
        videos: [
          { videoId: "m7s1-v1", title: "Complete Sales Roleplay Practice", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 47 },
          { videoId: "m7s1-v2", title: "Final Assessment & Certification Guide", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 48 },
          { videoId: "m7s1-v3", title: "Bonus 1: Top Mistakes New Partners Make", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 49 },
          { videoId: "m7s1-v4", title: "Bonus 2: Real Success Stories of Women Partners", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 50 },
          { videoId: "m7s1-v5", title: "Bonus 3: Daily Routine of Successful Partner", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 51 },
          { videoId: "m7s1-v6", title: "Bonus 4: Advanced WhatsApp Closing Tricks", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 52 },
          { videoId: "m7s1-v7", title: "Bonus 5: How to Earn Consistent Monthly Income", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 53 }
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

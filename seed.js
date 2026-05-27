// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Module } = require('./models/Schemas');

dotenv.config();

// सातों मॉड्यूल्स और उनके वीडियो का डेटा
const modulesData = [
  {
    moduleId: 1,
    title: "Module 1 → Introduction",
    videos: [
      { videoId: "m1-v1", title: "Welcome to the Company", url: "https://docs.google.com/uc?export=download&id=1NJPqJaYtB_pOBb2miUdCMf6Q4Zxc078n", sequenceOrder: 1 },
      { videoId: "m1-v2", title: "Our Mission, Vision & Culture", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 2 }
    ]
  },
  {
    moduleId: 2,
    title: "Module 2 → Product Knowledge",
    videos: [
      { videoId: "m2-v1", title: "Core Features Overview", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 3 },
      { videoId: "m2-v2", title: "Pricing Plans & Packages", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 4 }
    ]
  },
  {
    moduleId: 3,
    title: "Module 3 → Communication Skills",
    videos: [
      { videoId: "m3-v1", title: "How to Pitch to Clients", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 5 },
      { videoId: "m3-v2", title: "Handling Client Objections", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 6 }
    ]
  },
  {
    moduleId: 4,
    title: "Module 4 → Lead Generation",
    videos: [
      { videoId: "m4-v1", title: "Finding Channel Partner Leads", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 7 },
      { videoId: "m4-v2", title: "Using Social Media for Leads", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 8 }
    ]
  },
  {
    moduleId: 5,
    title: "Module 5 → Sales Training",
    videos: [
      { videoId: "m5-v1", title: "The Sales Funnel Strategy", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 9 },
      { videoId: "m5-v2", title: "Closing the Deal Successfully", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 10 }
    ]
  },
  {
    moduleId: 6,
    title: "Module 6 → Advanced Growth",
    videos: [
      { videoId: "m6-v1", title: "Scaling Your Network", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 11 },
      { videoId: "m6-v2", title: "Long-term Incentives & Rewards", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 12 }
    ]
  },
  {
    moduleId: 7,
    title: "Module 7 → Certification",
    videos: [
      { videoId: "m7-v1", title: "Final Assessment Instructions", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 13 },
      { videoId: "m7-v2", title: "Claiming Your Certificate", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 14 }
    ]
  }
];

// डेटाबेस में इन्सर्ट करने का फंक्शन
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    // पुराना डेटा डिलीट करें ताकि डुप्लिकेट न हो
    await Module.deleteMany();
    console.log("Old modules deleted.");

    // नया डेटा इन्सर्ट करें
    await Module.insertMany(modulesData);
    console.log("🎉 All 7 Modules with videos seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};
// seedDatabase(); को हटाकर या कमेंट करके यह लिखें:
if (process.argv[2] === '--run') {
    seedDatabase();
}
//seedDatabase();
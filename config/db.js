// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // process.env.MONGO_URI को हम .env फाइल से रीड करेंगे
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1); // एरर आने पर प्रोसेस को बंद कर दें
  }
};

module.exports = connectDB;
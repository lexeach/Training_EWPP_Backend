// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

// पर्यावरण वेरिएबल्स (.env) लोड करना
dotenv.config();

// डेटाबेस कनेक्ट करें
connectDB();

const app = express();

// Middlewares
app.use(cors()); // क्रॉस-ओरिजिन रिक्वेस्ट अलाउ करने के लिए (ताकि फ्रंटएंड कनेक्ट हो सके)
app.use(express.json()); // JSON डेटा रीड करने के लिए

// Base API Route
app.use('/api', apiRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Channel Partner Training Backend API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
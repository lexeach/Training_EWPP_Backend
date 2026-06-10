// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');
const paymentRoutes = require('./routes/payment');
const authUtilsRoutes = require('./routes/authUtils');

// पर्यावरण वेरिएबल्स (.env) लोड करना
dotenv.config();

// डेटाबेस कनेक्ट करें
connectDB();

const app = express();

// 🛡️ Middlewares
app.use(cors()); // क्रॉस-ओरिजिन रिक्वेस्ट अलाउ करने के लिए (ताकि फ्रंटएंड कनेक्ट हो सके)
app.use(express.json()); // JSON डेटा रीड करने के लिए

// 🚀 Base API Routes
app.use('/api', apiRoutes);               // मॉड्यूल्स, प्रोग्रेस और क्विज़ राउट्स इसी के अंदर हैं
app.use('/api/payment', paymentRoutes);     // पेमेंट गेटवे राउट्स
app.use('/api/auth-utils', authUtilsRoutes); // ऑथेंटिकेशन यूटिलिटी राउट्स

// 🌐 Test Route
app.get('/', (req, res) => {
  res.send('Channel Partner Training Backend API is running...');
});

// 🔌 Server Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

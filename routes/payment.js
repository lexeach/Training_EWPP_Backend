const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const User = mongoose.model('User');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Gmail API Setup
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oauth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

// 1. PDF Generation Function
const generateInvoice = (user, amount) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const filePath = `./invoice_${user._id}.pdf`;
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Header: EXOWA Branding
    // doc.image('logo.png', 50, 45, { width: 50 }); // लोगो की लाइन (logo.png फाइल रखें)
    doc.fontSize(25).fillColor('#0284c7').text('EXOWA', 110, 55);
    doc.fontSize(10).fillColor('black').text('Training Portal Invoice', 110, 80);
    doc.text('Address: Delhi, India', 400, 55, { align: 'right' });
    doc.text('GST No: 07EXOWA1234A1Z5', 400, 70, { align: 'right' });
    doc.moveDown();

    doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, 110).lineTo(550, 110).stroke();
    doc.moveDown(2);

    doc.fontSize(12).text(`Bill To: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Table
    doc.fillColor('#0284c7').rect(50, 200, 500, 25).fill();
    doc.fillColor('white').text('Description', 60, 208);
    doc.text('Amount', 450, 208);
    doc.fillColor('black').fontSize(12).text('Training Course Fee', 60, 240);
    doc.text(`₹${amount}`, 450, 240);
    doc.text('GST (18%): ₹63', 450, 260);
    doc.fontSize(14).text(`Total: ₹${amount + 63}`, 450, 290, { underline: true });

    // Footer
    doc.fontSize(10).text('For any queries, contact: support@exowa.com | Care: +91 9999999999', 50, 750, { align: 'center' });
    doc.end();
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
};

// 2. Email Sending Function (Gmail API)
const sendWelcomeEmail = async (userEmail, userName, invoicePath) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const pdfData = fs.readFileSync(invoicePath).toString('base64');

    const boundary = "boundary_12345";
    const message = [
      `To: ${userEmail}`,
      `Subject: Welcome to EXOWA Training Portal! 🎉`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/html; charset=utf-8",
      "",
      `<h2>Hello ${userName},</h2><p>Your payment is successful. Find your invoice attached.</p>`,
      `--${boundary}`,
      "Content-Type: application/pdf",
      "Content-Transfer-Encoding: base64",
      "Content-Disposition: attachment; filename=invoice.pdf",
      "",
      pdfData,
      `--${boundary}--`
    ].join('\n');

    const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encodedMessage } });
  } catch (err) { console.error("Email Error:", err); }
};

// 3. API Routes
router.get('/key', (req, res) => res.status(200).json({ key: process.env.RAZORPAY_KEY_ID }));

router.post('/order', async (req, res) => {
  const order = await razorpay.orders.create({ amount: req.body.amount * 100, currency: "INR", notes: { userId: req.body.userId } });
  res.status(200).json(order);
});

router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign).digest("hex");

  if (expectedSign === razorpay_signature) {
    const updatedUser = await User.findByIdAndUpdate(userId, { isPaid: true }, { new: true });
    
    // Generate Invoice & Email
    const invoicePath = await generateInvoice(updatedUser, 350);
    await sendWelcomeEmail(updatedUser.email, updatedUser.name, invoicePath);
    fs.unlinkSync(invoicePath); // Delete temp file

    return res.status(200).json({ success: true, user: updatedUser });
  }
  res.status(400).json({ success: false });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const handlebars = require('handlebars');
const htmlPdf = require('html-pdf-node');

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
const generateInvoice = async (user, amount) => {
  const templateHtml = fs.readFileSync('./invoice_template.html', 'utf8');
  const template = handlebars.compile(templateHtml);

  // गणना (Calculations)
  const gst = (amount * 0.18).toFixed(2);
  const total = (parseFloat(amount) + parseFloat(gst)).toFixed(2);

  const data = {
    name: user.name || "Valued Customer",
    email: user.email || "N/A",
    phone: user.phone || "N/A",
    invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleDateString('en-GB'),
    amount: amount.toFixed(2),
    tax: gst,
    total: total
  };

  const finalHtml = template(data);
  
  // PDF Generation Options
  const options = { 
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', bottom: '0px' } 
  };
  
  const pdfBuffer = await htmlPdf.generatePdf({ content: finalHtml }, options);
  const filePath = `./invoice_${user._id}.pdf`;
  fs.writeFileSync(filePath, pdfBuffer);
  
  return filePath;
};// 2. Email Sending Function (Gmail API)
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

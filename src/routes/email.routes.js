// routes/email.js

const express = require('express');
const { sendEmail } = require('../utils/email');
const router = express.Router();

// Send Email
router.post('/send', async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    await sendEmail({ to, subject, text, html });
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

module.exports = router;
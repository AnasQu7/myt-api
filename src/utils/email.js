// utils/email.js

const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
  if (!nodemailer) return;

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: '8c8708001@smtp-brevo.com',
      pass: process.env.SMTP_KEY,
    },
  });

  const mailOptions = {
    from: 'info@myt-rugs.com',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}

module.exports = { sendEmail };
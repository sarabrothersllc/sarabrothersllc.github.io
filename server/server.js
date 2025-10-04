/**
 * Simple Express server
 * - Serves the static SPA from the project root
 * - Handles contact form email via Nodemailer at POST /api/contact
 *
 * Environment variables required for email (when using internal provider):
 * - SMTP_HOST: SMTP server hostname
 * - SMTP_PORT: SMTP port (e.g., 587)
 * - SMTP_SECURE: 'true' to use TLS, otherwise false
 * - SMTP_USER: SMTP username (also used as default MAIL_FROM if not provided)
 * - SMTP_PASS: SMTP password
 * - MAIL_TO: Recipient email address for contact messages
 * - MAIL_FROM: Optional From address (defaults to SMTP_USER)
 */
// Simple Express server to serve the SPA and handle contact form email via Nodemailer
require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

/**
 * @typedef {object} ContactForm
 * @property {string} first - First name
 * @property {string} last - Last name
 * @property {string} email - Sender email (required)
 * @property {string} message - Message body (required)
 */
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '1mb' }));

// Serve static site from project root (adjust if needed)
const publicDir = path.resolve(__dirname, '..');
app.use(express.static(publicDir));

/** Health check endpoint */
app.get('/api/health', (_req, res) => res.json({ ok: true }));

/**
 * Send contact form email
 * @route POST /api/contact
 * @param {string} body.first - First name
 * @param {string} body.last - Last name
 * @param {string} body.email - Sender email (required)
 * @param {string} body.message - Message body (required)
 * @returns {object} { ok: boolean, id?: string, error?: string }
 *
 * This endpoint is invoked by the SPA when `config.contact.submit.emailProvider` is set to "internal".
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { first = '', last = '', email = '', message = '' } = req.body || {};
    if (!email || !message) return res.status(400).json({ ok: false, error: 'Missing required fields' });

    // SMTP transport from environment
    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
      return res.status(500).json({ ok: false, error: 'Email is not configured on the server' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(String(SMTP_PORT), 10) || 587,
      secure: String(SMTP_SECURE || '').toLowerCase() === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const fullName = `${first} ${last}`.trim() || 'Website Visitor';
    const subject = `Contact form: ${fullName}`;
    const lines = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ];

    const info = await transporter.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: MAIL_TO,
      subject,
      text: lines.join('\n'),
    });

    return res.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store just for debugging / simple automation.
// Replace this with a database or external service in production.
const submissions = [];

// Primary webhook-style endpoint that receives the form data.
app.post('/api/waitlist', (req, res) => {
  try {
    const { name, email, phone, role, company } = req.body || {};

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: name, email' });
    }

    const record = {
      name,
      email,
      phone: phone || '',
      role: role || '',
      company: company || '',
      receivedAt: new Date().toISOString(),
    };

    submissions.push(record);

    // This is now your own webhook API.
    // Downstream automation tools (Make, Zapier, etc.) can:
    // - Poll GET /api/waitlist to read new records, or
    // - You can extend this handler to push directly to Sheets/DB.

    return res.status(202).json({ ok: true });
  } catch (error) {
    console.error('Error handling /api/waitlist:', error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
});

// Simple endpoint to inspect submissions or let automation poll them.
app.get('/api/waitlist', (_req, res) => {
  res.json(submissions);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Custom waitlist webhook API listening on port ${port}`);
});

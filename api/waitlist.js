const readBody = (req) =>
  new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });

const parseBody = async (req) => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (_error) {
      const formData = new URLSearchParams(req.body);
      return Object.fromEntries(formData.entries());
    }
  }

  if (Buffer.isBuffer(req.body)) {
    const text = req.body.toString('utf8');
    try {
      return JSON.parse(text);
    } catch (_error) {
      const formData = new URLSearchParams(text);
      return Object.fromEntries(formData.entries());
    }
  }

  const rawBody = await readBody(req);
  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch (_error) {
    const formData = new URLSearchParams(rawBody);
    return Object.fromEntries(formData.entries());
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = await parseBody(req);
    const { name, email, phone, role, company } = body || {};

    if (!name || !email) {
      res.status(400).json({ error: 'Missing required fields: name, email' });
      return;
    }

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!makeWebhookUrl) {
      res.status(500).json({ error: 'MAKE_WEBHOOK_URL is not configured' });
      return;
    }

    const payload = {
      'Full Name': name,
      'Email Address': email,
      Phone: phone || '',
      Role: role || '',
      Organization: company || '',
    };

    const response = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      res.status(502).json({ error: 'Upstream Make webhook returned an error' });
      return;
    }

    res.status(202).json({ ok: true });
  } catch (error) {
    console.error('Error in waitlist function:', error);
    res.status(500).json({ error: 'Unexpected server error' });
  }
}

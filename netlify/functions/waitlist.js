const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const parseBody = (event) => {
  const rawBody = event.body || '';
  const decodedBody = event.isBase64Encoded
    ? Buffer.from(rawBody, 'base64').toString('utf8')
    : rawBody;

  if (!decodedBody) {
    return {};
  }

  try {
    return JSON.parse(decodedBody);
  } catch (_error) {
    const formData = new URLSearchParams(decodedBody);
    return Object.fromEntries(formData.entries());
  }
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = parseBody(event);
    const { name, email, phone, role, company } = body;

    if (!name || !email) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields: name, email' }),
      };
    }

    let makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!makeWebhookUrl) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'MAKE_WEBHOOK_URL is not configured' }),
      };
    }

    // Handle URL format: if it contains @ (e.g., "id@hook.us2.make.com"), transform it
    if (makeWebhookUrl.includes('@') && !makeWebhookUrl.includes('://')) {
      const [webhookId, host] = makeWebhookUrl.split('@');
      makeWebhookUrl = `https://${host}/${webhookId}`;
    }

    // Ensure the URL has a protocol prefix
    if (!makeWebhookUrl.startsWith('http://') && !makeWebhookUrl.startsWith('https://')) {
      makeWebhookUrl = `https://${makeWebhookUrl}`;
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
      return {
        statusCode: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Upstream Make webhook returned an error' }),
      };
    }

    return {
      statusCode: 202,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error('Error in waitlist function:', error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unexpected server error' }),
    };
  }
};

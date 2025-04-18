// ✅ qroq.js — Node.js Serverless/API Handler with .env support and safe JSON parsing
require('dotenv').config();

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.QROQ_KEY;

  if (!apiKey) {
    console.error('❌ QROQ_KEY is missing in .env');
    return res.status(500).json({ response: '⚠️ Assistant API key not set on server.' });
  }

  try {
    const qroqRes = await fetch('https://api.qroq.ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt,
        context: 'BasicPay+ is a Stellar wallet app with payments, QR codes, encryption, and recurring transfers.'
      })
    });

    const contentType = qroqRes.headers.get("content-type");
    const rawText = await qroqRes.text();
    console.log('🔍 Qroq raw response:', rawText);

    if (!contentType || !contentType.includes("application/json")) {
      console.error("❌ Qroq did not return JSON:", contentType);
      return res.status(500).json({ response: "⚠️ Qroq returned an unexpected response." });
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('❌ Failed to parse Qroq response as JSON:', rawText);
      return res.status(500).json({ response: '⚠️ Qroq returned invalid JSON.' });
    }

    res.status(200).json({ response: data?.response || '🤖 No valid response received.' });

  } catch (err) {
    console.error('❌ Qroq API call failed:', err.message);
    res.status(500).json({ response: '⚠️ Assistant failed. Try again later.' });
  }
};

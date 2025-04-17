module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  try {
    const qroqRes = await fetch('https://api.qroq.ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.QROQ_KEY}`
      },
      body: JSON.stringify({
        prompt,
        context: 'BasicPay+ is a Stellar wallet app with payments, QR codes, encryption, and recurring transfers.'
      })
    });

    const rawText = await qroqRes.text();
    console.log('🔍 Qroq raw response:', rawText);

    try {
      const data = JSON.parse(rawText);
      res.status(200).json({ response: data?.response || '🤖 No valid response received.' });
    } catch (e) {
      console.error('❌ Failed to parse Qroq response as JSON:', e.message);
      res.status(500).json({ response: 'Qroq gave invalid JSON.' });
    }

  } catch (err) {
    console.error('❌ Qroq API call failed:', err.message);
    res.status(500).json({ response: '⚠️ Assistant failed. Try again later.' });
  }
};

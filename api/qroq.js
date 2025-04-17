export default async function handler(req, res) {
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
        context: 'BasicPay+ is a Stellar wallet with payments, QR codes, encryption, and recurring payments.'
      })
    });

    const data = await qroqRes.json();

    // Log what we got from Qroq
    console.log('Qroq response:', data);

    // Defensive: if `data.response` doesn't exist, fallback to full object
    if (data?.response) {
      res.status(200).json({ response: data.response });
    } else {
      res.status(200).json({ response: '🤖 Sorry, I didn’t understand that. Please try again.' });
    }

  } catch (err) {
    console.error('Qroq API error:', err);
    res.status(500).json({ response: '⚠️ Assistant failed. Try again later.' });
  }
}

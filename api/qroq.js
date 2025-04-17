export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;

    const qroqRes = await fetch('https://api.qroq.ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.QROQ_KEY}`
      },
      body: JSON.stringify({
        prompt,
        context: 'BasicPay+ is a Stellar wallet app with payment, QR, encryption and recurring transfer features.'
      })
    });

    const data = await qroqRes.json();

    res.status(200).json(data);
  } catch (err) {
    console.error('Qroq API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

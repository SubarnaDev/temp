// api/qroq.js
export default async function handler(req, res) {
    const { prompt } = req.body;
  
    const qroqRes = await fetch('https://api.qroq.ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.QROQ_KEY}`
      },
      body: JSON.stringify({
        prompt,
        context: 'BasicPay+ is a Stellar wallet with QR requests, recurring payments, balance tracking, and encryption.'
      })
    });
  
    const data = await qroqRes.json();
    res.status(200).json(data);
  }
  
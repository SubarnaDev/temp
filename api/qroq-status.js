require("dotenv").config();

module.exports = async function handler(req, res) {
  const key = process.env.QROQ_KEY;
  if (!key) {
    console.error("❌ QROQ_KEY is missing");
    return res.status(500).json({ ok: false, message: "API key is missing" });
  }

  try {
    const ping = await fetch("https://api.qroq.ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        prompt: "ping",
        context: "testing connectivity"
      })
    });

    const text = await ping.text();
    const status = ping.status;
    return res.status(200).json({ ok: true, status, text });
  } catch (err) {
    console.error("❌ Qroq test failed:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
};

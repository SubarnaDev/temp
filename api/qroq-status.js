// ✅ api/qroq-status.js — Safe Qroq Key Status Checker (always returns JSON)
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

    const contentType = ping.headers.get("content-type");
    const text = await ping.text();

    let response;
    if (contentType && contentType.includes("application/json")) {
      try {
        response = JSON.parse(text);
      } catch (e) {
        response = { raw: text, error: "Failed to parse JSON" };
      }
    } else {
      response = { raw: text, error: "Non-JSON response from Qroq" };
    }

    return res.status(ping.status).json({ ok: ping.ok, status: ping.status, response });
  } catch (err) {
    console.error("❌ Qroq test failed:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
};

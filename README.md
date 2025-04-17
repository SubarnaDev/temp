
---

```markdown
# 💫 BasicPay+ — Stellar Wallet for Fast, Smart, and Secure Payments

**Built for HACKHAZARDS '25 — Blockchain Innovation Hackathon**

BasicPay+ is a lightweight, secure Stellar wallet that combines real-world financial use cases with intuitive user experience. Whether you're sending remittances, setting up recurring gig payments, or requesting XLM with a QR code — this app makes it effortless.

---

## 🌟 Features

| Category                | Features                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| 🔐 Wallet Management     | Generate, encrypt, and securely store Stellar wallets locally            |
| 💸 Payments              | Send XLM, attach memos, and track balances in real time                  |
| ⏳ Recurring Transfers   | Schedule automatic transfers — perfect for gig workers & subscriptions   |
| 📲 QR Code Requests      | Create scannable QR codes for payment requests                           |
| 📊 Balance Chart        | Visualize your wallet history over time                                  |
| 📄 Transaction History   | View and link to past payments via Stellar explorer                      |
| 🌙 Dark Mode            | Switch-friendly dark theme support                                       |
| 🤖 AI Assistant (NEW!)   | Ask wallet-related questions powered by Qroq AI                          |
| ⚙️ Offline Ready         | PWA with service worker for low-connectivity usage                       |

---

## 🚀 Live Demo

**Deployed on Vercel:**  
🔗 (https://temp-kappa-beige.vercel.app/)

Try it live — no signup required. Use Stellar testnet and Friendbot to get started instantly.

---

## 📂 Project Structure

```
📦 basicpay-plus/
├── index.html
├── style.css
├── script.js
├── utils.js
├── manifest.json
├── service-worker.js
├── api/
│   └── qroq.js        # Vercel serverless function
```

---

## 🤖 AI Chatbot (Qroq Integration)

The built-in **chat assistant** helps users with wallet functionality.  
Powered via `Qroq API` using a secure serverless backend (Vercel Function) to avoid exposing API keys in frontend.

```js
POST /api/qroq
{
  "prompt": "How do I send money?"
}
```

Set your QROQ API key in Vercel Dashboard:
```
QROQ_KEY = your_api_key_here
```

---

## 🛠 Tech Stack

- 🌐 HTML + CSS + JS (Vanilla)
- 🌌 Stellar SDK
- 🔐 AES-GCM Encryption (WebCrypto API)
- 📊 Chart.js + QRCode.js
- 🧠 Qroq AI (securely proxied via Vercel)
- ⚙️ PWA with service worker caching

---

## 🧠 Real-World Use Case

**Remittance Engine for Gig Workers & Freelancers**  
- Schedule recurring payouts in XLM  
- Use QR codes for instant invoicing  
- Portable, offline-first app for remote communities

---

## 📦 Installation (Optional)

To run locally:
```bash
git clone https://github.com/your-username/basicpay-plus.git
cd basicpay-plus
npm install
vercel dev  # or serve with any static server
```

---

## 📢 Credits

- Built by: [Your Name]  
- For: **HACKHAZARDS '25**
- Powered by: [Stellar](https://www.stellar.org/) • [Qroq](https://qroq.ai/) • [Vercel](https://vercel.com)

---

## 📜 License

MIT License — Free to use and remix. Just give credit 💖

```

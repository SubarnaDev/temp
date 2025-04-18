# 💫 BasicPay+ — Stellar Wallet for Fast, Smart, and Secure Payments

**Built for HACKHAZARDS '25 — Blockchain Innovation Hackathon**

BasicPay+ is a fast, lightweight Stellar wallet built for real-world impact — enabling freelancers, NGOs, and unbanked users to send, request, and manage XLM payments securely and offline. Whether you're scheduling microloans, sharing QR-based requests, or syncing across devices — BasicPay+ makes it effortless.

---

## 🌟 Features

| Category                | Features                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| 🔐 Wallet Management     | Generate, encrypt, sync, and restore wallets (AES-GCM + Firebase)        |
| 💸 Payments              | Instant XLM transfers with memos and offline queuing                    |
| ⏳ Recurring Transfers   | Schedule automated payouts for subscriptions or salaries                 |
| 📲 QR Code Requests      | Generate QR codes for remittance or donation collection                 |
| 💸 Microloans            | Send loans with due dates and repayment tracking                        |
| 🎁 Donation Mode         | Create donation QR for NGO and personal campaigns                       |
| 📊 Charts & History      | Track balance trends and full payment history with export               |
| 📡 Real-Time Monitoring  | Live updates via Stellar account streaming                              |
| ☁️ Firebase Sync         | Backup and restore encrypted wallets across devices                     |
| 📤 Import/Export         | Local wallet backup + recovery via JSON                                 |
| 🌐 Offline Support       | PWA with install + offline transaction queue                            |
| 🤖 AI Assistant          | Ask BasicBot anything — Qroq AI integrated                              |
| 🗣 Multilingual UI       | English, Hindi, and Spanish included                                    |
| 🌙 Dark Mode             | Clean and accessible UI with theme toggle                               |

---

## 🚀 Live Demo

🌐 Try it now: [https://temp-kappa-beige.vercel.app/](https://temp-kappa-beige.vercel.app/)  
_No signup required. Fund via Friendbot on Stellar Testnet._

---

## 🛠 Tech Stack

- 🌌 Stellar SDK (Testnet)
- 🔐 WebCrypto API (AES-GCM)
- ☁️ Firebase Firestore (Encrypted sync)
- 📊 Chart.js + QRCode.js
- 🤖 Qroq AI API (via Vercel Function)
- ⚙️ PWA with Service Worker
- 🌍 HTML + CSS + Vanilla JS

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
│   └── qroq.js        # Secure serverless Qroq AI endpoint
```

---

## 🤖 Qroq AI Integration

Ask wallet questions directly in-app:

```
POST /api/qroq
{
  "prompt": "How do I send a microloan?"
}
```

Secure your API key with:
```
QROQ_KEY = your_api_key_here
```

---

## 💡 Real-World Use Cases

- **💼 Gig Workers & Freelancers**: Schedule recurring income in XLM  
- **🌍 Remittance**: Send funds globally with near-zero fees  
- **🤝 NGO Campaigns**: Accept donations via scannable QR codes  
- **📦 Offline Payments**: Queue and auto-send when reconnected  
- **📘 Microloans**: Enable community lending with reminders & tracking

---

## 📦 Installation (Optional)

To run locally:
```bash
git clone https://github.com/your-username/basicpay-plus.git
cd basicpay-plus
npm install
vercel dev  # or serve as static site
```

---

## 📢 Credits

- Built by: [Your Name / Team Name]
- For: **HACKHAZARDS '25**
- Powered by: [Stellar](https://www.stellar.org/), [Qroq](https://qroq.ai/), [Firebase](https://firebase.google.com/), [Vercel](https://vercel.com)

---

## 📜 License

MIT License — Free to use, fork, and remix. Give credit where due 💖

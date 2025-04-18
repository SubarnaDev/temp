# 🎬 BasicPay+ – Updated Demo Walkthrough for HACKHAZARDS '25

> **Duration**: 3–5 minutes  
> **Ideal For**: Judges, pitch sessions, or live demos  
> **Live Link**: [https://temp-kappa-beige.vercel.app/](https://temp-kappa-beige.vercel.app/)

---

## 🟢 1. Welcome & Intro

“Hi! This is **BasicPay+**, a blazing-fast, installable Stellar wallet for freelancers, remote workers, and communities with limited banking access.

Built as a PWA, it works even offline, supports microloans, recurring transfers, and donation requests — and it's backed by **Stellar**, **Qroq AI**, and **Firebase Cloud Sync**.”

---

## 🔐 2. Generate & Encrypt a Wallet

- Click **“Generate Wallet”**
- View the Public and Secret Key
- Enter a password → click **“Encrypt & Save”**
- Click **"Fund Testnet Wallet"**

> Your secret key is encrypted using military-grade AES-GCM — stored locally and/or securely synced to Firebase.

---

## ☁️ 3. Sync Across Devices (Cloud Backup)

- Click **“Save Wallet to Cloud”** to upload the encrypted key to Firebase  
- Later, click **“Load Wallet from Cloud”** to restore it on another device

> A seamless way to sync wallets without compromising security.

---

## 💸 4. Send a Payment (Real-Time)

- Enter any Stellar public key, amount, and optional memo  
- Click **“Send”**  
- Watch for **real-time transaction confirmation** and live balance update

> Powered by Stellar — settles in seconds with almost no fee.

---

## 🔁 5. Schedule Recurring Payments

- Add a recipient, amount, interval (e.g., 30 sec), and optional memo  
- Click **“Start Recurring”**  

> Ideal for subscriptions, rent, or regular freelancer payouts.

---

## 📎 6. Payment Request (QR Code)

- Enter amount and click **“Generate QR”**  
- Have another device scan the code to fill the payment form instantly

> Built-in support for **freelancer billing** and fast P2P collection.

---

## 💸 7. Microloan System

- Enter recipient, amount, due date, and memo  
- Click **“Send Loan”**  
- Loan appears in the **Loan Ledger**  
- Users get **due date notifications**, toasts, and can **mark as repaid**

> A peer-to-peer loan ledger with auto-tracking — great for informal economies.

---

## 🎁 8. Donation Mode

- Toggle **Donation Mode**  
- Click **“Generate Donation QR”**

> QR codes with prefilled donation memos — useful for NGOs and causes.

---

## 📤 9. Export & Import Wallets

- Click **“Download Backup”** to export all wallet data (encrypted key, txs, loans, queue)
- Use **Import Wallet** to restore everything from a `.json` backup

> Provides user-controlled backups — works even without cloud.

---

## 📡 10. Real-Time Monitoring

- After logging in, the wallet auto-subscribes to Stellar’s **live stream**
- Payments in or out are detected instantly  
- Shows toasts and updates balance + transaction history in real-time

> Gives users immediate feedback and confidence.

---

## 📊 11. Balance Charts & History

- View your XLM balance over time via **Chart.js**
- Scroll through past transactions, with **links to Stellar Explorer**

> Great for accountability and transparency.

---

## 🤖 12. Ask BasicBot (AI Assistant)

- Ask “How do I schedule a payment?” or “What happens when I’m offline?”  
- Powered by the **Qroq AI API**, context-aware to the wallet

> The assistant helps users onboard and navigate features easily.

---

## 🌐 13. Offline-First UX (PWA)

- Install the app using the **“Install BasicPay+”** prompt  
- Use it offline — transactions queue automatically  
- Once reconnected, queued payments auto-resend

> Ensures usability even in remote or unstable network regions.

---

## 🈳 14. Multilingual & Dark Mode Support

- Toggle between **English, Hindi, and Spanish**  
- Enable **Dark Mode** for accessibility or night usage

> Built with inclusivity in mind — accessible to diverse global users.

---

## 🧠 Final Words

**BasicPay+ is more than a wallet.**  
It’s a secure, scalable, and user-friendly financial tool built for the real world:

- 🌍 **Gig workers, remote earners, and NGOs**
- 💸 **Ultra-low-fee remittances**
- 📦 **Offline and export-ready**
- 🤝 **Supports lending, donations, and daily payments**

> 💫 Built with Stellar, Firebase, WebCrypto, Chart.js, and Qroq AI — for **HACKHAZARDS '25**.

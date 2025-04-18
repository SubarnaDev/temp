function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}


// Add this in script.js or utils.js
// document.getElementById("encrypt-pass").addEventListener("input", e => {
//   const strengthEl = document.getElementById("pass-strength");
//   const val = e.target.value;
//   if (val.length < 6) {
//     strengthEl.textContent = "❗ Too short";
//     strengthEl.style.color = "red";
//   } else if (val.length < 10) {
//     strengthEl.textContent = "⚠️ Moderate";
//     strengthEl.style.color = "orange";
//   } else {
//     strengthEl.textContent = "✅ Strong";
//     strengthEl.style.color = "green";
//   }
// });


window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("encrypt-pass");
  if (input) {
    input.addEventListener("input", e => {
      const strengthEl = document.getElementById("pass-strength");
      const val = e.target.value;
      if (val.length < 6) {
        strengthEl.textContent = "❗ Too short";
        strengthEl.style.color = "red";
      } else if (val.length < 10) {
        strengthEl.textContent = "⚠️ Moderate";
        strengthEl.style.color = "orange";
      } else {
        strengthEl.textContent = "✅ Strong";
        strengthEl.style.color = "green";
      }
    });
  }
});


// utils.js

// Toggle between light and dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Log message to the UI
function logMessage(message, type = 'info') {
  const logDiv = document.getElementById('log');
  const msg = document.createElement('p');
  msg.className = type;
  msg.textContent = message;
  logDiv.prepend(msg);
}

// Show XLM balance
function showBalance(balance) {
  document.getElementById('balance').textContent = balance;
}

// Show or hide wallet actions section
function toggleWalletActions(show = true) {
  const section = document.getElementById('wallet-actions');
  section.style.display = show ? 'block' : 'none';
}

// Save a transaction to localStorage
function saveTransaction(txHash, to, amount) {
  const history = JSON.parse(localStorage.getItem('txHistory') || '[]');
  history.unshift({ txHash, to, amount, date: new Date().toISOString() });
  localStorage.setItem('txHistory', JSON.stringify(history));
}

// Load and display transaction history
function loadTransactionHistory() {
  const history = JSON.parse(localStorage.getItem('txHistory') || '[]');
  const historyDiv = document.getElementById('transaction-history');
  if (!historyDiv) return;
  historyDiv.innerHTML = '';
  if (history.length === 0) {
    historyDiv.innerHTML = '<p>No transactions yet.</p>';
    return;
  }
  history.forEach(tx => {
    const el = document.createElement('p');
    el.innerHTML = `<strong>${tx.date.split('T')[0]}</strong> - Sent <strong>${tx.amount}</strong> XLM to <code>${tx.to.slice(0, 6)}...</code> [<a href='https://stellar.expert/explorer/testnet/tx/${tx.txHash}' target='_blank'>view</a>]`;
    historyDiv.appendChild(el);
  });
}

//
// Advanced AES-GCM encryption/decryption for secret keys
//

// Derive a key from password + salt using PBKDF2
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// Encrypt secret key and save it to localStorage
async function encryptSecretKey(secret, password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const cipherText = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(secret)
  );

  const encrypted = {
    salt: Array.from(salt),
    iv: Array.from(iv),
    cipher: Array.from(new Uint8Array(cipherText))
  };
  localStorage.setItem('encryptedKey', JSON.stringify(encrypted));
}

// Decrypt secret key from localStorage using password
async function decryptSecretKey(password) {
  const dec = new TextDecoder();
  const data = JSON.parse(localStorage.getItem('encryptedKey'));
  if (!data) throw new Error("No encrypted key found");

  const salt = new Uint8Array(data.salt);
  const iv = new Uint8Array(data.iv);
  const cipher = new Uint8Array(data.cipher);

  const key = await deriveKey(password, salt);
  const plainBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    cipher
  );

  return dec.decode(plainBuffer);
}

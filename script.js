



// Enhanced script.js with all winning features for HACKHAZARDS '25

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => logMessage('🔧 Service Worker registered.'))
        .catch(err => logMessage('Service Worker registration failed: ' + err, 'error'));
    });
  }
  
  let server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  let currentKeypair = null;
  let balanceHistory = [];
  let balanceChart = null;
  let recurringIntervals = [];

  let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton(); // Show your custom install button
  logMessage('📲 App can be installed.');
});

function showInstallButton() {
  const box = document.getElementById('install-box');
  if (box) box.style.display = 'block';
}

function installApp() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === 'accepted') {
      logMessage('✅ App installed');
    } else {
      logMessage('❌ Installation dismissed');
    }
    deferredPrompt = null;
    document.getElementById('install-box').style.display = 'none';
  });
}

  
  // Generate new wallet
  function generateKeypair() {
    const pair = StellarSdk.Keypair.random();
    document.getElementById('public-key').textContent = pair.publicKey();
    document.getElementById('secret-key').textContent = pair.secret();
    currentKeypair = pair;
    logMessage('New wallet generated.');
    toggleWalletActions(false);
    loadAllWallets();
  }
  
  // Fund account using Friendbot
  function fundAccount() {
    if (!currentKeypair) {
      logMessage('Generate a wallet first.', 'error');
      return;
    }
    const url = `https://friendbot.stellar.org?addr=${currentKeypair.publicKey()}`;
    fetch(url)
      .then(response => response.json())
      .then(() => {
        logMessage('Account funded successfully.');
        checkBalance();
      })
      .catch(error => {
        logMessage('Error funding account.', 'error');
        console.error(error);
      });
  }
  
  // Encrypt and save current wallet
  async function encryptKey() {
    const pass = document.getElementById('encrypt-pass').value.trim();
    if (!currentKeypair || !pass) {
      logMessage('Generate wallet and enter password first.', 'error');
      return;
    }
  
    try {
      await encryptSecretKey(currentKeypair.secret(), pass);
      saveWalletToStorage(currentKeypair.publicKey(), pass);


      logMessage('🔒 Key encrypted and saved locally.');
    } catch (e) {
      logMessage('Encryption failed.', 'error');
      console.error(e);
    }

    
  }
  
  // Login to existing wallet
  // async function loginWallet() {
  //   const input = document.getElementById('login-secret').value.trim();
  
  //   try {
  //     let secret;
  //     if (input.length > 56) {
  //       secret = await decryptSecretKey(input);
  //     } else {
  //       secret = input;
  //     }
  //     const keypair = StellarSdk.Keypair.fromSecret(secret);
  //     currentKeypair = keypair;
  //     document.getElementById('public-key').textContent = keypair.publicKey();
  //     document.getElementById('secret-key').textContent = secret;
  //     toggleWalletActions(true);
  //     checkBalance();
  //     loadTransactionHistory();
  //     logMessage('✅ Logged in successfully.');

  //   } catch (e) {
  //     logMessage('❌ Invalid secret key or password.', 'error');
  //     console.error(e);
  //   }
  // }





// Login to existing wallet
async function loginWallet() {
  const input = document.getElementById('login-secret').value.trim();

  try {
    let secret;
    if (input.length > 56) {
      secret = await decryptSecretKey(input);
    } else {
      secret = input;
    }

    const keypair = StellarSdk.Keypair.fromSecret(secret);
    currentKeypair = keypair;

    document.getElementById('public-key').textContent = keypair.publicKey();
    document.getElementById('secret-key').textContent = secret;

    toggleWalletActions(true);
    checkBalance();
    loadTransactionHistory();
    startLiveMonitoring();      // 🔴 Add here
    checkDueLoans();            // ✅ Already in your code
    logMessage('✅ Logged in successfully.');
    renderLoanLedger();

    
  } catch (e) {
    logMessage('❌ Invalid secret key or password.', 'error');
    console.error(e);
  }
}






if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission().then(permission => {
    logMessage("🔔 Notification permission: " + permission);
  });
}






// --- Real-Time Stellar Account Monitoring ---
let streamClose = null;

function startLiveMonitoring() {
  if (!currentKeypair) return;

  if (streamClose) streamClose();

  streamClose = server.operations()
    .forAccount(currentKeypair.publicKey())
    .cursor('now')
    .stream({
      onmessage: (operation) => {
        if (operation.type === 'payment') {
          const isIncoming = operation.to === currentKeypair.publicKey();
          const msg = isIncoming
            ? `📥 Incoming payment: ${operation.amount} XLM from ${operation.from.slice(0, 6)}...`
            : `📤 Outgoing payment: ${operation.amount} XLM to ${operation.to.slice(0, 6)}...`;

          showToast(msg); // ✅ Display toast
          logMessage(msg, 'info');
          checkBalance();
          loadTransactionHistory();
        }
      },
      onerror: (error) => {
        logMessage('⚠️ Live monitoring error. Reconnecting...', 'error');
        console.error('Stream error', error);
        setTimeout(startLiveMonitoring, 5000);
      }
    });

  logMessage('📡 Real-time monitoring started.');
}


function stopLiveMonitoring() {
  if (streamClose) {
    streamClose();
    streamClose = null;
    logMessage('📴 Monitoring stopped.');
  }
}



  
  
  // Save encrypted wallet to localStorage
  function saveWalletToStorage(pubKey, password) {
    const wallets = JSON.parse(localStorage.getItem('wallets') || '{}');
    wallets[pubKey] = password;
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }
  
  function loadAllWallets() {
    const wallets = JSON.parse(localStorage.getItem('wallets') || '{}');
    logMessage(`🔐 ${Object.keys(wallets).length} wallet(s) stored.`);
  }
  
  // Check XLM balance
  function checkBalance() {
    if (!currentKeypair) return;
    server.loadAccount(currentKeypair.publicKey())
      .then(account => {
        const balance = account.balances.find(b => b.asset_type === 'native');
        showBalance(balance.balance);
        updateBalanceChart(balance.balance);
      })
      .catch(err => logMessage('Error loading balance.', 'error'));
  }
  
  // Send payment
  function sendPayment(memo = '') {
    const destination = document.getElementById('dest-address').value.trim();
    const amount = document.getElementById('amount').value.trim();

    // Inside sendPayment()
    if (!confirm(`Send ${amount} XLM to ${destination}?`)) return;

  
    if (!currentKeypair || !destination || !amount) {
      logMessage('All fields are required.', 'error');
      return;
    }
  
    server.loadAccount(destination)
      .catch(() => Promise.reject('Destination not found'))
      .then(() => server.loadAccount(currentKeypair.publicKey()))
      .then(account => {
        const tx = new StellarSdk.TransactionBuilder(account, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET
        })
          .addOperation(StellarSdk.Operation.payment({
            destination,
            asset: StellarSdk.Asset.native(),
            amount
          }))
          .addMemo(StellarSdk.Memo.text(memo || ''))
          .setTimeout(30)
          .build();
  
        tx.sign(currentKeypair);
        return server.submitTransaction(tx);
      })
      .then(res => {
        logMessage(`✅ Payment successful: ${res.hash}`);
        saveTransaction(res.hash, destination, amount);
        checkBalance();
        loadTransactionHistory();
      })
      .catch(err => {
        logMessage('Transaction failed: ' + err, 'error');
        if (!navigator.onLine) {
          queueTransaction({ destination, amount, memo });
        }
      });
      
  }
  
  // Recurring payment (interval in seconds)
  function scheduleRecurringPayment(dest, amount, intervalSec, memo = '') {
    const intervalId = setInterval(() => {
      document.getElementById('dest-address').value = dest;
      document.getElementById('amount').value = amount;
      sendPayment(memo);
    }, intervalSec * 1000);
    recurringIntervals.push(intervalId);
    logMessage(`📅 Recurring payment scheduled every ${intervalSec}s`);
  }
  
  // Stop all recurring payments
  function stopRecurringPayments() {
    recurringIntervals.forEach(clearInterval);
    recurringIntervals = [];
    logMessage('🛑 All recurring payments stopped.');
  }
  
  // Request payment via QR
  function generateQRCode() {
    const amount = document.getElementById('request-amount').value.trim();
    const qrData = JSON.stringify({ address: currentKeypair.publicKey(), amount });
    QRCode.toDataURL(qrData, { width: 200, margin: 1 }, (err, url) => {
      if (err) {
        logMessage('QR Generation failed', 'error');
        return;
      }
      const img = new Image();
      img.src = url;
      img.alt = "QR Code";
      img.style.width = '200px';
      const qrcodeDiv = document.getElementById('qrcode');
      qrcodeDiv.innerHTML = '';
      qrcodeDiv.appendChild(img);
    });
  }
  
  // Update balance chart
  function updateBalanceChart(balance) {
    const value = parseFloat(balance);
    balanceHistory.push(value);
    if (balanceHistory.length > 10) balanceHistory.shift();
  
    const ctx = document.getElementById('balanceChart').getContext('2d');
  
    if (!balanceChart) {
      balanceChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array(balanceHistory.length).fill('').map((_, i) => `#${i + 1}`),
          datasets: [{
            label: 'XLM Balance',
            data: balanceHistory,
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    } else {
      balanceChart.data.labels = Array(balanceHistory.length).fill('').map((_, i) => `#${i + 1}`);
      balanceChart.data.datasets[0].data = balanceHistory;
      balanceChart.update();
    }
  }



  // async function askAssistant() {
  //   const input = document.getElementById('assistant-input').value.trim();
  //   const responseBox = document.getElementById('assistant-response');
  //   if (!input) {
  //     responseBox.textContent = 'Please ask a question!';
  //     return;
  //   }

  //   responseBox.textContent = 'Thinking... 🤔';

  //   try {
  //     const res = await fetch('/api/qroq', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ prompt: input })
  //     });

  //     const contentType = res.headers.get('content-type');

  //     let raw;
  //     try {
  //       raw = await res.text();
  //     } catch (e) {
  //       console.error('❌ Failed to read response:', e);
  //       responseBox.textContent = '❌ Could not read assistant response.';
  //       return;
  //     }

  //     if (!res.ok) {
  //       console.error('❌ Server returned error:', raw);
  //       responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
  //       return;
  //     }

  //     if (!contentType || !contentType.includes('application/json')) {
  //       console.warn('⚠️ Assistant response was not JSON:', raw);
  //       responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
  //       return;
  //     }

  //     let data;
  //     try {
  //       data = JSON.parse(raw);
  //     } catch (e) {
  //       console.error('❌ JSON parse failed:', raw);
  //       responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
  //       return;
  //     }

  //     console.log('Assistant reply:', data);
  //     responseBox.textContent = data?.response || '🤖 No helpful reply received.';
  //   } catch (err) {
  //     responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
  //     console.error('Assistant fetch error:', err);
  //   }
  // }




  async function askAssistant() {
    const input = document.getElementById('assistant-input').value.trim();
    const responseBox = document.getElementById('assistant-response');
    if (!input) {
      responseBox.textContent = 'Please ask a question!';
      return;
    }
  
    responseBox.textContent = 'Thinking... 🤔';
  
    try {
      const res = await fetch('/api/qroq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
  
      const contentType = res.headers.get('content-type');
  
      let raw;
      try {
        raw = await res.text();
      } catch (e) {
        console.error('❌ Failed to read response:', e);
        responseBox.textContent = '❌ Could not read assistant response.';
        return;
      }
  
      if (!res.ok) {
        console.error('❌ Server returned error:', raw);
        responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
        return;
      }
  
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('⚠️ Assistant response was not JSON:', raw);
        responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
        return;
      }
  
      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.error('❌ JSON parse failed:', raw);
        responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
        return;
      }
  
      console.log('Assistant reply:', data);
      responseBox.textContent = data?.response || '🤖 No helpful reply received.';
    } catch (err) {
      responseBox.textContent = '🤖 BasicBot is currently unavailable. Please try again later.';
      console.error('Assistant fetch error:', err);
    }
  }
  









  // 📁 PATCHED script.js with Microloan + Donation Mode

// ... existing code above ...

// --- Microloan Feature ---
function sendMicroloan() {
  const recipient = document.getElementById('loan-recipient').value.trim();
  const amount = document.getElementById('loan-amount').value.trim();
  const dueDate = document.getElementById('loan-due').value;
  const memo = document.getElementById('loan-memo').value || 'Microloan';

  if (!confirm(`Send loan of ${amount} XLM to ${recipient}, due ${dueDate}?`)) return;


  if (!currentKeypair || !recipient || !amount || !dueDate) {
    logMessage('All loan fields are required.', 'error');
    return;
  }

  server.loadAccount(recipient)
    .catch(() => Promise.reject('Destination not found'))
    .then(() => server.loadAccount(currentKeypair.publicKey()))
    .then(account => {
      const tx = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
      })
        .addOperation(StellarSdk.Operation.payment({
          destination: recipient,
          asset: StellarSdk.Asset.native(),
          amount
        }))
        .addMemo(StellarSdk.Memo.text(memo))
        .setTimeout(30)
        .build();

      tx.sign(currentKeypair);
      return server.submitTransaction(tx);
    })
    .then(res => {
      const loan = {
        hash: res.hash,
        to: recipient,
        amount,
        dueDate,
        memo,
        date: new Date().toISOString()
      };
      const sent = JSON.parse(localStorage.getItem('microloansSent') || '[]');
      sent.unshift(loan);
      localStorage.setItem('microloansSent', JSON.stringify(sent));
      logMessage(`\uD83D\uDCB8 Loan sent successfully. Due: ${dueDate}`);
      renderLoanLedger();

    })
    .catch(err => {
      logMessage('Loan transaction failed: ' + err, 'error');
    });
}

// function checkDueLoans() {
//   const today = new Date().toISOString().split('T')[0];
//   const loans = JSON.parse(localStorage.getItem('microloansSent') || '[]');
//   loans.forEach(loan => {
//     if (loan.dueDate <= today) {
//       logMessage(`\u23F0 Loan to ${loan.to.slice(0, 6)}... is due today!`, 'info');
//     }
//   });
// }


function checkDueLoans() {
  const today = new Date().toISOString().split('T')[0];
  const loans = JSON.parse(localStorage.getItem('microloansSent') || '[]');

  loans.forEach(loan => {
    if (loan.dueDate <= today) {
      const msg = `⏰ Loan to ${loan.to.slice(0, 6)}... is due today!`;
      logMessage(msg, 'info');
      showToast(msg);
      if (Notification.permission === "granted") {
        new Notification("📢 Loan Due Reminder", {
          body: msg,
          icon: "https://cdn-icons-png.flaticon.com/512/167/167707.png"
        });
      }
    }
  });
}

function renderLoanLedger() {
  const container = document.getElementById('loan-ledger');
  const loans = JSON.parse(localStorage.getItem('microloansSent') || '[]');
  container.innerHTML = '';

  if (loans.length === 0) {
    container.innerHTML = '<p>No loans issued yet.</p>';
    return;
  }

  const today = new Date().toISOString().split('T')[0];

  loans.forEach((loan, idx) => {
    const isRepaid = loan.repaid;
    const isOverdue = loan.dueDate < today && !isRepaid;

    const row = document.createElement('div');
    row.style.marginBottom = '10px';
    row.style.padding = '8px';
    row.style.border = '1px solid #ccc';
    row.style.borderRadius = '6px';
    row.style.backgroundColor = isRepaid ? '#d4edda' : (isOverdue ? '#f8d7da' : '#fff');

    row.innerHTML = `
      <p><strong>To:</strong> ${loan.to.slice(0, 6)}... 
         <strong>Amount:</strong> ${loan.amount} XLM 
         <strong>Due:</strong> ${loan.dueDate}</p>
      <p>Status: <strong>${isRepaid ? '✅ Repaid' : isOverdue ? '⚠️ Overdue' : '⏳ Due'}</strong></p>
      ${!isRepaid ? `<button onclick="markLoanRepaid(${idx})">Mark as Repaid</button>` : ''}
    `;

    container.appendChild(row);
  });
}

function markLoanRepaid(index) {
  const loans = JSON.parse(localStorage.getItem('microloansSent') || '[]');

  // Mark the specific loan as repaid
  loans[index].repaid = true;

  // Save updated array back to localStorage
  localStorage.setItem('microloansSent', JSON.stringify(loans));

  // Feedback to user
  logMessage('✅ Loan marked as repaid.');
  showToast('✅ Loan status updated.');

  // Refresh the UI
  renderLoanLedger();
}




// --- Donation Mode ---
let donationMode = false;

function toggleDonationMode() {
  donationMode = document.getElementById('donationToggle').checked;
  logMessage(`\uD83C\uDF81 Donation mode ${donationMode ? 'enabled' : 'disabled'}.`);
}

function generateDonationQRCode() {
  if (!currentKeypair) {
    logMessage('Generate or log in to a wallet first.', 'error');
    return;
  }
  const donationMemo = 'Donation to ' + currentKeypair.publicKey();
  const qrData = JSON.stringify({
    address: currentKeypair.publicKey(),
    amount: 'Optional',
    memo: donationMemo
  });

  QRCode.toDataURL(qrData, { width: 200, margin: 1 }, (err, url) => {
    if (err) {
      logMessage('QR Generation failed', 'error');
      return;
    }
    const img = new Image();
    img.src = url;
    img.alt = "Donation QR";
    img.style.width = '200px';
    const qrDiv = document.getElementById('donation-qr');
    qrDiv.innerHTML = '';
    qrDiv.appendChild(img);
  });
}

// Call checkDueLoans() after login or wallet load
// Example: inside loginWallet()
// checkDueLoans();

  


// Add in script.js
// function scanQRCode() {
//   const scanner = new Html5Qrcode("qr-video");
//   document.getElementById("qr-video").style.display = 'block';

//   scanner.start(
//     { facingMode: "environment" },
//     { fps: 10, qrbox: 250 },
//     qrCodeMessage => {
//       try {
//         const data = JSON.parse(qrCodeMessage);
//         document.getElementById("dest-address").value = data.address;
//         document.getElementById("amount").value = data.amount || '';
//         document.getElementById("memo").value = data.memo || '';
//         alert("Filled from QR!");
//         scanner.stop();
//         document.getElementById("qr-video").style.display = 'none';
//       } catch (e) {
//         logMessage('Invalid QR', 'error');
//       }
//     }
//   );
// }

function scanQRCode() {
  const qrContainer = document.getElementById("qr-video");
  qrContainer.style.display = 'block';

  const scanner = new Html5Qrcode("qr-video");

  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrCodeMessage => {
      try {
        const data = JSON.parse(qrCodeMessage);
        document.getElementById("dest-address").value = data.address;
        document.getElementById("amount").value = data.amount || '';
        document.getElementById("memo").value = data.memo || '';
        showToast("✅ Filled from QR code!");

        scanner.stop().then(() => {
          qrContainer.innerHTML = ''; // cleanup
          qrContainer.style.display = 'none';
        });
      } catch (e) {
        showToast("❌ Invalid QR code format.");
      }
    },
    errorMessage => {
      // Optional: ignore scanning errors here
      console.warn("QR scan error:", errorMessage);
    }
  ).catch(err => {
    console.error("Failed to start QR scanner:", err);
    showToast("❌ Camera error. Check permissions.");
  });
}





// --- Offline Transaction Queue ---
function queueTransaction(tx) {
  const queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
  queue.push(tx);
  localStorage.setItem('txQueue', JSON.stringify(queue));
  logMessage('📦 Transaction queued offline.');
  showToast('📦 Transaction saved. Will resend when online.');
}

window.addEventListener('online', tryResendingQueuedTxs);

async function tryResendingQueuedTxs() {
  const queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
  if (queue.length === 0 || !currentKeypair) return;

  logMessage(`🔄 Resending ${queue.length} queued transaction(s)...`);
  showToast(`🔄 Replaying ${queue.length} offline transaction(s)...`);


  for (const tx of queue) {
    try {
      await sendQueuedTransaction(tx.destination, tx.amount, tx.memo);
    } catch (e) {
      logMessage('❌ Failed to resend transaction: ' + e.message, 'error');
    }
  }

  localStorage.removeItem('txQueue');
  logMessage('✅ All queued transactions processed.');
  showToast('✅ All offline transactions sent!');
}

async function sendQueuedTransaction(destination, amount, memo = '') {
  const account = await server.loadAccount(currentKeypair.publicKey());
  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
  })
    .addOperation(StellarSdk.Operation.payment({
      destination,
      asset: StellarSdk.Asset.native(),
      amount
    }))
    .addMemo(StellarSdk.Memo.text(memo))
    .setTimeout(30)
    .build();

  tx.sign(currentKeypair);
  const result = await server.submitTransaction(tx);
  logMessage(`✅ Queued TX sent: ${result.hash}`);
  saveTransaction(result.hash, destination, amount);
}

function applyPersona() {
  const value = document.getElementById("persona-select").value;

  switch (value) {
    case "remittance":
      document.getElementById("dest-address").value = "GDRXE2BQUC3AZMLA..." // dummy public key
      document.getElementById("amount").value = "50";
      document.getElementById("memo").value = "Remittance to family";
      showToast("🌍 Remittance flow ready — just hit Send!");
      break;

    case "freelancer":
      document.getElementById("request-amount").value = "100";
      generateQRCode();
      showToast("💼 Freelancer: QR code ready to request payment!");
      break;

    case "ngo":
      document.getElementById("donationToggle").checked = true;
      toggleDonationMode();
      generateDonationQRCode();
      showToast("🤝 NGO Donation QR generated.");
      break;

    default:
      showToast("Persona cleared.");
      break;
  }
}

function askDemo(prompt) {
  document.getElementById('assistant-input').value = prompt;
  askAssistant();
}

function exportWalletData() {
  if (!currentKeypair) {
    alert('Please log in to a wallet first.');
    return;
  }

  const pubKey = currentKeypair.publicKey();
  const encryptedKey = localStorage.getItem('encryptedKey');
  const txHistory = localStorage.getItem('txHistory') || '[]';
  const microloansSent = localStorage.getItem('microloansSent') || '[]';
  const txQueue = localStorage.getItem('txQueue') || '[]';

  const backup = {
    publicKey: pubKey,
    timestamp: new Date().toISOString(),
    encryptedKey: JSON.parse(encryptedKey),
    txHistory: JSON.parse(txHistory),
    microloansSent: JSON.parse(microloansSent),
    txQueue: JSON.parse(txQueue)
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `basicpay-backup-${pubKey.slice(0, 6)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}



function importWalletData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const backup = JSON.parse(e.target.result);

      if (!backup.publicKey || !backup.encryptedKey) {
        alert('Invalid backup file.');
        return;
      }

      // Confirm overwrite
      if (!confirm(`Import wallet for ${backup.publicKey.slice(0, 6)}...? This will overwrite current data.`)) {
        return;
      }

      // Save everything to localStorage
      localStorage.setItem('encryptedKey', JSON.stringify(backup.encryptedKey));
      localStorage.setItem('txHistory', JSON.stringify(backup.txHistory || []));
      localStorage.setItem('microloansSent', JSON.stringify(backup.microloansSent || []));
      localStorage.setItem('txQueue', JSON.stringify(backup.txQueue || []));

      alert('✅ Backup imported! Log in with your password to access.');
    } catch (err) {
      alert('Failed to import: ' + err.message);
      console.error(err);
    }
  };

  reader.readAsText(file);
}

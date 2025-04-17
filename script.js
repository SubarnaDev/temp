// // // script.js

// // if ('serviceWorker' in navigator) {
// //     window.addEventListener('load', () => {
// //       navigator.serviceWorker.register('service-worker.js')
// //         .then(reg => logMessage('🔧 Service Worker registered.'))
// //         .catch(err => logMessage('Service Worker registration failed: ' + err, 'error'));
// //     });
// //   }
  
// //   let server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
// //   let currentKeypair = null;
// //   let balanceHistory = [];
// //   let balanceChart;
  
// //   function generateKeypair() {
// //     const pair = StellarSdk.Keypair.random();
// //     document.getElementById('public-key').textContent = pair.publicKey();
// //     document.getElementById('secret-key').textContent = pair.secret();
// //     currentKeypair = pair;
// //     logMessage('New wallet generated.');
// //     toggleWalletActions(false);
// //   }
  

// // function fundAccount() {
// //   if (!currentKeypair) {
// //     logMessage('Generate a wallet first.', 'error');
// //     return;
// //   }
// //   const url = `https://friendbot.stellar.org?addr=${currentKeypair.publicKey()}`;
// //   fetch(url)
// //     .then(response => response.json())
// //     .then(() => {
// //       logMessage('Account funded successfully.');
// //       checkBalance();
// //     })
// //     .catch(error => {
// //       logMessage('Error funding account.', 'error');
// //       console.error(error);
// //     });
// // }

// // function loginWallet() {
// //   const input = document.getElementById('login-secret').value.trim();

// //   try {
// //     let secret;
// //     if (input.length > 56) {
// //       // Try decrypting
// //       const decrypted = JSON.parse(localStorage.getItem('encryptedKey'));
// //       if (!decrypted || decrypted.password !== input) {
// //         throw new Error('Invalid password or encrypted key not found');
// //       }
// //       secret = decrypted.secret;
// //     } else {
// //       secret = input;
// //     }
// //     const keypair = StellarSdk.Keypair.fromSecret(secret);
// //     currentKeypair = keypair;
// //     document.getElementById('public-key').textContent = keypair.publicKey();
// //     document.getElementById('secret-key').textContent = secret;
// //     toggleWalletActions(true);
// //     checkBalance();
// //     loadTransactionHistory();
// //     logMessage('Logged in successfully.');
// //   } catch (e) {
// //     logMessage('Invalid secret key or password.', 'error');
// //   }
// // }

// // function encryptKey() {
// //   const pass = document.getElementById('encrypt-pass').value.trim();
// //   if (!currentKeypair || !pass) {
// //     logMessage('Generate wallet and enter password first.', 'error');
// //     return;
// //   }
// //   const encrypted = JSON.stringify({ password: pass, secret: currentKeypair.secret() });
// //   localStorage.setItem('encryptedKey', encrypted);
// //   logMessage('Key encrypted and saved locally.');
// // }

// // function checkBalance() {
// //   if (!currentKeypair) return;
// //   server.loadAccount(currentKeypair.publicKey())
// //     .then(account => {
// //       const balance = account.balances.find(b => b.asset_type === 'native');
// //       showBalance(balance.balance);
// //       updateBalanceChart(balance.balance);
// //     })
// //     .catch(err => logMessage('Error loading balance.', 'error'));
// // }

// // function sendPayment() {
// //   const destination = document.getElementById('dest-address').value.trim();
// //   const amount = document.getElementById('amount').value.trim();

// //   if (!currentKeypair || !destination || !amount) {
// //     logMessage('All fields are required.', 'error');
// //     return;
// //   }

// //   server.loadAccount(destination)
// //     .catch(() => Promise.reject('Destination not found'))
// //     .then(() => server.loadAccount(currentKeypair.publicKey()))
// //     .then(account => {
// //       const tx = new StellarSdk.TransactionBuilder(account, {
// //         fee: StellarSdk.BASE_FEE,
// //         networkPassphrase: StellarSdk.Networks.TESTNET
// //       })
// //         .addOperation(StellarSdk.Operation.payment({
// //           destination,
// //           asset: StellarSdk.Asset.native(),
// //           amount
// //         }))
// //         .setTimeout(30)
// //         .build();

// //       tx.sign(currentKeypair);
// //       return server.submitTransaction(tx);
// //     })
// //     .then(res => {
// //       logMessage(`Payment successful: ${res.hash}`);
// //       saveTransaction(res.hash, destination, amount);
// //       checkBalance();
// //       loadTransactionHistory();
// //     })
// //     .catch(err => {
// //       logMessage('Transaction failed: ' + err, 'error');
// //     });
// // }

// // function generateQRCode() {
// //   const amount = document.getElementById('request-amount').value.trim();
// //   if (!currentKeypair || !amount) {
// //     logMessage('Enter amount first.', 'error');
// //     return;
// //   }
// //   const qrData = JSON.stringify({ address: currentKeypair.publicKey(), amount });
// //   document.getElementById('qrcode').innerHTML = '';
// //   QRCode.toCanvas(document.getElementById('qrcode'), qrData, err => {
// //     if (err) logMessage('QR Generation failed', 'error');
// //   });
// // }

// // function updateBalanceChart(balance) {
// //   const value = parseFloat(balance);
// //   balanceHistory.push(value);
// //   if (balanceHistory.length > 10) balanceHistory.shift();

// //   if (!balanceChart) {
// //     const ctx = document.getElementById('balanceChart').getContext('2d');
// //     balanceChart = new Chart(ctx, {
// //       type: 'line',
// //       data: {
// //         labels: Array(balanceHistory.length).fill('').map((_, i) => `#${i + 1}`),
// //         datasets: [{
// //           label: 'XLM Balance',
// //           data: balanceHistory,
// //           borderColor: '#1a73e8',
// //           backgroundColor: 'rgba(26, 115, 232, 0.1)',
// //           tension: 0.3
// //         }]
// //       },
// //       options: {
// //         responsive: true,
// //         scales: {
// //           y: { beginAtZero: true }
// //         }
// //       }
// //     });
// //   } else {
// //     balanceChart.data.labels = Array(balanceHistory.length).fill('').map((_, i) => `#${i + 1}`);
// //     balanceChart.data.datasets[0].data = balanceHistory;
// //     balanceChart.update();
// //   }
// // }

// // script.js

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('service-worker.js')
//         .then(reg => logMessage('🔧 Service Worker registered.'))
//         .catch(err => logMessage('Service Worker registration failed: ' + err, 'error'));
//     });
//   }
  
//   let server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
//   let currentKeypair = null;
//   let balanceHistory = [];
//   let balanceChart = null;
  
//   // Generate new wallet
//   function generateKeypair() {
//     const pair = StellarSdk.Keypair.random();
//     document.getElementById('public-key').textContent = pair.publicKey();
//     document.getElementById('secret-key').textContent = pair.secret();
//     currentKeypair = pair;
//     logMessage('New wallet generated.');
//     toggleWalletActions(false);
//   }
  
//   // Fund account using Friendbot
//   function fundAccount() {
//     if (!currentKeypair) {
//       logMessage('Generate a wallet first.', 'error');
//       return;
//     }
//     const url = `https://friendbot.stellar.org?addr=${currentKeypair.publicKey()}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(() => {
//         logMessage('Account funded successfully.');
//         checkBalance();
//       })
//       .catch(error => {
//         logMessage('Error funding account.', 'error');
//         console.error(error);
//       });
//   }
  
//   // Encrypt key using password
//   async function encryptKey() {
//     const pass = document.getElementById('encrypt-pass').value.trim();
//     if (!currentKeypair || !pass) {
//       logMessage('Generate wallet and enter password first.', 'error');
//       return;
//     }
  
//     try {
//       await encryptSecretKey(currentKeypair.secret(), pass);
//       logMessage('🔒 Key encrypted and saved locally.');
//     } catch (e) {
//       logMessage('Encryption failed.', 'error');
//       console.error(e);
//     }
//   }
  
//   // Log in using secret or password
//   async function loginWallet() {
//     const input = document.getElementById('login-secret').value.trim();
  
//     try {
//       let secret;
//       if (input.length > 56) {
//         secret = await decryptSecretKey(input);
//       } else {
//         secret = input;
//       }
//       const keypair = StellarSdk.Keypair.fromSecret(secret);
//       currentKeypair = keypair;
//       document.getElementById('public-key').textContent = keypair.publicKey();
//       document.getElementById('secret-key').textContent = secret;
//       toggleWalletActions(true);
//       checkBalance();
//       loadTransactionHistory();
//       logMessage('✅ Logged in successfully.');
//     } catch (e) {
//       logMessage('❌ Invalid secret key or password.', 'error');
//       console.error(e);
//     }
//   }
  
//   // Check XLM balance
//   function checkBalance() {
//     if (!currentKeypair) return;
//     server.loadAccount(currentKeypair.publicKey())
//       .then(account => {
//         const balance = account.balances.find(b => b.asset_type === 'native');
//         showBalance(balance.balance);
//         updateBalanceChart(balance.balance);
//       })
//       .catch(err => logMessage('Error loading balance.', 'error'));
//   }
  
//   // Send XLM payment
//   function sendPayment() {
//     const destination = document.getElementById('dest-address').value.trim();
//     const amount = document.getElementById('amount').value.trim();
  
//     if (!currentKeypair || !destination || !amount) {
//       logMessage('All fields are required.', 'error');
//       return;
//     }
  
//     server.loadAccount(destination)
//       .catch(() => Promise.reject('Destination not found'))
//       .then(() => server.loadAccount(currentKeypair.publicKey()))
//       .then(account => {
//         const tx = new StellarSdk.TransactionBuilder(account, {
//           fee: StellarSdk.BASE_FEE,
//           networkPassphrase: StellarSdk.Networks.TESTNET
//         })
//           .addOperation(StellarSdk.Operation.payment({
//             destination,
//             asset: StellarSdk.Asset.native(),
//             amount
//           }))
//           .setTimeout(30)
//           .build();
  
//         tx.sign(currentKeypair);
//         return server.submitTransaction(tx);
//       })
//       .then(res => {
//         logMessage(`✅ Payment successful: ${res.hash}`);
//         saveTransaction(res.hash, destination, amount);
//         checkBalance();
//         loadTransactionHistory();
//       })
//       .catch(err => {
//         logMessage('Transaction failed: ' + err, 'error');
//       });
//   }
  
//   // Generate QR code for request
//   function generateQRCode() {
//     const amount = document.getElementById('request-amount').value.trim();
//     const qrcodeDiv = document.getElementById('qrcode');
  
//     if (!currentKeypair || !amount) {
//       logMessage('Enter amount first.', 'error');
//       return;
//     }
  
//     const qrData = JSON.stringify({
//       address: currentKeypair.publicKey(),
//       amount
//     });
  
//     QRCode.toDataURL(qrData, { width: 200, margin: 1 }, (err, url) => {
//       if (err) {
//         logMessage('QR Generation failed', 'error');
//         console.error(err);
//         return;
//       }
  
//       qrcodeDiv.innerHTML = '';
//       const img = document.createElement('img');
//       img.src = url;
//       img.alt = "QR Code";
//       img.style.width = '200px';
//       qrcodeDiv.appendChild(img);
//     });
//   }
  
//   // Balance chart update
//   function updateBalanceChart(balance) {
//     const value = parseFloat(balance);
//     balanceHistory.push(value);
//     if (balanceHistory.length > 10) balanceHistory.shift();
  
//     const ctx = document.getElementById('balanceChart').getContext('2d');
  
//     if (!balanceChart) {
//       balanceChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: Array(balanceHistory.length).fill('').map((_, i) => `#${i + 1}`),
//           datasets: [{
//             label: 'XLM Balance',
//             data: balanceHistory,
//             borderColor: '#1a73e8',
//             backgroundColor: 'rgba(26, 115, 232, 0.1)',
//             tension: 0.3
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: { beginAtZero: true }
//           }
//         }
//       });
//     } else {
//       balanceChart.data.labels = Array(balanceHistory.length).fill('').map((_, i) => `#${i + 1}`);
//       balanceChart.data.datasets[0].data = balanceHistory;
//       balanceChart.update();
//     }
//   }
  




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
      logMessage('✅ Logged in successfully.');
    } catch (e) {
      logMessage('❌ Invalid secret key or password.', 'error');
      console.error(e);
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
  




  async function askAssistant() {
    const input = document.getElementById('assistant-input').value.trim();
    const responseBox = document.getElementById('assistant-response');
    if (!input) {
      responseBox.textContent = 'Please ask a question!';
      return;
    }
  
    // Simulated responses
    const mockResponses = {
      send: "To send XLM, enter the recipient's public key, amount, and press Send.",
      qr: "Use the 'Request Payment' section to generate a QR code someone can scan to pay you.",
      recurring: "Recurring payments send XLM at set intervals. Fill in the fields and press 'Start Recurring'.",
      balance: "Your balance is shown in XLM after you log in. A chart tracks changes over time."
    };
  
    const keyword = Object.keys(mockResponses).find(k => input.toLowerCase().includes(k));
    responseBox.textContent = mockResponses[keyword] || "I'm here to help! Try asking about sending, QR codes, or recurring payments.";
  }
  
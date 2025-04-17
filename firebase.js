// firebase.js

const firebaseConfig = {
    apiKey: "AIzaSyCSMiP9_5XbZFdtplQ6qUuiv5YMuSNI9gc",
    authDomain: "basicpayplus.firebaseapp.com",
    projectId: "basicpayplus",
    storageBucket: "basicpayplus.firebasestorage.app",
    messagingSenderId: "402742501694",
    appId: "1:402742501694:web:773f50a55e7c6358988c6f"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  async function getUserId() {
    const user = auth.currentUser || await auth.signInAnonymously();
    return user.uid;
  }
  
  async function saveWalletToCloud(pubKey, encryptedKey) {
    const uid = await getUserId();
    return db.collection("wallets").doc(uid).set({
      pubKey,
      encryptedKey,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  
  async function loadWalletFromCloud() {
    const uid = await getUserId();
    const doc = await db.collection("wallets").doc(uid).get();
    return doc.exists ? doc.data() : null;
  }
  
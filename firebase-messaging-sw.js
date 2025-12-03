// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js");

// Config del tuo progetto Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAhb34LXJWrIBAIS0PaX2zzxZW5FkIZD-A",
  authDomain: "chiesa-apostolica-carini.firebaseapp.com",
  projectId: "chiesa-apostolica-carini",
  storageBucket: "chiesa-apostolica-carini.firebasestorage.app",
  messagingSenderId: "1290012534",
  appId: "1:1290012534:web:022d39fd422f6ff7761c57"
});

const messaging = firebase.messaging();

// Notifiche in background
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Notifica in background:", payload);

  const notificationTitle = payload.notification?.title || "Devozionale di oggi";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "logo.png" // cambia se il file si chiama diversamente
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

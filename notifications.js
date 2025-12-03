// notifications.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhb34LXJWrIBAIS0PaX2zzxZW5FkIZD-A",
  authDomain: "chiesa-apostolica-carini.firebaseapp.com",
  projectId: "chiesa-apostolica-carini",
  storageBucket: "chiesa-apostolica-carini.firebasestorage.app",
  messagingSenderId: "1290012534",
  appId: "1:1290012534:web:022d39fd422f6ff7761c57"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// VAPID KEY (quella che mi hai mandato)
const VAPID_KEY = "BCARepFyeXqxedfgZh7-Nnmrv8AoLSC1NnP_k90ndK0QyhAIAJLyMztxe2Gq791XkdaVwkLsZ4oMPqoBkdw4kJ0";

async function initNotifications() {
  if (!("serviceWorker" in navigator) || !("Notification" in window)) {
    console.log("Notifiche non supportate da questo browser");
    return;
  }

  // registra il service worker (stessa cartella di index.html)
  const registration = await navigator.serviceWorker.register("firebase-messaging-sw.js");
  console.log("Service worker registrato:", registration);

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Permesso notifiche negato");
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: registration
  });

  console.log("TOKEN FCM DELL'UTENTE:", token);
  // qui potresti salvarlo in futuro da qualche parte
}

// notifiche quando la pagina è aperta
onMessage(messaging, (payload) => {
  console.log("Notifica in foreground:", payload);

  const { title, body } = payload.notification || {};
  if (title || body) {
    new Notification(title || "Devozionale di oggi", {
      body: body || "",
      icon: "logo.png"
    });
  }
});

// funzione richiamabile da index.html
window.initNotifications = initNotifications;

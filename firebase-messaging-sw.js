// ============================================================
// WHITE INK PORTAL — Firebase Messaging Service Worker
// ============================================================
// File: firebase-messaging-sw.js
// Place this in the ROOT of your project (same level as index.html)
// ============================================================

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// REPLACE with your Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyCcX28ehmDdfj7AUBVbJmkvGb_-Gjdx9tc",
  authDomain: "white-ink-portal.firebaseapp.com",
  projectId: "white-ink-portal",
  storageBucket: "white-ink-portal.firebasestorage.app",
  messagingSenderId: "448991233480",
  appId: "1:448991233480:web:b6ff5b9ff903ea3848ecfd"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'White Ink Portal';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/assets/logo-notif.png',
    badge: '/assets/badge.png',
    tag: payload.notification?.title || 'wink-notif',
    requireInteraction: true,
    actions: [{ action: 'open', title: 'Open Portal' }],
    data: { url: self.registration.scope }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});


self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'office-reminder') {
    event.waitUntil(showOfficeReminder());
  }
});

async function showOfficeReminder() {
  self.registration.showNotification('🏢 Office Starting Soon!', {
    body: 'Aapka office time hone wala hai — tayaar ho jao!',
    icon: '/white ink logo.png',
    badge: '/white ink logo.png',
    vibrate: [200, 100, 200],
    requireInteraction: true
  });
}
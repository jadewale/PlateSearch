
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA1u-0H2jiBrI3Pm0kRLdzYrFuKCX7YL2I',
  authDomain: 'license-399fc.firebaseapp.com',
  databaseURL: 'https://license-399fc.firebaseio.com',
  projectId: 'license-399fc',
  storageBucket: 'license-399fc.appspot.com',
  messagingSenderId: '393448988202',
});

const messaging = firebase.messaging();

/*
messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return this.registration.showNotification(notificationTitle,
    notificationOptions);
});
*/


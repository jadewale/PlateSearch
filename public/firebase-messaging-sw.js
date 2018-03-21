
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyC8d7oSs8WtZpjme_gsRACODusMyVp0d6M',
  authDomain: 'fyp-plateme.firebaseapp.com',
  databaseURL: 'https://fyp-plateme.firebaseio.com',
  projectId: 'fyp-plateme',
  storageBucket: 'fyp-plateme.appspot.com',
  messagingSenderId: '750561910364',
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


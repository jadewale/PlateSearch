import firebase from 'firebase';
import axios from 'axios';
import { FACEBOOK } from '../constants';
import { secretKey } from '../secret';
require('firebase/firestore');

const config = secretKey();
firebase.initializeApp(config);

function addToFireStore(obj, resolve) {
  firebase.firestore()
    .collection(obj.collection)
    .doc(obj.id)
    .set(obj.data).then((ref) => (resolve({ success: true, id: ref })));
}

function getProviderType(type) {
  if (type === FACEBOOK) { return new firebase.auth.FacebookAuthProvider(); }

  return new firebase.auth.GoogleAuthProvider();
}
export function authenticator(providerType) {
  return new Promise((resolve, reject) => {
    const provider = getProviderType(providerType);
    firebase.auth().signInWithPopup(provider).then((result) => {
      const { displayName, photoURL, email } = result.user;
      const query = firebase.firestore()
        .collection('user')
        .where('email', '==', email);
      query.get().then((querySnapshot) => {
        const size = querySnapshot.size;
        if (size === 0) {
          const data = {
            id: email,
            collection: 'user',
            data: {
              email, verified: false, photoURL, displayName,
            },
          };
          addToFireStore(data, resolve);
        } else {
          querySnapshot.forEach((doc) => {
            resolve({
              ...doc.data(), photoURL, displayName, success: true,
            });
          });
        }
      }).catch((error) => {
        console.log('Error getting documents: ', error);
        reject(error);
      });
    });
  });
}

export function getWeather() {
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f7a1ecd069a1053b3f7e0c272f1b2519';
  return axios.get(url).then((response) => (response));
}

export function saveLicense(data, files, id) {
  return new Promise((resolve, reject) => {
    uploadFile(files, 'dd58mfinr', 'sw64gmsy', data, resolve, id);
  });
}

function uploadFile(file, cloudName = 'dd58mfinr', unsignedUploadPreset = 'sw64gmsy', data, resolve, id) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // File uploaded successfully
      const response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      const fileUrl = response.secure_url;

      firebase.firestore().collection('user')
        .doc(id)
        .set({ ...data, file: fileUrl }, { merge: true })
        .then((docRef) => {
          resolve(docRef);
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  };

  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  xhr.send(fd);
}

export function fetchAllusers() {
  return new Promise((resolve) => {
    const users = {};
    firebase.firestore().collection('user').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users[doc.id] = doc.data();
      });
      resolve(users);
    });
  });
}

export function fetUserMessage(id) {
  return new Promise((resolve) => {
    let messages = [];
    firebase.firestore()
      .collection('messages')
      .doc(id)
      .get().then((doc) => {
        if (doc.exists) {
          messages = doc.data();
        }
        resolve(messages);
      });
  });
}

/*
const messaging = firebase.messaging();

debugger;

messaging.usePublicVapidKey('BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu');

messaging.requestPermission()
  .then(() => {
    console.log('Notification permission granted.');
    getToken();
  })
  .catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });

function getToken() {
  messaging.getToken()
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      console.log('Error retrieving Instance ID token. ', err);
      setTokenSentToServer(false);
    });
}

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging.getToken()
    .then((refreshedToken) => {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // ...
    })
    .catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
      console.log('Unable to retrieve refreshed token ', err);
    });
});

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
      'unless it changes');
  }
}
function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === 1;
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function updateUIForPushEnabled(currentToken) {
  console.log(currentToken);
}
function updateUIForPushPermissionRequired() {

}

export default function () {

}
*/


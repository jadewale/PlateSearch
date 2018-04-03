import firebase from 'firebase';
import axios from 'axios';
import request from 'superagent';
import AuthService from '../services/AuthService';
import { FACEBOOK } from '../constants';
import { secretKey } from '../secret';
require('firebase/firestore');


const config = secretKey();
firebase.initializeApp(config);

function addToFireStore(obj, resolve) {
  firebase.firestore()
    .collection(obj.collection)
    .doc(obj.id)
    .set(obj.data).then((ref) => (resolve({ success: true, id: ref, ...obj.data })));
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
        AuthService.isAuthenticated = true;
        const size = querySnapshot.size;
        if (size === 0) {
          const data = {
            id: email,
            collection: 'user',
            data: {
              email, verified: false, photoURL, displayName, status: '',
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
  const url = 'http://api.openweathermap.org/data/2.5/weather';
  return request
    .get(url)
    .query({ q: 'London,uk' })
    .query({ APPID: 'f7a1ecd069a1053b3f7e0c272f1b2519' })
    .then((res) => res.body);
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

export function fetchUser(email) {
  return firebase.firestore()
    .collection('user')
    .where('email', '==', email).get().then((querySnapshot) => querySnapshot.docs[0].data());
}

export function updateUserStatus(id, status) {
  return firebase.firestore()
    .collection('user')
    .doc(id).set({ status }, { merge: true }).then((res) => (res)).catch((err) => (err));
}

export function updateOffence(id, offence) {
  return firebase.firestore()
    .collection('user')
    .doc(id).set({ offence }, { merge: true }).then((res) => (res)).catch((err) => (err));
}

export function updateVisibilityStatus(id, visible) {
  return firebase.firestore()
    .collection('user')
    .doc(id).set({ visible }, { merge: true }).then((res) => (res)).catch((err) => (err));
}

export function updateGeoLocationAddress(id, address) {
  return firebase.firestore()
    .collection('user').doc(id).set({ address }, { merge: true }).then((res) => (res)).catch((err) => (err));
}

export function updateGeoLocation(coords, id) {
  return firebase.firestore()
    .collection('user')
    .doc(id).set({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }, { merge: true }).then((res) => (res)).catch((err) => (err));
}

export function approveUser(id) {
  return firebase.firestore()
    .collection('user')
    .doc(id).set({
      verified: true,
    }, { merge: true }).then((res) => (res)).catch((err) => (err));
}

export function rejectUser(id) {
  return firebase.firestore()
    .collection('user')
    .doc(id).delete().then((res) => (res)).catch((err) => (err));
}


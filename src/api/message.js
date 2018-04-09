import firebase from 'firebase';
import axios from 'axios';
import FCM from 'fcm-push';
import { eventChannel } from 'redux-saga';
axios.defaults.headers.common.Authorization = 'Key=AAAAW5tjHio:APA91bGudrZg59-x6X2LQDz0GhYxNeWWwLY_zOL4xme973XWtWjmrxrOVuw4w-eMrohdR5Ak9O0IU4LYqoNkquXVZ4LXkIT5I5qhGI1e1CigfV2eBEHm21VWYo-qyi6wr_RPMkocXQMT';
axios.defaults.headers.post['content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const fcm = new FCM('AIzaSyC7TXERmMlFaacQ4eKed3x0cEDrE2A0E4A');

export function sendMessage(action) {
  return new Promise((resolve) => {
    const userChat = firebase.database();
    userChat.ref(`messages/${action.id.replace(/[^\w\s]/gi, '')}`)
      .push({ message: action.message, userProfile: action.userProfile });
    resolve({ success: true });
  }).catch((err) => err);
}

export function sendPushNotification(token, body) {
  const message = {
    to: token,
    notification: {
      title: 'Message',
      body,
    },
  };

  return fcm.send(message)
    .then((response) => {
      console.log('Successfully sent with response: ', response);
    })
    .catch((err) => {
      console.log('Something has gone wrong!');
      console.error(err);
    });
}

export function fetUserMessage(id) {
  return new Promise((resolve) => {
    firebase.database()
      .ref(`messages/${id.replace(/[^\w\s]/gi, '')}`)
      .once('value')
      .then((snapShot) => {
        resolve(snapShot.val());
      });
  });
}


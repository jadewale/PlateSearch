import firebase from 'firebase';
import { eventChannel } from 'redux-saga';

const messaging = firebase.messaging();

export function getToken(id) {
  return messaging.requestPermission().then(() => {
    console.log('Permisiion granted');
    return messaging.getToken();
  }).then((token) => createSocketChannel({ token, id })).catch((err) => {
    console.log('Error', err);
  });
}

function createSocketChannel(obj) {
  firebase.firestore().collection('user')
    .doc(obj.id)
    .set({ token: obj.token }, { merge: true })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  return eventChannel((emit) => {
    const receiveHandler = (event) => {
      emit({ message: true, notification: event });
    };
    console.log('Receiving handler');
    messaging.onMessage((payload) => {
      receiveHandler(payload);
    });

    const unsubscribe = () => {

    };

    return unsubscribe;
  });
}

export function receiveMessage(id) {
  return new Promise((resolve) => {
    const userChat = firebase.database().ref(`messages/${id.replace(/[^\w\s]/gi, '')}`);
    resolve(userChat);
  });
}


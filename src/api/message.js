import firebase from 'firebase';
import { eventChannel } from 'redux-saga';

// id.replace(/[^\w\s]/gi, '')

export function sendMessage(action) {
  return new Promise((resolve) => {
    const userChat = firebase.database();

    userChat.ref(`messages/${action.id.replace(/[^\w\s]/gi, '')}`)
      .push({ message: action.message, userProfile: action.userProfile });
  });
}

function createSocketChannel(userChat) {
  return eventChannel((emit) => {
    const receiveHandler = (event) => {
      emit(event);
    };

    userChat.on('value', (data) => {
      receiveHandler(data.val());
    });

    const unsubscribe = () => {

    };

    return unsubscribe;
  });
}

export function receiveMessage(id) {
  return new Promise((resolve, reject) => {
    const userChat = firebase.database().ref(`messages/${id.replace(/[^\w\s]/gi, '')}`);
    resolve(createSocketChannel(userChat));
  });
}

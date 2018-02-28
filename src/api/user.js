import firebase from 'firebase';
import { eventChannel } from 'redux-saga';
require('firebase/firestore');

const config = {
    apiKey: "AIzaSyC8d7oSs8WtZpjme_gsRACODusMyVp0d6M",
    authDomain: "fyp-plateme.firebaseapp.com",
    databaseURL: "https://fyp-plateme.firebaseio.com",
    projectId: "fyp-plateme",
    storageBucket: "fyp-plateme.appspot.com",
    messagingSenderId: "750561910364"
};

firebase.initializeApp(config);


/*
firebase.auth().signInAnonymously().catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});
*/


export function googleSignIn() {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            const email = user.email;
            var userEmail = {};
            let photoUrl = user.photoURL;
            let name = user.displayName;

            let found = false;
            let userDb = firebase.firestore();
            userDb.collection("users").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if(doc.data().email === email) {
                        found = true;
                        userEmail = { email: doc.data().email , verified: doc.data().verified, photo: photoUrl, name }
                    }
                });
                if (found) {
                    resolve(userEmail);
                }else {
                    userDb.collection("users").add({'email': email, 'verified': false, photo: photoUrl, name})
                        .then(function(doc) {
                            resolve(user);
                        });
                }
            });

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });

}

export function facebookSignIn() {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.FacebookAuthProvider();

        provider.setCustomParameters({
            'display': 'popup'
        });
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            let email = user.email;
            var userEmail = {};
            let photoUrl = user.photoURL;
            let name = user.displayName;

           let found = false;
            let userDb = firebase.firestore();
            userDb.collection("users").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if(doc.data().email === email) {
                        found = true;
                        userEmail = { email: doc.data().email , verified: doc.data().verified, photo: photoUrl, name }
                    }
                });

                if (found) {
                    resolve(userEmail);
                } else {
                    userDb.collection("users").add({'email': email, 'verified': false, photo: photoUrl, name})
                        .then(function(doc) {
                            resolve({email: user, verified: false});
                        });
                }
            });

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            debugger;
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    });
}


export function createLicenseData(data, files) {
    return new Promise((resolve, reject) => {

        uploadFile(files, 'dd58mfinr', 'sw64gmsy', data, resolve)
    })
}

function uploadFile(file, cloudName = 'dd58mfinr', unsignedUploadPreset = 'sw64gmsy', data, resolve) {
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
            var url = response.secure_url;

            let licenseDB = firebase.firestore();
            licenseDB.collection("license").add({...data, file: url})
                .then(function(docRef) {
                    resolve(docRef);
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

        }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
}


export function viewLicenses() {
    return new Promise((resolve, reject) => {
        let licenseDB = firebase.firestore();
        licenseDB.collection("license").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);

            });
            resolve(querySnapshot);
        });
    })
}

export function sendMessage(message, id) {

    return new Promise((resolve, reject) => {
        let userChat = firebase.database();

        userChat.ref(`messages/${id.replace(/[^\w\s]/gi, '')}`).push({
            message
        })

    })
}

function createSocketChannel (userChat) {

  return eventChannel( emit => {

    const receiveHandler = (event) => {
      emit(event);
    }

    userChat.on('value', (data) => {
      receiveHandler(data.val());
    })

    const unsubscribe = () => {

    }

    return unsubscribe
  })
}

export function receiveMessage(id) {
    return new Promise((resolve, reject) => {
        let userChat = firebase.database().ref(`messages/${id.replace(/[^\w\s]/gi, '')}`);
        /*userChat.on('value', (data) => {
            resolve(data.val());
        }) */
        resolve(createSocketChannel(userChat));
    })
}

export function viewUserData() {
    return new Promise((resolve, reject) => {
        let fireStoreDb = firebase.firestore();
        let nonVerifiedUsers = {};
        let deactivatedUsers = {};
        fireStoreDb.collection("users").get().then((querySnapshot) => {
             querySnapshot.forEach((doc) => {

                 if(doc.data().verified == 'deactivated') {
                     deactivatedUsers[doc.data().email] = {email: doc.data().email, id: doc.id};
                 } else {
                     if (!doc.data().verified) {
                         nonVerifiedUsers[doc.data().email] = {email: doc.data().email, id: doc.id};
                     }
                 }
            });
        }).then((data) => {
            fireStoreDb.collection("license").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(nonVerifiedUsers[doc.data().user]) {
                        console.log(doc.data().user)
                        nonVerifiedUsers[doc.data().user] = {...nonVerifiedUsers[doc.data().user], file: doc.data().file};
                    }else {
                        console.log(doc.data().user)
                    }
                });
                resolve({nonVerified : nonVerifiedUsers, deactivatedUsers});
            })
        })
    })
}

export function approveUser(id) {
    return new Promise((resolve, reject) => {
        let fireStoreDb = firebase.firestore();
        var userRef = fireStoreDb.collection("users").doc(id);

// Set the "capital" field of the city 'DC'
        return userRef.update({
            verified: true
        })
            .then(function() {
                console.log("Document successfully updated!");
                resolve(true);
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    })
}

export function deactivateUser(id) {
    return new Promise((resolve, reject) => {
        let fireStoreDb = firebase.firestore();
        var userRef = fireStoreDb.collection("users").doc(id);

        return userRef.update({
            verified: 'deactivated'
        })
            .then(function() {
                console.log("Document successfully updated!");
                resolve(false);
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    })
}

export function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

        const errorCode = error.code;
        const errorMessage = error.message;

    });
}

export function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

        const errorCode = error.code;
        const errorMessage = error.message;

    });

}

export function auth(cb) {
    firebase.auth().onAuthStateChanged((user, err) => {
        if (user) {
            const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            cb(uid);

            return {
                'uid': uid
            }
        } else {
            return {'uid': null};
        }

    });

}


export const database = firebase.database();
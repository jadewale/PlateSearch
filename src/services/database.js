import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA1u-0H2jiBrI3Pm0kRLdzYrFuKCX7YL2I",
    authDomain: "license-399fc.firebaseapp.com",
    databaseURL: "https://license-399fc.firebaseio.com",
    projectId: "license-399fc",
    storageBucket: "license-399fc.appspot.com",
    messagingSenderId: "393448988202"
};

firebase.initializeApp(config);


/*
firebase.auth().signInAnonymously().catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});
*/


export function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
     // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

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
}

export function facebookSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();

    provider.setCustomParameters({
        'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        debugger;
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
            debugger;
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
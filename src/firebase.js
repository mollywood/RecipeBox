// src/firebase.js

import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDlvWr_-0UU5TTu9S2gmsSzXiTQ7wIk6l4",
    authDomain: "the-recipe-box-b38b6.firebaseapp.com",
    databaseURL: "https://the-recipe-box-b38b6.firebaseio.com",
    projectId: "the-recipe-box-b38b6",
    storageBucket: "the-recipe-box-b38b6.appspot.com",
    messagingSenderId: "324077832360"
  };
firebase.initializeApp(config);
export default firebase

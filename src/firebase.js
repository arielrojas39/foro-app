import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

//definimos las credenciales

const firebaseConfig = {
    apiKey: "AIzaSyA0LULeiDfCoJv0lxdHRMKyeZqkgsvSHi8",
    authDomain: "database-foroapp-cb5b3.firebaseapp.com",
    projectId: "database-foroapp-cb5b3",
    storageBucket: "database-foroapp-cb5b3.appspot.com",
    messagingSenderId: "658625075060",
    appId: "1:658625075060:web:ae5b3abca2242362b17e21"
  };

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}
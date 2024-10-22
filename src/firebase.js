import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

//definimos las credenciales

const firebaseConfig = {
    apiKey: "AIzaSyC1jERXYitGWJZu3EO0ZfJhaa2i8mEFC8s",
    authDomain: "foro-de-debate-app.firebaseapp.com",
    projectId: "foro-de-debate-app",
    storageBucket: "foro-de-debate-app.appspot.com",
    messagingSenderId: "532736785776",
    appId: "1:532736785776:web:a5ede77374428c924fe3b5",
    measurementId: "G-6LTM17HKF1"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth} 
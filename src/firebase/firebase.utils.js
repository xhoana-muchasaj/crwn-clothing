import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';// for authentication
import 'firebase/compat/firestore';// for db

const config = {
  apiKey: "AIzaSyDdSrFqe8Co2eGrgNf63T-Mq0Rg0i2SgCY",
  authDomain: "crwn-db-bc33a.firebaseapp.com",
  projectId: "crwn-db-bc33a",
  storageBucket: "crwn-db-bc33a.appspot.com",
  messagingSenderId: "35305569248",
  appId: "1:35305569248:web:ef80687397b0f6ef58c985",
  measurementId: "G-6QP6MKK5E7",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({prompt:'select_account'}); 

export const signInWithGoogle=()=> auth.signInWithPopup(provider)

export default firebase;
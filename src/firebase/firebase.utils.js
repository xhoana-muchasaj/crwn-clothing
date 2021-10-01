import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // for authentication
import "firebase/compat/firestore"; // for db

const config = {
  apiKey: "AIzaSyDdSrFqe8Co2eGrgNf63T-Mq0Rg0i2SgCY",
  authDomain: "crwn-db-bc33a.firebaseapp.com",
  projectId: "crwn-db-bc33a",
  storageBucket: "crwn-db-bc33a.appspot.com",
  messagingSenderId: "35305569248",
  appId: "1:35305569248:web:ef80687397b0f6ef58c985",
  measurementId: "G-6QP6MKK5E7",
};

// getting the user auth object that we qet from the authentication library, and store it in the db
// this function will be async because we are making an API request
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // returns the correct data from the authentication
  // it has properties like exist that tells if the user exists in the db, the id etc
  const snapShot = await userRef.get();

  ////////////////////////////////////////////////////////////////
  /////////////// if the user doesnt exists we create it/////////
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  //we will always return userRef because there is a chance that we can use it for other things
  return userRef;
};
////////////////////////////////////////////////////////////////

firebase.initializeApp(config);

//////////////////////////////////////////////////////////////
///////////////////SIGN IN////////////////////////////////////
//////////////////////////////////////////////////////////////
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

/////////////////////////////////////////////////////////////////

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef=firestore.collection(collectionKey)
  console.log(collectionRef);
};

export default firebase;

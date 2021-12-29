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

  /**
   * IF THE USER DOES NOT EXIST, CREATE IT
   */
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

  /**
   * we will always return userRef
   * because there is a chance that
   * it can be used i other parts
   */
  return userRef;
};
////////////////////////////////////////////
firebase.initializeApp(config);
////////////////////////////////////////////

/**
 * SIGN IN WITH GOOGLE
 */
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

/**
 * helper method for passing local data in db
 *
 */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  /** we nedd to gather all our requests in one ,
   * so we send a big request all in one
   * for this firestore offers batch
   */
  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

/**
 * receive the shop data
 */
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  /** the transformedCollection returns the data as an array of collections [{1},{2}]
   * it needs to be trasformed in an object key value {xxx:{1},yyy:{}}
   */
  return transformedCollection.reduce((accumulator, collection) => {
  
    accumulator[collection.title.toLowerCase()] = collection;  
    console.log(accumulator)
    return accumulator;
  }, {});
};

/** getting the authenticated user */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;

import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
// we need to import shop action types because we are listening for specific action type
import ShopActionTypes from "./shop.types";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

// Worker saga will be fired on FETCH_COLLECTIONS_START actions
export function* fetchCollectionsAsync() {
    
    const collectionRef = firestore.collection("collections");
    const snapshot=yield collectionRef.get()
    const collectionsMap= yield call(convertCollectionsSnapshotToMap,snapshot)
    yield console.log(collectionRef);
    
//   collectionRef
//     .get()
//     .then((snapshot) => {
//       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//       dispatch(fetchCollectionsSuccess(collectionsMap));
//     })
//     .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
}

// Starts fetchCollectionsAsync on each dispatched FETCH_COLLECTIONS_START action
// Allows concurrent fetches of collections
export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START, // the FETCH_COLLECTIONS_START action came in, the saga hears for this action
    fetchCollectionsAsync // and fires fetchCollectionsAsync generator functions
  );
}

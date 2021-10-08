import { takeLatest,call, put,all } from "redux-saga/effects";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

// we need to import shop action types because we are listening for specific action type
import ShopActionTypes from "./shop.types";

// Worker saga will be fired on FETCH_COLLECTIONS_START actions
export function* fetchCollectionsAsync(){
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    //put is the saga effect for creating actions, like dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

// Starts fetchCollectionsAsync on each dispatched FETCH_COLLECTIONS_START action
// Allows concurrent fetches of collections
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START, // the FETCH_COLLECTIONS_START action came in, the saga hears for this action
    fetchCollectionsAsync // and fires fetchCollectionsAsync generator functions
  ); 
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}

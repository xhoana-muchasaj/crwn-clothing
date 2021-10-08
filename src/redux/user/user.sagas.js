import { takeLatest, put, all, call } from "@redux-saga/core/effects";

// it is neede because we are listening for action types
import UserActionTypes from "./user.types";

import { 
    signInSuccess, 
    signInFailure,
    signOutSuccess,
    signOutFailure
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    //insert the user
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    //put() puts things back into our regular Redux flow
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    // pull only the user property from distructuring it
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    // returns the same structure as signinwithpopo, so we can distructure the user the same way
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated(){
    try {
        const userAuth= yield getCurrentUser()
        if(!userAuth)return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}
export function* signOut(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}


export function* onGoogleSignInStart() {
  yield takeLatest(
    // takeLatest is a listener
    UserActionTypes.GOOGLE_SIGN_IN_START, // the FETCH_COLLECTIONS_START action came in, the saga hears for this action
    signInWithGoogle
  ); // and fires fetchCollectionsAsync generator functions
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail); 
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)

}
export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)

}


export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart),call(onCheckUserSession),call(onSignOutStart)]);
}

import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCCbRycqB7_mSlCTu15-MmG9CmWjDpHaHU",
  authDomain: "crwn-db-19aab.firebaseapp.com",
  databaseURL: "https://crwn-db-19aab.firebaseio.com",
  projectId: "crwn-db-19aab",
  storageBucket: "crwn-db-19aab.appspot.com",
  messagingSenderId: "944087267649",
  appId: "1:944087267649:web:39ae016bf090dfd93989c0",
  measurementId: "G-D6WC7BV9PT",
};

export const creatUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error createing user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

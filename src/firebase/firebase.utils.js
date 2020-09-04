import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//beacause this is just a personal project i didnt save this infoi nto env variable file
var firebaseConfig = {
  apiKey: "AIzaSyCpEEFxl06-S6Ll_7cFxswEPMqxHYnsd18",
  authDomain: "url-shortner-57473.firebaseapp.com",
  databaseURL: "https://url-shortner-57473.firebaseio.com",
  projectId: "url-shortner-57473",
  storageBucket: "url-shortner-57473.appspot.com",
  messagingSenderId: "456227751606",
  appId: "1:456227751606:web:d92a174c6fcccb1a55c817",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        additionalData,
      });
    } catch (error) {
      throw Error(error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((result) => {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userRef) => {
      unsubscribe();
      resolve(userRef);
    }, reject);
  });
};

export const mSignOutUser = () => {
  return new Promise((resolve) => {
    auth.signOut();
    resolve();
  });
};

export const GetAccessToken = () => {
  return new Promise((resolve) => {
    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        // Send token to your backend via HTTPS
      })
      .catch(function (error) {
        // Handle error
        throw Error(error.message);
      });
  });
};

export default { firebase };

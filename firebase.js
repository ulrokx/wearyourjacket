import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/auth';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};

let FirebaseApp;

console.log(firebaseConfig.apiKey)
try { // it just works okay
  FirebaseApp = getApp();
} catch (e) {
  FirebaseApp = initializeApp(firebaseConfig);
}
export const db = getFirestore();
export {FirebaseApp};


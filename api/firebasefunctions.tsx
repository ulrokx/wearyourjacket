import * as React from 'react';
import * as FirebaseAuth from 'firebase/auth';
import FirebaseApp from '../firebase';
import Firestore from 'firebase/firestore'
import { useContext } from 'react';
import { AuthContext } from '../state/contextProvider';
  export const onRegister = async (email: string, password: string, nickname: string, zipcode: string) => {
      try { 
          const auth = FirebaseAuth.getAuth(FirebaseApp);
        await FirebaseAuth.createUserWithEmailAndPassword(auth, email, password);
        const currentUser = FirebaseApp.auth(FirebaseApp).currentUser;
        const db = FirebaseApp.firestore();
        db.collection("users")
            .doc(currentUser.uid)
            .set({
                email: currentUser.email,
                nickname: nickname,
                zipcode: zipcode,
            });
      } catch (e) {
          console.log(e.message);
      }
  };
const onLogin = async(email: string, password: string) => {
      try {
          const auth = FirebaseAuth.getAuth(FirebaseApp);
          const userCredential = await FirebaseAuth.signInWithEmailAndPassword(auth, email,password);
            if(userCredential.user.uid) {
                React.useContext(AuthContext)
            }
      } catch (e) {
          console.log(e.message)
      }
  }

  export const onLogOut = async () => {
    try {
        await FirebaseApp.auth().signOut();

    } catch(e) {
        console.log(e.message);
    }
  }
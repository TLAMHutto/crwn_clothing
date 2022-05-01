import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDfG6tBpY7oQg7O9v9x5j_Y1jj8wu6ZEUY",
    authDomain: "crwn-clothing-db-b468c.firebaseapp.com",
    projectId: "crwn-clothing-db-b468c",
    storageBucket: "crwn-clothing-db-b468c.appspot.com",
    messagingSenderId: "1075618769347",
    appId: "1:1075618769347:web:901ac8ec507850ea533576"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();
  export const createUserDocumetFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);
      console.log(userDocRef);
      const userSnapShot = await getDoc(userDocRef);
      console.log(userSnapShot);
      console.log(userSnapShot.exists());

      if(!userSnapShot.exists()){
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt,
                  ...userAuth.providerData[0]
              });
          } catch (error) {
              console.log(error);
          }
      }
      return userDocRef;
    }
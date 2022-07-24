import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCnHlpEdJLDjO2RGEbBUgg9qw5SJGGkmnM",
  
    authDomain: "ecom-template-160ef.firebaseapp.com",
  
    projectId: "ecom-template-160ef",
  
    storageBucket: "ecom-template-160ef.appspot.com",
  
    messagingSenderId: "1061967321402",
  
    appId: "1:1061967321402:web:30d6996d01405649ae9803"
  
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider) 

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error){
            console.log("There was an error creating the user: ", error)
        }
    }
    return userDocRef;
  }
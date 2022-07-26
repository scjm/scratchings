import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import { getAuth, 
            signInWithRedirect, 
            signInWithPopup, 
            GoogleAuthProvider,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            signOut,
            onAuthStateChanged,
        } from 'firebase/auth'
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

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider) 
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error){
            console.log("There was an error creating the user: ", error)
        }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
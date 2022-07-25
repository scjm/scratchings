import { connectFirestoreEmulator } from 'firebase/firestore';
import React, {useEffect} from 'react'
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../sign-up-component/sign-up-form.component';

import { 
            auth,
            signInWithGooglePopup, 
            createUserDocumentFromAuth,
            signInWithGoogleRedirect
        } from '../../../utils/firebase/firebase.utils'

function SignIn() {

    // useEffect( () => {
    //     async function getLogin(){
    //         const response = await getRedirectResult(auth)
    //         if(response){
    //             const userDocRef = createUserDocumentFromAuth
    //         }
    //     } 
    //     getLogin()
    // }, [])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

  return (
    <div><h1>Sign in component</h1>
    <button onClick={logGoogleUser}>
        log on with Google
    </button>
    <SignUpForm/>
    {/* <button onClick={signInWithGoogleRedirect}>
        log on with Google redirect
    </button> */}
    </div>
  )
}

export default SignIn
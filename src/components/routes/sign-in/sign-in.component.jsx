import React from 'react'

import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils'

function SignIn() {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }


  return (
    <div><h1>&nbsp;sign in component</h1>
    <button onClick={logGoogleUser}>
        log on with Google
    </button>
    </div>
  )
}

export default SignIn
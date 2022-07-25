import { useState } from "react"
import { signInWithGooglePopup, 
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword } 
        from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import './sign-in-form.component.scss'
import '../button/button.component.scss'

const defaultFormFields = {
    email:'',
    password: '',
}

const SignInForm = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields)
    const { email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
        resetFormFields()
    }
    

    const handleSubmit = async (event)=>{
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log('success')
            resetFormFields()
        }catch(error){
               console.log('front-end catch received this error: ', error.errorMessage)
        }

    }

    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }


    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                    inputLabel='Email'
                />
                <FormInput
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                    inputLabel='Password'        
                />
                <div className="buttons-container">
                <Button 
                    type="submit" 
                    >
                    Sign In
                    </Button>
                <Button 
                    onClick={signInWithGoogle}
                    buttonType='google' 
                    type="button"
                    >
                    Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm


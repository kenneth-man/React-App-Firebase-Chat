import React, { useContext } from 'react';
import { Context } from '../Context';
import firebaseLogo from '../Res/Images/firebase-logo2.png';
import { ReactComponent as GoogleIcon } from '../Res/Icons/google3.svg';

const SignIn = () => {
    const { signInWithGoogle } = useContext(Context);

    return (
        <div className='Page signIn col fw'>
            <img src={firebaseLogo} alt='firebase-logo'/>

            <div className='Page__section--small col fw'>
                <h1 className='mb'>Firebase and React Chat</h1>
               
                <h2>↓ &nbsp; Click on the button below to Sign in with your Google Account &nbsp; ↓</h2>
            </div>

            <div className='Page__section--small ctr fw'>
                <button onClick={signInWithGoogle} className='row'>
                    <GoogleIcon className='mr'/>

                    Sign in with Google 
                </button>
            </div>
        </div>
    )
}

export default SignIn;
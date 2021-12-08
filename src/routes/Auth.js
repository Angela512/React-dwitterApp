import React from 'react';
import {getAuth, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import AuthForm from '../components/AuthForm';

const Auth = () => {   
    const onSocialClick = async(event) => {
        const auth = getAuth();
        const {
            target: {name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new GoogleAuthProvider();
        } else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth, provider);
        console.log(data);
    }
    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
};
export default Auth; 
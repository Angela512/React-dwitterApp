import React from 'react';
import {getAuth, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import AuthForm from '../components/AuthForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

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
        //<i class="fas fa-spinner"></i>
    }
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button name="google" className="authBtn" onClick={onSocialClick}>
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name="github" className="authBtn" onClick={onSocialClick}>
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};
export default Auth; 
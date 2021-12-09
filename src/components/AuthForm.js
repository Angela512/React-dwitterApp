import React, { useState } from 'react';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';


const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPW] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth();
        if(newAccount){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                setError(error.message)
            });
        } else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                setError(error.message)
            });
        }
    }
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPW(value);
        }
    }
    return (
        <>
        <form onSubmit={onSubmit} className="container">
                <input className="authInput" name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input className="authInput" name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span className="authSwitch" onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;
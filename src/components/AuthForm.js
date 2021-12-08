import React, { useState } from 'react';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';


const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPW] = useState("");
    const [newAccount, setNewAccount] = useState(true);
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
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        } else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        }
        
        /*
        try{
            const auth = getAuth();
            let data;
            if(newAccount){
                data = await createUserWithEmailAndPassword( email, password);
            } else{
                data = await signInWithEmailAndPassword( email, password);
            }
            console.log(data);
        } catch(e){
            console.log(e);
        }
        */
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
        <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    );
};

export default AuthForm;
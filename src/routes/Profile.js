import React, { useEffect, useState } from 'react';
import {getAuth, updateProfile} from 'firebase/auth';
import { authService, dbService } from '../firebase';
import { Link } from 'react-router-dom';

export default({userObj}) => {
    const auth = getAuth();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => authService.signOut();    
    const getMyDweets = async() => {
        const dweets = await dbService
        .collection("dweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(dweets.docs.map((doc) => doc.data()));
        console.log(userObj);
    }
    useEffect(() => {
        getMyDweets();
    }, []);
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(auth.currentUser,{
                displayName: newDisplayName,
            });
        }
    };
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} 
                type="text" 
                placeholder="Display Name" 
                value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick} >Log Out</button>
        </>
    );
};
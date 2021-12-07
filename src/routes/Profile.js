import React, { useEffect } from 'react';
import {getAuth} from 'firebase/auth';
import { authService, dbService } from '../firebase';
import { Link } from 'react-router-dom';

export default({userObj}) => {
    const auth = getAuth();
    const onLogOutClick = () => authService.signOut();    
    const getMyDweets = async() => {
        const dweets = await dbService
        .collection("dweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(dweets.docs.map((doc) => doc.data()));
    }
    useEffect(() => {
        getMyDweets();
    }, []);
    
    return (
        <>
            <button onClick={onLogOutClick} >Log Out</button>
        </>
    );
};